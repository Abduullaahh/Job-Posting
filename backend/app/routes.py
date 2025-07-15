from flask import Blueprint, request, jsonify
from app import db
from app.models import Job
from app.utils import validate_job_data, error_response, success_response
from datetime import datetime
from sqlalchemy import or_, and_, desc, asc

api = Blueprint('api', __name__)

@api.route('/jobs', methods=['GET'])
def get_jobs():
    """Get all jobs with optional filtering and sorting"""
    try:
        query = Job.query
        
        # Filtering
        job_type = request.args.get('job_type')
        location = request.args.get('location')
        tag = request.args.get('tag')
        company = request.args.get('company')
        
        if job_type:
            query = query.filter(Job.job_type == job_type)
        
        if location:
            query = query.filter(Job.location.ilike(f'%{location}%'))
        
        if company:
            query = query.filter(Job.company.ilike(f'%{company}%'))
        
        if tag:
            query = query.filter(Job.tags.ilike(f'%{tag}%'))
        
        # Sorting
        sort = request.args.get('sort', 'posting_date_desc')
        
        if sort == 'posting_date_desc':
            query = query.order_by(desc(Job.posting_date))
        elif sort == 'posting_date_asc':
            query = query.order_by(asc(Job.posting_date))
        elif sort == 'title_asc':
            query = query.order_by(asc(Job.title))
        elif sort == 'title_desc':
            query = query.order_by(desc(Job.title))
        elif sort == 'company_asc':
            query = query.order_by(asc(Job.company))
        elif sort == 'company_desc':
            query = query.order_by(desc(Job.company))
        
        # Pagination (optional)
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        jobs = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'jobs': [job.to_dict() for job in jobs.items],
            'total': jobs.total,
            'pages': jobs.pages,
            'current_page': jobs.page,
            'per_page': jobs.per_page
        }), 200
        
    except Exception as e:
        return error_response(f'Error fetching jobs: {str(e)}', 500)

@api.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    """Get a single job by ID"""
    try:
        job = Job.query.get(job_id)
        if not job:
            return error_response('Job not found', 404)
        
        return jsonify(job.to_dict()), 200
        
    except Exception as e:
        return error_response(f'Error fetching job: {str(e)}', 500)

@api.route('/jobs', methods=['POST'])
def create_job():
    """Create a new job"""
    try:
        data = request.get_json()
        
        if not data:
            return error_response('No JSON data provided', 400)
        
        # Validate data
        errors = validate_job_data(data)
        if errors:
            return error_response(errors, 400)
        
        # Create new job
        job = Job(
            title=data['title'].strip(),
            company=data['company'].strip(),
            location=data['location'].strip(),
            job_type=data.get('job_type', 'Full-time'),
            tags=','.join(data.get('tags', [])) if isinstance(data.get('tags'), list) else data.get('tags', ''),
            posting_date=datetime.fromisoformat(data['posting_date'].replace('Z', '+00:00')) if data.get('posting_date') else datetime.utcnow()
        )
        
        db.session.add(job)
        db.session.commit()
        
        return success_response(job.to_dict(), 'Job created successfully', 201)
        
    except Exception as e:
        db.session.rollback()
        return error_response(f'Error creating job: {str(e)}', 500)

@api.route('/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    """Update an existing job"""
    try:
        job = Job.query.get(job_id)
        if not job:
            return error_response('Job not found', 404)
        
        data = request.get_json()
        if not data:
            return error_response('No JSON data provided', 400)
        
        # Validate data (not all fields required for update)
        errors = validate_job_data(data, required_fields=[])
        if errors:
            return error_response(errors, 400)
        
        # Update job fields
        if 'title' in data and data['title'].strip():
            job.title = data['title'].strip()
        if 'company' in data and data['company'].strip():
            job.company = data['company'].strip()
        if 'location' in data and data['location'].strip():
            job.location = data['location'].strip()
        if 'job_type' in data:
            job.job_type = data['job_type']
        if 'tags' in data:
            job.tags = ','.join(data['tags']) if isinstance(data['tags'], list) else data['tags']
        if 'posting_date' in data and data['posting_date']:
            job.posting_date = datetime.fromisoformat(data['posting_date'].replace('Z', '+00:00'))
        
        job.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return success_response(job.to_dict(), 'Job updated successfully', 200)
        
    except Exception as e:
        db.session.rollback()
        return error_response(f'Error updating job: {str(e)}', 500)

@api.route('/jobs/<int:job_id>', methods=['PATCH'])
def patch_job(job_id):
    """Partially update an existing job"""
    return update_job(job_id)  # Same logic as PUT for simplicity

@api.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    """Delete a job"""
    try:
        job = Job.query.get(job_id)
        if not job:
            return error_response('Job not found', 404)
        
        db.session.delete(job)
        db.session.commit()
        
        return success_response(message='Job deleted successfully', status_code=200)
        
    except Exception as e:
        db.session.rollback()
        return error_response(f'Error deleting job: {str(e)}', 500)

@api.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Job Listings API is running'}), 200

# Error handlers
@api.errorhandler(404)
def not_found(error):
    return error_response('Endpoint not found', 404)

@api.errorhandler(405)
def method_not_allowed(error):
    return error_response('Method not allowed', 405)

@api.errorhandler(500)
def internal_error(error):
    return error_response('Internal server error', 500)