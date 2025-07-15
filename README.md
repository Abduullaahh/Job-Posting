# Job Listings Platform

A full-stack job board application with a React + Vite + Tailwind frontend and a Flask REST API backend (PostgreSQL).

---

## Table of Contents

- [Project Structure](#project-structure)
- [Frontend Setup (React + Vite + Tailwind)](#frontend-setup-react--vite--tailwind)
- [Backend Setup (Flask REST API)](#backend-setup-flask-rest-api)
- [Web Scraping & Seeding Data](#web-scraping--seeding-data)
- [API Endpoints](#api-endpoints)
- [Example Usage](#example-usage)
- [Development Tips](#development-tips)

---

## Project Structure

```
Job Listing/
├── backend/
│   ├── app/
│   ├── scripts/
│   ├── requirements.txt
│   ├── run.py
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md
```

---

## Frontend Setup (React + Vite + Tailwind)

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is in use).

3. **Tech stack:**
   - React (with Vite)
   - Tailwind CSS
   - ESLint

---

## Backend Setup (Flask REST API)

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Environment setup:**
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL connection string.

3. **Run the backend:**
   ```bash
   python run.py
   ```
   The API will be available at [http://localhost:4000](http://localhost:4000)

4. **Tech stack:**
   - Flask
   - SQLAlchemy (PostgreSQL)
   - RESTful API

---

## Web Scraping & Seeding Data

To seed your database with jobs from [Actuary List](https://www.actuarylist.com):

1. **Install Selenium and Requests:**
   ```bash
   cd backend
   pip install selenium requests
   ```

2. **Download ChromeDriver** and ensure it's in your PATH.

3. **Run the scraper:**
   ```bash
   python scripts/scrape_actuarylist.py
   ```
   This will scrape jobs and POST them to your backend API.

---

## API Endpoints

### Get All Jobs
```
GET /jobs
```
Query params: `job_type`, `location`, `company`, `tag`, `sort`, `page`, `per_page`

### Get Single Job
```
GET /jobs/<id>
```

### Create Job
```
POST /jobs
Content-Type: application/json

{
    "title": "Software Engineer",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "job_type": "Full-time",
    "tags": ["Python", "Flask", "API"],
    "posting_date": "2024-01-15T10:00:00"
}
```

### Update Job
```
PUT /jobs/<id>
Content-Type: application/json
```

### Delete Job
```
DELETE /jobs/<id>
```

### Health Check
```
GET /health
```

---

## Example Usage

**Create a job:**
```bash
curl -X POST http://localhost:4000/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Backend Developer",
    "company": "StartupXYZ",
    "location": "Remote",
    "job_type": "Full-time",
    "tags": ["Python", "Flask", "PostgreSQL"]
  }'
```

**Get jobs with filters:**
```bash
curl "http://localhost:4000/jobs?job_type=Full-time&location=Remote&sort=posting_date_desc"
```

---

## Development Tips

- **Frontend:** Use Tailwind utility classes for rapid UI development.
- **Backend:** Use Flask blueprints for modular API routes.
- **Scraping:** Update selectors in `scrape_actuarylist.py` if the Actuary List website changes.
- **.env:** Never commit your real database credentials to version control.

---

## For both frontend and backend readme is also in each folder 