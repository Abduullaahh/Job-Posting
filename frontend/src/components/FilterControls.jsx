import React from "react"
import { Search, Filter, RotateCcw } from "lucide-react"
import { JOB_TYPES, SORT_OPTIONS } from "../utils/helpers.js"

const FilterControls = ({
  filters,
  onFilterChange,
  onSearch,
  onReset,
  availableLocations = [],
  availableTags = [],
}) => {
  const handleInputChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch()
  }

  const hasActiveFilters = Object.values(filters).some(
    (value) => value && value !== "" && value !== "all" && value !== "posting_date_desc",
  )

  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4">
            <Filter className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Job Search Filters</h2>
            <p className="text-gray-600 text-sm mt-1">Find your perfect opportunity</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-8">
          {/* Search and Sort */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label htmlFor="search" className="block text-sm font-semibold text-gray-800">
                Search Keywords
              </label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                  id="search"
                  type="text"
                  placeholder="Job title, company, or keywords..."
                  value={filters.search || ""}
                  onChange={(e) => handleInputChange("search", e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <label htmlFor="tags" className="block text-sm font-semibold text-gray-800">
                Skills & Tags
              </label>
              <input
                id="tags"
                type="text"
                placeholder="e.g., JavaScript, Python, React, Remote..."
                value={filters.tag || ""}
                onChange={(e) => handleInputChange("tag", e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md"
              />
              <p className="text-sm text-gray-600 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Enter relevant skills, technologies, or job requirements
              </p>
            </div>

          </div>

          {/* Job Details Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label htmlFor="job_type" className="block text-sm font-semibold text-gray-800">
                Employment Type
              </label>
              <div className="relative">
                <select
                  id="job_type"
                  value={filters.job_type || "all"}
                  onChange={(e) => handleInputChange("job_type", e.target.value)}
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-900 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                >
                  <option value="all">All Types</option>
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
            </div>

            <div className="space-y-3">
              <label htmlFor="location" className="block text-sm font-semibold text-gray-800">
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="City, state, or remote..."
                value={filters.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="company" className="block text-sm font-semibold text-gray-800">
                Company
              </label>
              <input
                id="company"
                type="text"
                placeholder="Company name..."
                value={filters.company || ""}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="sort" className="block text-sm font-semibold text-gray-800">
                Sort Results
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={filters.sort || "posting_date_desc"}
                  onChange={(e) => handleInputChange("sort", e.target.value)}
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-gray-900 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Search Jobs
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onReset}
                className="group px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                <RotateCcw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-300" />
                Clear All Filters
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <p className="text-sm font-semibold text-gray-800">Active Filters</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || value === "" || value === "all" || value === "posting_date_desc") return null
                  const displayKey = key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-blue-800 text-sm font-medium rounded-full shadow-sm"
                    >
                      <span className="font-semibold">{displayKey}:</span>
                      <span className="ml-1">{value}</span>
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default FilterControls
