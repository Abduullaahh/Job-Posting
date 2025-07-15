import { useState, useEffect } from "react"
import { Plus, Briefcase, AlertCircle, Sparkles, TrendingUp } from "lucide-react"
import JobCard from "./components/JobCard"
import JobForm from "./components/JobForm"
import FilterControls from "./components/FilterControls"
import LoadingSpinner from "./components/LoadingSpinner"
import Modal from "./components/Modal"
import { jobsApi } from "./services/api"

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    job_type: "all",
    location: "",
    company: "",
    tag: "",
    sort: "posting_date_desc",
  })

  // Fetch jobs on component mount and when filters change
  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async (customFilters = null) => {
    try {
      setLoading(true)
      setError(null)

      const filterParams = customFilters || filters

      // Build API filters
      const apiFilters = {}
      if (filterParams.job_type && filterParams.job_type !== "all") {
        apiFilters.job_type = filterParams.job_type
      }
      if (filterParams.location) {
        apiFilters.location = filterParams.location
      }
      if (filterParams.company) {
        apiFilters.company = filterParams.company
      }
      if (filterParams.tag) {
        apiFilters.tag = filterParams.tag
      }
      if (filterParams.sort) {
        apiFilters.sort = filterParams.sort
      }

      const response = await jobsApi.getJobs(apiFilters)

      let jobsList = response.jobs || []

      // Client-side search if search term is provided
      if (filterParams.search) {
        const searchTerm = filterParams.search.toLowerCase()
        jobsList = jobsList.filter(
          (job) => job.title.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm),
        )
      }

      setJobs(jobsList)
    } catch (err) {
      console.error("Error fetching jobs:", err)
      setError("Failed to load jobs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchJobs(filters)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    const resetFilters = {
      search: "",
      job_type: "all",
      location: "",
      company: "",
      tag: "",
      sort: "posting_date_desc",
    }
    setFilters(resetFilters)
    fetchJobs(resetFilters)
  }

  const handleCreateJob = async (jobData) => {
    try {
      setFormLoading(true)
      setError(null)

      await jobsApi.createJob(jobData)

      setIsFormOpen(false)
      fetchJobs() // Refresh the job list
    } catch (err) {
      console.error("Error creating job:", err)
      setError(err.response?.data?.error || "Failed to create job. Please try again.")
    } finally {
      setFormLoading(false)
    }
  }

  const handleUpdateJob = async (jobData) => {
    try {
      setFormLoading(true)
      setError(null)

      await jobsApi.updateJob(editingJob.id, jobData)

      setIsFormOpen(false)
      setEditingJob(null)
      fetchJobs() // Refresh the job list
    } catch (err) {
      console.error("Error updating job:", err)
      setError(err.response?.data?.error || "Failed to update job. Please try again.")
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteJob = async (jobId) => {
    try {
      setError(null)
      await jobsApi.deleteJob(jobId)
      fetchJobs() // Refresh the job list
    } catch (err) {
      console.error("Error deleting job:", err)
      setError(err.response?.data?.error || "Failed to delete job. Please try again.")
    }
  }

  const handleEditJob = (job) => {
    setEditingJob(job)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingJob(null)
  }

  const handleFormSubmit = (jobData) => {
    if (editingJob) {
      handleUpdateJob(jobData)
    } else {
      handleCreateJob(jobData)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-5 transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400 to-blue-500 rounded-full opacity-5 transform -translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-100 to-purple-200 rounded-full opacity-3 transform -translate-x-32 -translate-y-32"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white bg-opacity-80 backdrop-blur-sm shadow-lg border-b border-gray-200">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mr-4 shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Job Listings
                </h1>
                <p className="text-sm text-gray-600 font-medium">Manage your opportunities</p>
              </div>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Job
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-9xl mx-auto">
          {/* Error Alert */}
          {error && (
            <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-xl mr-4">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900 mb-1">Something went wrong</h3>
                  <p className="text-red-700">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Filter Controls */}
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onReset={handleResetFilters}
          />

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <LoadingSpinner size="lg" text="Loading your jobs..." variant="card" />
              </div>
            </div>
          )}

          {/* Job Grid */}
          {!loading && (
            <>
              {/* Results Summary */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {jobs.length === 0
                        ? "No jobs found matching your criteria"
                        : `Found ${jobs.length} job${jobs.length !== 1 ? "s" : ""}`}
                    </p>
                  </div>
                  {jobs.length > 0 && (
                    <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
                      <span className="font-medium">Total opportunities: {jobs.length}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Jobs Grid */}
              {jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {jobs.map((job, index) => (
                    <div key={job.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                      <JobCard job={job} onEdit={handleEditJob} onDelete={handleDeleteJob} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mx-auto mb-6">
                      <Briefcase className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No jobs found</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {Object.values(filters).some(
                        (value) => value && value !== "" && value !== "all" && value !== "posting_date_desc",
                      )
                        ? "Try adjusting your filters or search terms to find more opportunities."
                        : "Ready to start your job search journey? Add your first job listing to get started."}
                    </p>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      {Object.values(filters).some(
                        (value) => value && value !== "" && value !== "all" && value !== "posting_date_desc",
                      )
                        ? "Add New Job"
                        : "Add First Job"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Job Form Modal */}
      <Modal isOpen={isFormOpen} onClose={handleCloseForm} title={editingJob ? "Edit Job" : "Add New Job"}>
        <JobForm job={editingJob} onSubmit={handleFormSubmit} onCancel={handleCloseForm} isLoading={formLoading} />
      </Modal>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default App
