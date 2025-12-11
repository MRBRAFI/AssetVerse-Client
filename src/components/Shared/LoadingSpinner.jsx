const LoadingSpinner = ({ smallHeight, message = "Loading..." }) => {
  const containerHeight = smallHeight ? "h-[200px]" : "h-[70vh]";
  const sizeClass = smallHeight ? "h-12 w-12" : "h-20 w-20";

  return (
    <div
      className={`${containerHeight} flex flex-col justify-center items-center`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center">
        <svg
          className={`${sizeClass} text-blue-500 animate-spin`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>

        <p className="mt-4 text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
