import { useState, useEffect } from "react";
import { Building2, User } from "lucide-react";

export default function Step2_BusinessBankAccount({ nextStep, prevStep, updateFormData, formData }) {
  const [selected, setSelected] = useState(formData.accountType || "");
  const [error, setError] = useState("");

  // Keep parent data in sync whenever user selects something
  const handleSelect = (type) => {
    setSelected(type);
    updateFormData({ accountType: type });
    setError(""); // clear error on selection
  };

  // If returning to this step, restore previous selection
  useEffect(() => {
    if (formData.accountType) {
      setSelected(formData.accountType);
    }
  }, [formData.accountType]);

  const handleNext = () => {
    if (!selected) {
      setError("Please select an account type before continuing.");
      return;
    }
    updateFormData({ accountType: selected });
    nextStep();
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-4xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-2">
          Will this transaction be done by Personal or Business Bank account?
        </h1>
        <p className="text-gray-400 mb-1">
          Help us understand how you intend to transact the OTC trade.
        </p>
        

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {/* Business */}
          <div
            onClick={() => handleSelect("Business")}
            className={`cursor-pointer bg-[#2a2a33] text-center rounded-xl p-10 border-2 transition-all duration-200 
              ${
                selected === "Business"
                  ? "border-blue-500 bg-[#22222a]"
                  : "border-transparent hover:border-blue-500/60 hover:bg-[#24242c]"
              }`}
          >
            <Building2 className="w-14 h-14 mx-auto text-blue-500" />
            <p className="text-white mt-4 text-lg font-medium">Business</p>
          </div>

          {/* Personal */}
          <div
            onClick={() => handleSelect("Personal")}
            className={`cursor-pointer bg-[#2a2a33] text-center rounded-xl p-10 border-2 transition-all duration-200 
              ${
                selected === "Personal"
                  ? "border-blue-500 bg-[#22222a]"
                  : "border-transparent hover:border-blue-500/60 hover:bg-[#24242c]"
              }`}
          >
            <User className="w-14 h-14 mx-auto text-blue-500" />
            <p className="text-white mt-4 text-lg font-medium">Personal</p>
          </div>
        </div>

        {/* Inline error message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-12">
          <button
            onClick={prevStep}
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
