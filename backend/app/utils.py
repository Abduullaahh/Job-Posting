from flask import jsonify
from datetime import datetime

def validate_job_data(data, required_fields=None):
    """Validate job data"""
    if required_fields is None:
        required_fields = ['title', 'company', 'location']
    
    errors = []
    
    for field in required_fields:
        if field not in data or not data[field] or not data[field].strip():
            errors.append(f'{field} is required and cannot be empty')
    
    # Validate job_type if provided
    valid_job_types = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance']
    if 'job_type' in data and data['job_type'] not in valid_job_types:
        errors.append(f'job_type must be one of: {", ".join(valid_job_types)}')
    
    # Validate posting_date if provided
    if 'posting_date' in data and data['posting_date']:
        try:
            datetime.fromisoformat(data['posting_date'].replace('Z', '+00:00'))
        except ValueError:
            errors.append('posting_date must be in ISO format (YYYY-MM-DDTHH:MM:SS)')
    
    return errors

def error_response(message, status_code=400):
    """Return error response"""
    return jsonify({'error': message}), status_code

def success_response(data=None, message='Success', status_code=200):
    """Return success response"""
    response = {'message': message}
    if data:
        response['data'] = data
    return jsonify(response), status_code