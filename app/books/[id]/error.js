"use client";

export default function Error({ error, reset }) {
    return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold">Something went wrong 😢</h2>

            <p className="text-gray-500">
                {error.message || "Failed to load book details."}
            </p>

            <button
                onClick={reset}
                className="px-4 py-2 bg-black text-white rounded"
            >
                Try Again
            </button>
        </div>
    );
}
