import { useState } from "react";

export default function useFormSteps(totalSteps = 12) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  // ✅ Go to Next
  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  // ✅ Go to previous step
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // ✅ Merge new data into existing formData
  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  // ✅ Reset entire form
  const resetForm = () => {
    setFormData({});
    setStep(1);
  };

  // ✅ Final submit (send to backend)
  const submitForm = async () => {
    try {
      const formToSend = new FormData();

      // append all key/value pairs
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formToSend.append(key, value, value.name);
        } else if (Array.isArray(value)) {
          value.forEach((v, i) => {
            formToSend.append(`${key}[${i}]`, JSON.stringify(v));
          });
        } else if (typeof value === "object" && value !== null) {
          formToSend.append(key, JSON.stringify(value));
        } else {
          formToSend.append(key, value);
        }
      });

      // 🔥 Example API endpoint
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formToSend,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const result = await response.json();
      console.log("✅ Form submitted successfully:", result);
      return result;
    } catch (error) {
      console.error("❌ Form submission error:", error);
      throw error;
    }
  };

  return {
    step,
    formData,
    nextStep,
    prevStep,
    updateFormData,
    submitForm,
    resetForm,
  };
}
