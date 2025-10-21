import { useState } from "react";

export default function DiditKycModal({ url, onClose }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-[760px] h-[880px] rounded-xl overflow-hidden relative shadow-2xl">
        {/* Loader while iframe loads */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <iframe
          src={url}
          title="Didit Verification"
          className="w-full h-full border-0"
          onLoad={() => setIsLoaded(true)}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-700 text-xl font-bold hover:text-red-500 transition"
        >
          ×
        </button>
      </div>
    </div>
  );
}
