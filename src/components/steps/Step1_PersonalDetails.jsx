import { useState, useEffect } from "react";
import DiditKycModal from "./DiditKycModal";

export default function Step1_PersonalDetails({ nextStep, updateFormData, formData }) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    countryOfBirth: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [kycUrl, setKycUrl] = useState(null);
  const [showKycModal, setShowKycModal] = useState(false);

  // Load existing data
  useEffect(() => {
    if (formData) {
      setData((prev) => ({ ...prev, ...formData }));
    }
  }, [formData]);

  // Sync data changes
  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
    updateFormData(newData);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleNext = async () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "country",
      "zip",
      "countryOfBirth",
      "dob",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!data[field]?.trim()) newErrors[field] = "This field is required.";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsVerifying(true);

      // 1️⃣ Create Didit session
      const res = await fetch("/api/start-kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          type: "main",
        }),
      });

      const result = await res.json();
      if (!result.url) {
        setIsVerifying(false);
        alert("Failed to start KYC session.");
        return;
      }

      // 2️⃣ Show Didit modal
      setKycUrl(result.url);
      setShowKycModal(true);

      // 3️⃣ Poll backend for approval
      const interval = setInterval(async () => {
        try {
          const check = await fetch(
            `/api/kyc-status/${encodeURIComponent(data.email)}`
          );
          const status = await check.json();

          if (status?.status === "Approved" || status?.decision === "verified") {
            clearInterval(interval);
            setShowKycModal(false);
            setIsVerifying(false);
            alert("✅ KYC verification completed!");
            updateFormData(data);
            nextStep();
          }
        } catch (err) {
          console.warn("Polling error:", err);
        }
      }, 5000);
    } catch (err) {
      console.error("KYC error:", err);
      setIsVerifying(false);
      alert("Something went wrong with KYC setup.");
    }
  };

  const renderInput = (field) => (
    <div key={field.name}>
      <label className="block text-gray-300 mb-0.5">
        {field.label} <span className="text-red-500">*</span>
      </label>
      <input
        type={field.type || "text"}
        name={field.name}
        placeholder={field.placeholder}
        value={data[field.name] || ""}
        onChange={handleChange}
        className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 ${
          errors[field.name] ? "ring-2 ring-red-500" : "focus:ring-blue-500"
        }`}
      />
      {errors[field.name] && (
        <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-6xl rounded-2xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-2">
          Contact Details
        </h1>
        <p className="text-gray-400 mb-8">
          Enter your contact information so we can discuss your OTC requirements in detail.
        </p>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "First Name", name: "firstName", placeholder: "John" },
            { label: "Last Name", name: "lastName", placeholder: "Dough" },
            { label: "Email Address", name: "email", placeholder: "john@example.com", type: "email" },
            { label: "Phone Number", name: "phone", placeholder: "+1 123 456 7890", type: "tel" },
          ].map(renderInput)}

          <div className="md:col-span-3">
            <label className="block text-gray-300 mb-0.5">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Residential Address"
              value={data.address || ""}
              onChange={handleChange}
              className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                errors.address ? "ring-2 ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {[
            { label: "City", name: "city", placeholder: "City Name" },
            { label: "State / Province", name: "state", placeholder: "State or Province" },
            { label: "Country", name: "country", placeholder: "Country of Residence" },
            { label: "Zip Code / Postal Code", name: "zip", placeholder: "Zip Code / Postal Code" },
            { label: "Country of Birth", name: "countryOfBirth", placeholder: "Country of Birth" },
          ].map(renderInput)}

          <div>
            <label className="block text-gray-300 mb-0.5">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={data.dob || ""}
              onChange={handleChange}
              className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                errors.dob ? "ring-2 ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
            )}
          </div>
        </div>

        <div className="flex mt-10">
          <button
            onClick={handleNext}
            disabled={isVerifying}
            className={`${
              isVerifying ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-200`}
          >
            {isVerifying ? "Verifying..." : "Next"}
          </button>
        </div>
      </div>

      {/* 🔹 Reusable KYC Modal */}
      {showKycModal && (
        <DiditKycModal
          url={kycUrl}
          onClose={() => {
            setShowKycModal(false);
            setIsVerifying(false);
          }}
        />
      )}
    </div>
  );
}
