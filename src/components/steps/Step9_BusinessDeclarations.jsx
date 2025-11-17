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

    // Checkbox fields (18 in total)
    noPriorFines: false,
    cooperatedWithRequests: false,
    noAdverseMedia: false,
    noPublicComplaints: false,
    updateWithin30Days: false,
    provideKYBWithin14Days: false,
    noPrivacyCoins: false,
    acknowledgeDueDiligence: false,
    authorizeVerification: false,
    madeExaminations: false,
    chartAccurate: false,
    registerAccurate: false,
    noBearerShares: false,
    obtainedConsents: false,
    notActingThirdParty: false,
    acceptedTerms: false,
    acceptedPrivacy: false,
    authorizedOperation: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData) {
      setData((prev) => ({ ...prev, ...formData }));
    }
  }, []);

  const handleSelect = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCheckbox = (e) => {
    const newData = { ...data, [e.target.name]: e.target.checked };
    setData(newData);
    updateFormData(newData);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const requiredRadioFields = [
    "activityInHighRiskCountry",
    "operatesAsHedgeFund",
    "operatesAsFinancialInstitution",
    "hasHighRiskClients",
  ];

  const requiredCheckboxFields = [
    "noPriorFines",
    "cooperatedWithRequests",
    "noAdverseMedia",
    "noPublicComplaints",
    "updateWithin30Days",
    "provideKYBWithin14Days",
    "noPrivacyCoins",
    "acknowledgeDueDiligence",
    "authorizeVerification",
    "madeExaminations",
    "chartAccurate",
    "registerAccurate",
    "noBearerShares",
    "obtainedConsents",
    "notActingThirdParty",
    "acceptedTerms",
    "acceptedPrivacy",
    "authorizedOperation",
  ];

  const handleNext = () => {
    const newErrors = {};

    requiredRadioFields.forEach((field) => {
      if (!data[field]) newErrors[field] = "This field is required.";
    });

    requiredCheckboxFields.forEach((field) => {
      if (!data[field]) newErrors[field] = "This checkbox must be selected.";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateFormData(data);
    nextStep();
  };

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

  const checkboxItems = [
    { name: "noPriorFines", label: "The corporation has not been subject to any prior fines, warnings, suspensions, or sanctions listings." },
    { name: "cooperatedWithRequests", label: "If any have been requested, the corporation has cooperated with prior exams or requests." },
    { name: "noAdverseMedia", label: "To your best knowledge, you are not aware of adverse media related to your firm or principals." },
    { name: "noPublicComplaints", label: "To your best knowledge, the corporation does not have any public complaints." },
    { name: "updateWithin30Days", label: "The corporation will provide updates within 30 days of any change in structure, ownership, or directors." },
    { name: "provideKYBWithin14Days", label: "If requested, the corporation and its key individuals will provide KYB/KYC updates within 14 days." },
    { name: "noPrivacyCoins", label: "The corporation’s crypto wallets will not transact with any privacy coins or mixers." },
    { name: "acknowledgeDueDiligence", label: "I acknowledge that Done.com Inc and partner banks may conduct compliance and security checks under required laws." },
    { name: "authorizeVerification", label: "I authorize Done.com Inc and partner banks to verify information and share details with third parties when required by law." },
    { name: "madeExaminations", label: "I have made any examinations needed to confirm the statements in this certificate." },
    { name: "chartAccurate", label: "The organizational chart reflects true, complete, and current ownership and control details." },
    { name: "registerAccurate", label: "The shareholders' register contains a true, complete, and current record of all registered holders." },
    { name: "noBearerShares", label: "The corporation does not issue bearer shares." },
    { name: "obtainedConsents", label: "All required consents for personal information included in this form have been obtained." },
    { name: "notActingThirdParty", label: "The corporation is not acting on behalf of a third party in dealings with Done.com Inc." },
    { name: "acceptedTerms", label: "I have read and accept the Terms and Conditions." },
    { name: "acceptedPrivacy", label: "I have read and accept the Privacy Policy." },
    { name: "authorizedOperation", label: "I am authorized to open and operate accounts, execute agreements, and act on behalf of the corporation." },
  ];

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-6xl rounded-2xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-8">
          Business Declarations
        </h1>

        {/* RADIO QUESTIONS */}
        <div className="space-y-10">

          <div>
            <p className="text-gray-300 mb-3">
              Do you conduct any activity in or have business partners in the following countries:
              <span className="text-red-500">*</span>
            </p>

            <div className="p-3 text-gray-300 text-sm leading-relaxed mb-4">
              Afghanistan, Albania, Algeria, Bahamas, Bahrain, Bangladesh, Barbados, Belarus, Botswana,
              Burkina Faso, Cambodia, Crimea, DPRK, Donetsk, Ghana, Guyana, Iran, Iraq, Jamaica, Jordan,
              Lebanon, Libya, Mali, Mauritania, Mongolia, Morocco, Myanmar, Nicaragua, Niger, Pakistan,
              Palestine, Panama, Russia, Somalia, Sudan, Syria, Uganda, Yemen, Zimbabwe.
            </div>

            {yesNoButton("activityInHighRiskCountry")}
          </div>

          <div>
            <div className="flex gap-4 items-start flex-col-reverse">
              {yesNoButton("operatesAsHedgeFund")}
              <p className="text-gray-300">
                Does your company operate as a hedge fund or investment entity? <span className="text-red-500">*</span>
              </p>
            </div>
          </div>

          <div>
            <div className="flex gap-4 items-start flex-col-reverse ">
              {yesNoButton("operatesAsFinancialInstitution")}
              <p className="text-gray-300">
                Does your business operate as a financial institution, dealing with money transmission, lending, or brokerage?
                <span className="text-red-500">*</span>
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-4">
              {yesNoButton("hasHighRiskClients")}
              <p className="text-gray-300">
                Does the corporation serve any high-risk client categories? <span className="text-red-500">*</span>
              </p>
            </div>

            <div className="mt-5 ml-8">
              <p className="text-gray-300 mb-3">Examples of high-risk activities:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                <li>Assets tied to suspected criminal sources</li>
                <li>Dealings with terrorist or criminal groups</li>
                <li>Anonymous or shell accounts</li>
                <li>Assets from minors</li>
                <li>Assets from seniors with low income</li>
                <li>Binary options</li>
                <li>Banknote trades</li>
                <li>Virtual mixers</li>
                <li>PEPs</li>
                <li>Drug-related activity</li>
                <li>Shell banks</li>
                <li>Correspondent banks</li>
                <li>Arms or defense activity</li>
                <li>Pirated media</li>
                <li>Adult content industry</li>
                <li>Counterfeit products</li>
                <li>Pyramid schemes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CHECKBOX SECTION */}
        <div className="mt-10 space-y-5 text-gray-300">
          {checkboxItems.map((item, idx) => (
            <label key={idx} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name={item.name}
                checked={data[item.name] || false}
                onChange={handleCheckbox}
                className="mt-1 accent-blue-600 w-5 h-5"
              />
              <span className="text-gray-300 leading-snug">{item.label}</span>
              {errors[item.name] && (
                <p className="text-red-500 text-xs mt-1 ml-2">{errors[item.name]}</p>
              )}
            </label>
          ))}
        </div>

        {/* BUTTONS */}
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
