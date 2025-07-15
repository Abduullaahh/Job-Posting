import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from datetime import datetime, timedelta
import re

# --- CONFIG ---
ACTUARY_LIST_URL = "https://www.actuarylist.com"
API_ENDPOINT = "http://localhost:4000/jobs"  # Change this if your Flask app runs on a different port

# --- JOB TYPE MAPPING ---
ALLOWED_JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"]

def map_job_type(tags):
    for tag in tags:
        tag_lower = tag.lower()
        if "full" in tag_lower:
            return "Full-time"
        if "part" in tag_lower:
            return "Part-time"
        if "contract" in tag_lower:
            return "Contract"
        if "intern" in tag_lower:
            return "Internship"
        if "freelance" in tag_lower:
            return "Freelance"
    return "Full-time"  # Default

def parse_posting_date(text):
    now = datetime.utcnow()
    text = text.lower().strip()
    if "h ago" in text:
        hours = int(re.search(r"(\d+)\s*h", text).group(1))
        dt = now - timedelta(hours=hours)
    elif "m ago" in text:
        minutes = int(re.search(r"(\d+)\s*m", text).group(1))
        dt = now - timedelta(minutes=minutes)
    elif "d ago" in text:
        days = int(re.search(r"(\d+)\s*d", text).group(1))
        dt = now - timedelta(days=days)
    else:
        # fallback: return now
        dt = now
    return dt.strftime("%Y-%m-%dT%H:%M:%S")

# --- SETUP SELENIUM ---
options = Options()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)
driver.get(ACTUARY_LIST_URL)
time.sleep(3)  # Wait for page to load

jobs = []
job_cards = driver.find_elements(By.CSS_SELECTOR, "div.Job_job-card__YgDAV")

for card in job_cards:
    try:
        title = card.find_element(By.CSS_SELECTOR, "p.Job_job-card__position__ic1rc").text
        company = card.find_element(By.CSS_SELECTOR, "p.Job_job-card__company__7T9qY").text
        locations = [loc.text for loc in card.find_elements(By.CSS_SELECTOR, "a.Job_job-card__location__bq7jX")]
        location = ", ".join(locations)
        posting_date_raw = card.find_element(By.CSS_SELECTOR, "p.Job_job-card__posted-on__NCZaJ").text
        posting_date = parse_posting_date(posting_date_raw)
        tags = [tag.text for tag in card.find_elements(By.CSS_SELECTOR, "div.Job_job-card__tags__zfriA a")]
        job_type = map_job_type(tags)
        jobs.append({
            "title": title,
            "company": company,
            "location": location,
            "tags": tags,
            "posting_date": posting_date,
            "job_type": job_type
        })
    except Exception as e:
        print("Error parsing job card:", e)

driver.quit()

# --- SEND TO BACKEND ---
for job in jobs:
    try:
        resp = requests.post(API_ENDPOINT, json=job)
        if resp.status_code == 201:
            print(f"Posted: {job['title']} | Status: {resp.status_code}")
        else:
            print(f"Failed to post: {job['title']} | Status: {resp.status_code} | Response: {resp.text}")
    except Exception as e:
        print("Error posting job:", e)