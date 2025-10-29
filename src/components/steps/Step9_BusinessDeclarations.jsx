import { useState, useEffect } from "react";

export default function Step9_BusinessDeclarations({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) {
  const [data, setData] = useState({
    activityInHighRiskCountry: "",
    operatesAsHedgeFund: "",
    operatesAsFinancialInstitution: "",
    hasHighRiskClients: "",

    statementMade: false,
    shareholdersRegisterAttached: false,
    organizationalChartAttached: false,
    chartAccurate: false,
    registerContainsRecord: false,
    noBearerShares: false,
    obtainedConsents: false,
    notActingThirdParty: false,
    acceptedTerms: false,
    acceptedPrivacy: false,
    authorizedOperation: false,
  });

  const [errors, setErrors] = useState({});

  // ✅ Load data from formData once
  useEffect(() => {
    if (formData) {
      setData((prev) => ({ ...prev, ...formData }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Handle Yes/No
  const handleSelect = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error on change
  };

  // ✅ Handle checkboxes
  const handleCheckbox = (e) => {
    const newData = { ...data, [e.target.name]: e.target.checked };
    setData(newData);
    updateFormData(newData);
  };

  // ✅ Handle Next with validation
  const handleNext = () => {
    const requiredFields = [
      "activityInHighRiskCountry",
      "operatesAsHedgeFund",
      "operatesAsFinancialInstitution",
      "hasHighRiskClients",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!data[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateFormData(data);
    nextStep();
  };

  // ✅ Yes/No Buttons with error display
  const yesNoButton = (field) => (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 mt-2">
        {["Yes", "No"].map((option) => (
          <div
            key={option}
            onClick={() => handleSelect(field, option)}
            className={`cursor-pointer px-6 py-2 rounded-lg border-2 transition-all duration-200 ${
              data[field] === option
                ? "border-blue-500 bg-[#22222a]"
                : "border-transparent bg-[#2a2a33] hover:border-blue-500/60 hover:bg-[#24242c]"
            }`}
          >
            <p className="text-gray-100 font-medium">{option}</p>
          </div>
        ))}
      </div>
      {errors[field] && (
        <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-6xl rounded-2xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-8">
          Business Declarations
        </h1>

        {/* ================= QUESTIONS ================= */}
        <div className="space-y-10">
          {/* 1. Activity in high-risk country */}
          <div>
            <div className="flex gap-4 items-start">
              {yesNoButton("activityInHighRiskCountry")}
              <div>
                <p className="text-gray-300">
                  Do you conduct any activity in or have business partners whose
                  residence or place of business is:{" "}
                  <span className="text-red-500">*</span>
                </p>
                {data.activityInHighRiskCountry === "Yes" && (
                  <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                    Afghanistan, Albania, Algeria, Bahamas, Bahrain, Bangladesh,
                    Barbados, Belarus, Botswana, Burkina Faso, Cambodia, Crimea
                    (unrecognized), DPRK, Donetsk, Ghana, Guyana, Iran, Iraq,
                    Jamaica, Jordan, Lebanon, Libya, Mali, Mauritania, Mongolia,
                    Morocco, Myanmar, Nicaragua, Niger, Pakistan, Palestine,
                    Panama, Russia, Somalia, Sudan, Syria, Uganda, Yemen,
                    Zimbabwe.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 2. Hedge Fund */}
          <div>
            <div className="flex gap-4 items-start">
              {yesNoButton("operatesAsHedgeFund")}
              <p className="text-gray-300">
                Does your company operate as a hedge fund, investment fund, or
                any other entity involved in a fund structure?{" "}
                <span className="text-red-500">*</span>
              </p>
            </div>
          </div>

          {/* 3. Financial Institution */}
          <div>
            <div className="flex gap-4 items-start">
              {yesNoButton("operatesAsFinancialInstitution")}
              <p className="text-gray-300">
                Does your business operate as a financial institution, providing
                services such as money transmission, lending, or brokerage?{" "}
                <span className="text-red-500">*</span>
              </p>
            </div>
          </div>

          
          {/* 4. High-Risk Clients */}
          <div>
            <div className="flex items-start gap-4">
              {yesNoButton("hasHighRiskClients")}
              <p className="text-gray-300">
                Does the corporation engage in, or have any of the following as
                clients: <span className="text-red-500">*</span>
              </p>
            </div>

            {/* Always visible descriptive list */}
            <div className="mt-5 ml-8">
              <p className="text-gray-300 mb-3">
                Examples of high-risk client activities include:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                <li>Accepting assets suspected to be criminal proceeds</li>
                <li>
                  Business with known or suspected terrorist/criminal
                  organizations
                </li>
                <li>Maintaining anonymous or shell bank accounts</li>
                <li>Accepting assets from individuals below age 18</li>
                <li>
                  Accepting assets from individuals above 65 with low income
                </li>
                <li>Binary Options</li>
                <li>Banknote sales</li>
                <li>Virtual mixers</li>
                <li>PEPs</li>
                <li>Marijuana or drug-related activities</li>
                <li>Shell Banks</li>
                <li>Correspondent Banks</li>
                <li>Arms/Defense</li>
                <li>Pirated audio/video content</li>
                <li>Adult Entertainment</li>
                <li>Counterfeit goods</li>
                <li>Pyramid schemes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= CHECKBOX AGREEMENTS ================= */}
        <div className="mt-10 space-y-5 text-gray-300">
          {[
            {
              name: "statementMade",
              label:
                "I have made or caused to be made such examinations or investigations as necessary to make the statements contained in this certificate.",
            },
            {
              name: "shareholdersRegisterAttached",
              label:
                "Attached are true, complete, and accurate copies of the shareholders' register and organizational chart of the Corporation.",
            },
            {
              name: "chartAccurate",
              label:
                "The Organizational Chart sets out true, complete, and current information on ownership and control.",
            },
            {
              name: "registerContainsRecord",
              label:
                "The Shareholders' Register contains a true and complete record of all holders of securities and warrants issued by the Corporation.",
            },
            {
              name: "noBearerShares",
              label:
                "The Corporation does not issue bearer shares. Relevant registers of threshold entities are also attached.",
            },
            {
              name: "obtainedConsents",
              label:
                "All necessary consents have been obtained to allow Done.com Inc. to collect and use personal information per its Privacy Policy.",
            },
            {
              name: "notActingThirdParty",
              label:
                "The Corporation is not acting on behalf of a third party in its dealings with Done.com Inc.",
            },
            {
              name: "acceptedTerms",
              label: "I have read and accept the Terms and Conditions.",
            },
            {
              name: "acceptedPrivacy",
              label: "I have read and accept the Privacy Policy.",
            },
            {
              name: "authorizedOperation",
              label:
                "I am authorized to open and operate accounts, execute agreements, and act on behalf of the Company.",
            },
          ].map((item, idx) => (
            <label key={idx} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name={item.name}
                checked={data[item.name] || false}
                onChange={handleCheckbox}
                className="mt-1 accent-blue-600 w-5 h-5"
              />
              <span className="text-gray-300 leading-snug">{item.label}</span>
            </label>
          ))}
        </div>

        {/* ================= BUTTONS ================= */}
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
