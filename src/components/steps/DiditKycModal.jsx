import { useState } from "react";

export default function DiditKycModal({ url, onClose, onComplete }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClose = () => {
    if (onComplete) onComplete(); // ✅ trigger completion callback
    onClose(); // close modal normally
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-[760px] md:h-[800px] h-[650px] rounded-xl overflow-hidden relative shadow-2xl">
        {/* Loader while iframe loads */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center ">
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
          onClick={handleClose}
          className="absolute top-2 left-6 text-gray-200 text-3xl font-bold hover:text-red-500 transition"
        >
          ×
        </button>
      </div>
    </div>
  );
}
