import React from "react";

export default function StepNavigation({ currentStep, totalSteps, onNext, onBack }) {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onBack}
        disabled={currentStep === 1}
        className={`px-6 py-2 rounded-md border ${
          currentStep === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-blue-500 border-blue-400 hover:bg-blue-50"
        }`}
      >
        Back
      </button>

      <button
        onClick={onNext}
        className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        {currentStep === totalSteps ? "Submit" : "Next"}
      </button>
    </div>
  );
}
