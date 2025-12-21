const LoadingSpinner = ({ smallHeight, message = "Loading assets..." }) => {
  const containerHeight = smallHeight ? "h-[200px]" : "h-[70vh]";
  const sizeClass = smallHeight ? "h-16 w-16" : "h-24 w-24";
  const iconSize = smallHeight ? "h-6 w-6" : "h-10 w-10";

  return (
    <div
      className={`${containerHeight} flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div
            className={`${sizeClass} rounded-full border-4 border-gray-200 border-t-indigo-600 border-r-indigo-500 animate-spin`}
            aria-hidden="true"
          />

          <div
            className={`${sizeClass} absolute inset-0 rounded-full border-4 border-transparent border-b-purple-400 animate-spin`}
            style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className={`${iconSize} text-indigo-600 animate-pulse`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <p className="text-gray-700 font-semibold text-lg tracking-wide">
            {message}
          </p>
          <div className="flex space-x-1">
            <span
              className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>

        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 animate-shimmer"
            style={{
              width: "50%",
              animation: "shimmer 2s infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
