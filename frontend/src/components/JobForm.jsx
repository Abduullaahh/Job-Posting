import { useState, useEffect } from "react"
import { Save, X, Briefcase, Building, MapPin, Calendar, Tag } from "lucide-react"
import { JOB_TYPES } from "../utils/helpers"

const JobForm = ({ job, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "Full-time",
    tags: "",
    posting_date: "",
  })

  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        job_type: job.job_type || "Full-time",
        tags: Array.isArray(job.tags) ? job.tags.join(", ") : job.tags || "",
        posting_date: job.posting_date ? job.posting_date.split("T")[0] : "",
      })
    } else {
      // Set default posting date to today for new jobs
      const today = new Date().toISOString().split("T")[0]
      setFormData((prev) => ({
        ...prev,
        posting_date: today,
      }))
    }
  }, [job])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.job_type) {
      newErrors.job_type = "Job type is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const submitData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    }

    onSubmit(submitData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleFocus = (field) => {
    setFocusedField(field)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const getInputClasses = (fieldName) => {
    const baseClasses =
      "w-full pl-10 pr-4 py-3.5 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none"

    if (errors[fieldName]) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100`
    }

    if (focusedField === fieldName) {
      return `${baseClasses} border-blue-500 ring-4 ring-blue-100`
    }

    return `${baseClasses} border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100`
  }

  return (
    <div className="relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400 to-blue-500 rounded-full opacity-10 transform -translate-x-12 translate-y-12"></div>

      <form onSubmit={handleSubmit} className="relative space-y-6 text-black">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
            Job Title <span className="text-blue-600">*</span>
          </label>
          <div className="relative">
            <Briefcase
              className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                errors.title ? "text-red-400" : focusedField === "title" ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onFocus={() => handleFocus("title")}
              onBlur={handleBlur}
              className={getInputClasses("title")}
              placeholder="e.g., Software Engineer"
            />
          </div>
          {errors.title && (
            <p className="flex items-center mt-1.5 text-sm text-red-600">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              {errors.title}
            </p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-semibold text-gray-800">
            Company <span className="text-blue-600">*</span>
          </label>
          <div className="relative">
            <Building
              className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                errors.company ? "text-red-400" : focusedField === "company" ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              onFocus={() => handleFocus("company")}
              onBlur={handleBlur}
              className={getInputClasses("company")}
              placeholder="e.g., Tech Solutions Inc."
            />
          </div>
          {errors.company && (
            <p className="flex items-center mt-1.5 text-sm text-red-600">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              {errors.company}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-semibold text-gray-800">
            Location <span className="text-blue-600">*</span>
          </label>
          <div className="relative">
            <MapPin
              className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                errors.location ? "text-red-400" : focusedField === "location" ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              onFocus={() => handleFocus("location")}
              onBlur={handleBlur}
              className={getInputClasses("location")}
              placeholder="e.g., San Francisco, CA or Remote"
            />
          </div>
          {errors.location && (
            <p className="flex items-center mt-1.5 text-sm text-red-600">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              {errors.location}
            </p>
          )}
        </div>

        {/* Job Type and Posting Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="job_type" className="block text-sm font-semibold text-gray-800">
              Job Type <span className="text-blue-600">*</span>
            </label>
            <div className="relative">
              <Briefcase
                className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  errors.job_type ? "text-red-400" : focusedField === "job_type" ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <select
                id="job_type"
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                onFocus={() => handleFocus("job_type")}
                onBlur={handleBlur}
                className={`${getInputClasses("job_type")} appearance-none bg-white`}
              >
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.job_type && (
              <p className="flex items-center mt-1.5 text-sm text-red-600">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errors.job_type}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="posting_date" className="block text-sm font-semibold text-gray-800">
              Posting Date
            </label>
            <div className="relative">
              <Calendar
                className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  focusedField === "posting_date" ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <input
                type="date"
                id="posting_date"
                name="posting_date"
                value={formData.posting_date}
                onChange={handleChange}
                onFocus={() => handleFocus("posting_date")}
                onBlur={handleBlur}
                className={getInputClasses("posting_date")}
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-semibold text-gray-800">
            Tags
          </label>
          <div className="relative">
            <Tag
              className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                focusedField === "tags" ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              onFocus={() => handleFocus("tags")}
              onBlur={handleBlur}
              className={getInputClasses("tags")}
              placeholder="e.g., Python, React, Remote, Senior"
            />
          </div>
          <p className="flex items-center mt-1.5 text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Separate tags with commas
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium flex items-center shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 font-medium flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:transform-none"
          >
            <Save className="w-5 h-5 mr-2" />
            {isLoading ? "Saving..." : job ? "Update Job" : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default JobForm
