import { useState, useEffect, useRef } from "react";
import SignificantInfoPopup from "../SignificantInfoPopup";


export default function Step5_BusinessStructureCont({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) {
  const [otherSignificantCount, setOtherSignificantCount] = useState("");
  const [error, setError] = useState(""); // ✅ Local error state
  const mounted = useRef(false);
  const [showPopup, setShowPopup] = useState(true);


  // Load previously saved data on mount
  useEffect(() => {
    if (!mounted.current && formData) {
      setOtherSignificantCount(formData.otherSignificantCount || "");
      mounted.current = true;
    }
  }, [formData]);

  // Sync with parent formData
  useEffect(() => {
    if (mounted.current) {
      updateFormData({
        otherSignificantCount,
      });
    }
  }, [otherSignificantCount]);

  const handleNext = () => {
    if (!otherSignificantCount) {
      setError("Please select how many significant individuals.");
      return;
    }
    setError("");
    updateFormData({ otherSignificantCount });
    nextStep();
  };

  const handleBack = () => {
    updateFormData({ otherSignificantCount });
    prevStep();
  };

  return (
    <div className="min-h-screen flex items-center">
      {showPopup && <SignificantInfoPopup onClose={() => setShowPopup(false)} />}

      <div className="w-full max-w-5xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-2">
          Business Structure Cont.
        </h1>

        {/* ✅ Other significant individuals */}
        <div className="mt-10">
          <label className="block text-gray-300 mb-0.5">
            Select how many other Significant Individuals{" "}
            <span className="text-red-500">*</span>
          </label>
          <p className="text-gray-400 mb-2">
            Indicate the number of other significant individuals involved.
          </p>
          <select
            value={otherSignificantCount}
            onChange={(e) => {
              setOtherSignificantCount(e.target.value);
              setError("");
            }}
            className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 ${
              error ? "ring-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="">Number of Significant Individuals</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 mt-12">
          <button
            onClick={handleBack}
            className="bg-[#2a2a33] hover:bg-[#32323c] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-200"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
