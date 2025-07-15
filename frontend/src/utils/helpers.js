export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format tags array to string
  export const formatTags = (tags) => {
    if (!tags || tags.length === 0) return [];
    if (typeof tags === 'string') {
      return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    return tags;
  };
  
  // Job types for dropdown
  export const JOB_TYPES = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Freelance'
  ];
  
  // Sort options
  export const SORT_OPTIONS = [
    { value: 'posting_date_desc', label: 'Date Posted: Newest First' },
    { value: 'posting_date_asc', label: 'Date Posted: Oldest First' },
    { value: 'title_asc', label: 'Title: A-Z' },
    { value: 'title_desc', label: 'Title: Z-A' },
    { value: 'company_asc', label: 'Company: A-Z' },
    { value: 'company_desc', label: 'Company: Z-A' }
  ];