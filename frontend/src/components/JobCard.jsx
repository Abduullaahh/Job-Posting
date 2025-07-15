import { MapPin, Calendar, Briefcase, Edit, Trash2, Building, TagIcon } from "lucide-react"
import { formatDate, formatTags } from "../utils/helpers"

const JobCard = ({ job, onEdit, onDelete }) => {
  const tags = formatTags(job.tags)

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${job.title}" at ${job.company}?`)) {
      onDelete(job.id)
    }
  }

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-5 transform translate-x-10 -translate-y-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400 to-blue-500 rounded-full opacity-5 transform -translate-x-8 translate-y-8"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                {job.title}
              </h3>
            </div>
            <div className="flex items-center text-gray-700">
              <Building className="w-4 h-4 mr-2 text-gray-500" />
              <p className="text-lg font-semibold">{job.company}</p>
            </div>
          </div>
          <div className="flex space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(job)}
              className="p-2.5 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-200"
              title="Edit job"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-200"
              title="Delete job"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mr-3 group-hover:bg-blue-100 transition-colors duration-200">
              <MapPin className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
            </div>
            <span className="font-medium">{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mr-3 group-hover:bg-purple-100 transition-colors duration-200">
              <Briefcase className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors duration-200" />
            </div>
            <span className="font-medium">{job.job_type}</span>
          </div>
          <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mr-3 group-hover:bg-green-100 transition-colors duration-200">
              <Calendar className="w-4 h-4 text-gray-500 group-hover:text-green-600 transition-colors duration-200" />
            </div>
            <span className="font-medium">Posted {formatDate(job.posting_date)}</span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center mb-3">
              <TagIcon className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Skills & Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-all duration-200 transform hover:scale-105 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </div>
  )
}

export default JobCard
