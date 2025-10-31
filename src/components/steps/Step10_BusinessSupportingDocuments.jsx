import { useState, useEffect, useRef } from "react";
import { Upload } from "lucide-react";

export default function Step10_BusinessSupportingDocuments({
  nextStep,
  prevStep,
  updateFormData,
  formData,
  isLastStep,
}) {
  const [data, setData] = useState({
    orgChart: null,
    shareholdersAgreement: null,
    articlesOfIncorporation: null,
    amlKycPolicy: null,
    financialWireInfo: null,
    
  });

  const [errors, setErrors] = useState({});

  const fileRefs = {
    orgChart: useRef(),
    shareholdersAgreement: useRef(),
    articlesOfIncorporation: useRef(),
    amlKycPolicy: useRef(),
    financialWireInfo: useRef(),
    
  };

  // Sync with parent formData
  useEffect(() => {
    if (formData) {
      setData((prev) => ({
        ...prev,
        ...formData,
      }));
    }
  }, [formData]);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(",")[1];
      const newData = {
        ...data,
        [field]: {
          name: file.name,
          type: file.type,
          base64: base64Data,
        },
      };
      setData(newData);
      updateFormData(newData);
      setErrors((prev) => ({ ...prev, [field]: false }));
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    const newErrors = {};

    // Required files only
    const requiredFields = ["orgChart", "articlesOfIncorporation"];
    requiredFields.forEach((field) => {
      if (!data[field]) newErrors[field] = true;
    });

    setErrors(newErrors);

    // Stop if any required fields are missing
    if (Object.keys(newErrors).length > 0) return;

    updateFormData(data);
    nextStep(data);
  };

  const renderUploadField = (label, field, required = false, optional = false) => (
    <div className="flex flex-col sm:flex-row justify-between gap-6">
      <div className="flex flex-col flex-col-reverse sm:flex-row items-center gap-3 w-56">
        <button
          type="button"
          onClick={() => fileRefs[field].current.click()}
          className={`flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-md border-2 border-transparent transition duration-200 w-full ${
            errors[field] ? "border-red-500" : ""
          }`}
        >
          <Upload />
          <span>Upload File</span>
        </button>
        <input
          type="file"
          ref={fileRefs[field]}
          className="hidden"
          onChange={(e) => handleFileChange(e, field)}
        />
      </div>

      <div className="flex-1">
        <p className="text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
          {optional && <span className="text-gray-500"> (optional)</span>}
        </p>

        {errors[field] && (
          <p className="text-red-500 text-xs mt-1">This file is required</p>
        )}

        {data[field]?.name && (
          <p className="text-sm text-blue-400 mt-1 italic">
            Uploaded: {data[field].name}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-5xl rounded-2xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-8">
          Business Supporting Documents
        </h1>

        <div className="space-y-8">
          {renderUploadField(
            "Organization Chart / Corporation Ownership / Control Structure",
            "orgChart",
            true
          )}

          {renderUploadField("Shareholders Agreement", "shareholdersAgreement")}

          {renderUploadField(
            "Articles of Incorporation / Certificate of Incorporation",
            "articlesOfIncorporation",
            true
          )}

          {renderUploadField("AML / KYC Policy", "amlKycPolicy", false, true)}

          {renderUploadField(
            "Financial account wire information",
            "financialWireInfo"
          )}

         
        </div>

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
            {isLastStep ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
