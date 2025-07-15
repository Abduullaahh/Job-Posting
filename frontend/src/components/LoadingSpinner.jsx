import { Loader2 } from "lucide-react"

const LoadingSpinner = ({ size = "md", text, variant = "default" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }

  const paddingClasses = {
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  }

  const variants = {
    default: {
      container: "bg-white rounded-2xl shadow-lg border border-gray-100",
      spinner: "text-blue-600",
      text: "text-gray-600",
      dots: "bg-blue-500",
    },
    minimal: {
      container: "",
      spinner: "text-blue-600",
      text: "text-gray-600",
      dots: "bg-blue-500",
    },
    card: {
      container: "bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-xl border border-gray-100",
      spinner: "text-blue-600",
      text: "text-gray-700",
      dots: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    overlay: {
      container: "bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200",
      spinner: "text-blue-600",
      text: "text-gray-700",
      dots: "bg-blue-500",
    },
  }

  const currentVariant = variants[variant]

  return (
    <div className={`flex flex-col justify-center items-center ${paddingClasses[size]} ${currentVariant.container}`}>
      {/* Decorative Elements for card variant */}
      {variant === "card" && (
        <>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 transform translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400 to-blue-500 rounded-full opacity-10 transform -translate-x-8 translate-y-8"></div>
        </>
      )}

      <div className="relative flex flex-col items-center space-y-4">
        {/* Main Spinner */}
        <div className="relative">
          <Loader2 className={`${sizeClasses[size]} animate-spin ${currentVariant.spinner} drop-shadow-sm`} />

          {/* Spinning Ring Effect */}
          <div
            className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-t-blue-200 border-r-blue-200 rounded-full animate-spin`}
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>

        {/* Loading Text */}
        {text && (
          <div className="text-center">
            <p className={`${textSizeClasses[size]} font-medium ${currentVariant.text}`}>{text}</p>
          </div>
        )}

        {/* Animated Dots */}
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 ${currentVariant.dots} rounded-full animate-pulse`}
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: "1s",
              }}
            ></div>
          ))}
        </div>

        {/* Progress Bar Effect */}
        {(variant === "card" || variant === "overlay") && (
          <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

// Preset Loading Components
export const LoadingCard = ({ text = "Loading..." }) => <LoadingSpinner size="lg" text={text} variant="card" />

export const LoadingOverlay = ({ text = "Please wait..." }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <LoadingSpinner size="xl" text={text} variant="overlay" />
  </div>
)

export const LoadingInline = ({ text, size = "sm" }) => <LoadingSpinner size={size} text={text} variant="minimal" />

export const LoadingButton = ({ text = "Loading..." }) => (
  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-xl">
    <LoadingSpinner size="sm" variant="minimal" />
    <span className="text-sm font-medium text-gray-600">{text}</span>
  </div>
)

export default LoadingSpinner
