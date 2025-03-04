export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <svg
            className="animate-spin h-10 w-10 text-blue-500"
            viewBox="0 0 24 24"
            >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
            ></path>
            </svg>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
        </div>
    )
}