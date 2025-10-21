import { useState, useEffect } from "react";

export default function Declarations({
  nextStep,
  prevStep,
  updateFormData,
  formData,
  isLastStep,
}) {
  const [data, setData] = useState({
    PersonFinancialSanctions: "",
    PersonIsPEP: "",
    PersonChargedWithCrime: "",
  });

  const [errors, setErrors] = useState({
    PersonFinancialSanctions: "",
    PersonIsPEP: "",
    PersonChargedWithCrime: "",
  });

  // Load saved data if exists
  useEffect(() => {
    if (formData) {
      setData((prev) => ({ ...prev, ...formData }));
    }
  }, [formData]);

  // Handle Yes/No select
  const handleSelect = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error on select
  };

  // Reusable Yes/No buttons
  const yesNoButton = (field) => (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
      {["Yes", "No"].map((option) => (
        <div
          key={option}
          onClick={() => handleSelect(field, option)}
          className={`cursor-pointer px-6 py-2 rounded-lg border-2 transition-all duration-200 text-center sm:text-left ${
            data[field] === option
              ? "border-blue-500 bg-[#22222a]"
              : "border-transparent bg-[#2a2a33] hover:border-blue-500/60 hover:bg-[#24242c]"
          }`}
        >
          <p className="text-gray-100 font-medium">{option}</p>
        </div>
      ))}
    </div>
  );

  const handleNext = () => {
    let newErrors = {
      PersonFinancialSanctions: "",
      PersonIsPEP: "",
      PersonChargedWithCrime: "",
    };
    let hasError = false;

    // Validate each required field
    if (!data.PersonFinancialSanctions) {
      newErrors.PersonFinancialSanctions =
        "Please select Yes or No for this question.";
      hasError = true;
    }
    if (!data.PersonIsPEP) {
      newErrors.PersonIsPEP = "Please select Yes or No for this question.";
      hasError = true;
    }
    if (!data.PersonChargedWithCrime) {
      newErrors.PersonChargedWithCrime =
        "Please select Yes or No for this question.";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      updateFormData(data);
      nextStep();
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-5xl p-10 shadow-2xl rounded-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-8">
          Personal Declarations
        </h1>

        <div className="space-y-10">
          {/* Question 1 */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {yesNoButton("PersonFinancialSanctions")}
              <p className="text-gray-300">
                Have you ever been subject to any local or international
                financial sanctions? <span className="text-red-500">*</span>
              </p>
            </div>
            {errors.PersonFinancialSanctions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.PersonFinancialSanctions}
              </p>
            )}
          </div>

          {/* Question 2 */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {yesNoButton("PersonIsPEP")}
              <p className="text-gray-300">
                Are you a politically exposed person (PEP)?{" "}
                <span className="text-red-500">*</span>
              </p>
            </div>
            {errors.PersonIsPEP && (
              <p className="text-red-500 text-sm mt-1">{errors.PersonIsPEP}</p>
            )}
          </div>

          {/* Question 3 */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {yesNoButton("PersonChargedWithCrime")}
              <p className="text-gray-300">
                Has the individual above ever been charged with the crime of
                money-laundering, financing, or supporting terrorism or other
                economic crimes? <span className="text-red-500">*</span>
              </p>
            </div>
            {errors.PersonChargedWithCrime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.PersonChargedWithCrime}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mt-12">
          {" "}
          <button
            onClick={prevStep}
            className="bg-[#2a2a33] hover:bg-[#32323c] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-200"
          >
            {" "}
            Back{" "}
          </button>{" "}
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-200"
          >
            {" "}
            {isLastStep ? "Submit" : "Next"}{" "}
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
