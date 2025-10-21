import { useState, useEffect } from "react";

export default function Step6_SignificantIndividual({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) {
  const count = parseInt(formData.otherSignificantCount || 1);

  const blankIndividual = {
    roles: [],
    SigniFirstName: "",
    SigniLastName: "",
    SigniEmail: "",
    SigniPhone: "",
    SigniAddress: "",
    SigniCity: "",
    SigniState: "",
    SigniCountry: "",
    SigniZip: "",
    SigniCountryOfBirth: "",
    SigniDateOfBirth: "",
    SigniOwnershipPercent: "",
    SigniIsPEP: null,
    chargedWithCrime: null,
    financialSanctions: null,
    kycStatus: null, // ✅ Track KYC sending status
  };

  const [individuals, setIndividuals] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isSending, setIsSending] = useState(false);

  // 🧠 Initialize or restore individuals
  useEffect(() => {
    if (formData.significantIndividualsData) {
      const existing = formData.significantIndividualsData.slice(0, count);
      while (existing.length < count) {
        existing.push({ ...blankIndividual });
      }
      setIndividuals(existing);
    } else {
      setIndividuals(
        Array(count)
          .fill(null)
          .map(() => ({ ...blankIndividual }))
      );
    }
  }, [count, formData.significantIndividualsData]);

  // 🔄 Sync changes to parent
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateFormData({ significantIndividualsData: [...individuals] });
    }, 300);
    return () => clearTimeout(timeout);
  }, [individuals]);

  const roleOptions = [
    "Beneficiary Owner",
    "Director",
    "Authorized Signatory",
    "Control Person",
  ];

  const toggleRole = (index, role) => {
    setIndividuals((prev) => {
      const updated = [...prev];
      const roles = updated[index].roles.includes(role)
        ? updated[index].roles.filter((r) => r !== role)
        : [...updated[index].roles, role];
      updated[index].roles = roles;
      return updated;
    });
  };

  const handleInput = (index, field, value) => {
    setIndividuals((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const validateIndividuals = () => {
    const newErrors = individuals.map((ind) => {
      const missing = [];
      if (ind.roles.length === 0) missing.push("roles");
      if (!ind.SigniFirstName) missing.push("SigniFirstName");
      if (!ind.SigniLastName) missing.push("SigniLastName");
      if (!ind.SigniEmail) missing.push("SigniEmail");
      if (!ind.SigniPhone) missing.push("SigniPhone");
      if (!ind.SigniAddress) missing.push("SigniAddress");
      if (!ind.SigniCity) missing.push("SigniCity");
      if (!ind.SigniState) missing.push("SigniState");
      if (!ind.SigniZip) missing.push("SigniZip");
      if (!ind.SigniCountry) missing.push("SigniCountry");
      if (!ind.SigniCountryOfBirth) missing.push("SigniCountryOfBirth");
      if (!ind.SigniDateOfBirth) missing.push("SigniDateOfBirth");
      if (!ind.SigniOwnershipPercent) missing.push("SigniOwnershipPercent");
      if (ind.SigniIsPEP === null) missing.push("SigniIsPEP");
      if (ind.chargedWithCrime === null) missing.push("chargedWithCrime");
      if (ind.financialSanctions === null)
        missing.push("financialSanctions");
      return missing;
    });

    setErrors(newErrors);
    return newErrors.every((e) => e.length === 0);
  };

  // 📩 Automatically send KYC links for all individuals
  const handleNext = async () => {
    if (!validateIndividuals()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSending(true);
    try {
      const updatedIndividuals = [...individuals];

      for (let i = 0; i < updatedIndividuals.length; i++) {
        const ind = updatedIndividuals[i];
        updatedIndividuals[i].kycStatus = "sending";
        setIndividuals([...updatedIndividuals]);

        // Step 1️⃣ - Create Didit KYC session
        const kycRes = await fetch("/api/start-kyc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${ind.SigniFirstName} ${ind.SigniLastName}`,
            email: ind.SigniEmail,
            type: "significant",
          }),
        });

        const kycData = await kycRes.json();
        if (!kycData.url) {
          throw new Error("Failed to create KYC session for " + ind.SigniEmail);
        }

        // Step 2️⃣ - Send email via Netlify function
        const functionURL =
          window.location.hostname === "localhost"
            ? "http://localhost:8888/.netlify/functions/sendEmail"
            : "/.netlify/functions/sendEmail";

        const payload = {
          type: "SignificantIndividualKYC",
          to: ind.SigniEmail,
          name: `${ind.SigniFirstName} ${ind.SigniLastName}`,
          kycLink: kycData.url,
        };

        const emailRes = await fetch(functionURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData: payload }),
        });

        const emailResult = await emailRes.json();
        if (!emailRes.ok) throw new Error(emailResult.error);

        updatedIndividuals[i].kycStatus = "sent";
        setIndividuals([...updatedIndividuals]);
      }

     
      updateFormData({ significantIndividualsData: updatedIndividuals });
      nextStep();
    } catch (err) {
      console.error("❌ Error sending KYC:", err);
      alert("Something went wrong sending KYC links. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-5xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-2">
          Significant Individual
        </h1>

        {individuals.map((ind, idx) => (
          <div key={idx} className="mt-10 border-t border-gray-600 pt-10">
            {individuals.length > 1 && (
              <h2 className="text-xl font-semibold text-white mb-6">
                Significant Individual {idx + 1}
              </h2>
            )}

            {/* Roles */}
            <label className="block text-gray-300 mb-0.5">
              Significant Individual (Check all that apply){" "}
              <span className="text-red-500">*</span>
            </label>
            {errors[idx]?.includes("roles") && (
              <p className="text-red-500 text-xs mb-2">
                Please select at least one role.
              </p>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              {roleOptions.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(idx, role)}
                  className={`px-6 py-3 rounded-lg text-white font-sm text-left border-2 transition-all duration-200 ${
                    ind.roles.includes(role)
                      ? "border-blue-500 bg-[#22222a]"
                      : "bg-[#2a2a33] border-transparent hover:border-blue-500/60 hover:bg-[#24242c]"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Personal Info */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {[
                { label: "First Name", field: "SigniFirstName" },
                { label: "Last Name", field: "SigniLastName" },
                { label: "Email Address", field: "SigniEmail", type: "email" },
                { label: "Phone Number", field: "SigniPhone", type: "tel" },
              ].map((input, i) => (
                <div key={i}>
                  <label className="block text-gray-300 mb-0.5">
                    {input.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={input.type || "text"}
                    placeholder={input.label}
                    value={ind[input.field]}
                    onChange={(e) =>
                      handleInput(idx, input.field, e.target.value)
                    }
                    className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                      errors[idx]?.includes(input.field)
                        ? "ring-red-500"
                        : "focus:ring-blue-500"
                    }`}
                  />
                  {input.field === "SigniEmail" && ind.kycStatus && (
                    <p
                      className={`text-xs mt-1 ${
                        ind.kycStatus === "sent"
                          ? "text-green-400"
                          : ind.kycStatus === "sending"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {ind.kycStatus === "sent"
                        ? "✅ KYC Link Sent"
                        : ind.kycStatus === "sending"
                        ? "⏳ Sending KYC..."
                        : "❌ Failed to Send KYC"}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Address Fields */}
            <div className="grid md:grid-cols-4 gap-6 mt-6">
              {[
                { label: "Address", field: "SigniAddress", col: 2 },
                { label: "City", field: "SigniCity" },
                { label: "State", field: "SigniState" },
                { label: "Zip Code", field: "SigniZip" },
                { label: "Country", field: "SigniCountry" },
                { label: "Country of Birth", field: "SigniCountryOfBirth" },
                { label: "Date of Birth", field: "SigniDateOfBirth", type: "date" },
                { label: "Percent Ownership", field: "SigniOwnershipPercent", type: "number" },
              ].map((input, i) => (
                <div key={i} className={input.col === 2 ? "md:col-span-2" : ""}>
                  <label className="block text-gray-300 mb-0.5">
                    {input.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={input.type || "text"}
                    placeholder={input.label}
                    value={ind[input.field]}
                    onChange={(e) =>
                      handleInput(idx, input.field, e.target.value)
                    }
                    className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                      errors[idx]?.includes(input.field)
                        ? "ring-red-500"
                        : "focus:ring-blue-500"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* PEP & Sanctions */}
            <div className="mt-10 space-y-6">
              {[
                {
                  label:
                    "Is the individual above a politically exposed person (PEP)?",
                  field: "SigniIsPEP",
                },
                {
                  label:
                    "Has the individual above ever been charged with money laundering, financing, supporting terrorism, or other economic crimes?",
                  field: "chargedWithCrime",
                },
                {
                  label:
                    "Has the individual above ever been subject to any local or international financial sanctions?",
                  field: "financialSanctions",
                },
              ].map((q) => (
                <div key={q.field}>
                  <label className="block text-gray-300 mb-0.5">
                    {q.label} <span className="text-red-500">*</span>
                  </label>
                  {errors[idx]?.includes(q.field) && (
                    <p className="text-red-500 text-xs mb-1">
                      Please select Yes or No.
                    </p>
                  )}
                  <div className="flex gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => handleInput(idx, q.field, true)}
                      className={`px-6 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                        ind[q.field] === true
                          ? "border-blue-500 bg-[#22222a] text-white"
                          : "bg-[#2a2a33] text-white hover:border-blue-500/60 hover:bg-[#24242c]"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInput(idx, q.field, false)}
                      className={`px-6 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                        ind[q.field] === false
                          ? "border-blue-500 bg-[#22222a] text-white"
                          : "bg-[#2a2a33] text-white hover:border-blue-500/60 hover:bg-[#24242c]"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

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
            disabled={isSending}
            className={`${
              isSending ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-200`}
          >
            {isSending ? "Sending KYC Links..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
