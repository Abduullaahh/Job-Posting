# Job Listings REST API

A Flask-based REST API for managing job listings with PostgreSQL database.

## Features

- Full CRUD operations for job listings
- Filtering by job type, location, company, and tags
- Sorting by various fields
- Pagination support
- Input validation and error handling
- RESTful API design

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Setup
1. Copy `.env.example` to `.env`
2. Update the `DATABASE_URL` with your Supabase PostgreSQL connection string:
   ```
   DATABASE_URL=postgresql://[username]:[password]@[host]:[port]/[database]
   ```

### 3. Run the Application
```bash
python run.py
```

The API will be available at `http://localhost:4000`

## API Endpoints

### Get All Jobs
```
GET /jobs
```

Query Parameters:
- `job_type`: Filter by job type (Full-time, Part-time, Contract, Internship, Freelance)
- `location`: Filter by location (partial match)
- `company`: Filter by company name (partial match)
- `tag`: Filter by tag (partial match)
- `sort`: Sort results (posting_date_desc, posting_date_asc, title_asc, title_desc, company_asc, company_desc)
- `page`: Page number for pagination (default: 1)
- `per_page`: Items per page (default: 20)

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

{
    "title": "Senior Software Engineer",
    "company": "Tech Corp",
    "location": "San Francisco, CA"
}
```

### Delete Job
```
DELETE /jobs/<id>
```

### Health Check
```
GET /health
```

## Example Usage

### Create a job:
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

### Get jobs with filters:
```bash
curl "http://localhost:4000/jobs?job_type=Full-time&location=Remote&sort=posting_date_desc"
```