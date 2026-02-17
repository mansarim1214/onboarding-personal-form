import { useState, useEffect, useRef } from "react";
import SOF_Modal from "./SOF_Modal";

export default function Employment({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) {
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [industryOtherText, setIndustryOtherText] = useState("");
  const [selectedSources, setSelectedSources] = useState([]);
  const [sourceOtherText, setSourceOtherText] = useState("");

  // State to control visibility of the modal
  const [showModal, setShowModal] = useState(true);

  // State for Source of Funds (SOF) and Source of Wealth (SOW)
  const [sourceOfFunds, setSourceOfFunds] = useState("");
  const [sourceOfWealth, setSourceOfWealth] = useState("");

  // Error states
  const [errors, setErrors] = useState({
    industries: "",
    industryOther: "",
    sources: "",
    sourceOther: "",
    sourceOfFunds: "",
    sourceOfWealth: "",
  });

  const mounted = useRef(false);

 const companyIndustry = [
    "Accountant",
    "Agent a federal or local government",
    "Agriculture, Forestry & Fishing",
    "Antiques and art trade",
    "Arms and ammunition",
    "Artificial Intelligence & Data Analytics",
    "Atomic power",
    "Casinos",
    "Cheque Cashing",
    "Construction",
    "Crypto services",
    "Dealers in precious metals and precious stones",
    "Debt collection services",
    "E-commerce & Digital Platforms",
    "Education & Training",
    "Embassies & Consulates",
    "Environmental & Sustainability Services",
    "Factors (Receivables Factoring)",
    "Fiat/Crypto Trader",
    "Financial Entity/Services",
    "Fintech",
    "Gaming, VR/AR & Metaverse",
    "Healthcare & Social Assistance",
    "Hospitality & Leisure",
    "Industry engaged in virtual currency transactions",
    "Information & Communication Technology (ICT)",
    "Life insurance entity, broker, and/or agents",
    "Manufacturing",
    "Media & Entertainment",
    "Mining & Quarrying",
    "Money services businesses (MSB)",
    "Multi-level marketing (MLM)",
    "Non-profits & NGOs",
    "Notary",
    "Pharmacies and pharmaceutical activity",
    "Professional Services",
    "Provider of private or automated banking/crypto machines",
    "Real Estate & Housing",
    "Red light or Adult Entertainment business",
    "Renewable Energy (solar, wind, hydro, geothermal)",
    "Research & Development",
    "Securities dealers",
    "Title Insurers",
    "Tobacco Industry",
    "Transportation & Logistics",
    "Unlicensed banks & financial institutions",
    "Wholesale & Retail Trade",
    "Other",
  ];

  const yourIndustry = [
    "Employment Compensation",
    "Personal Savings",
    "Lottery/Gaming/Casino Winnings",
    "Marital Assets",
    "Sale of Business/Real Estate",
    "Donation/Gift/Inheritance/Trust",
    "Investments",
    "Corporation Income/Profit",
    "Investments/Capital Gains",
    "Corporation's Working Capital",
    "Loan",
    "Private Capital",
    "Grant",
    "Other",
  ];

  // SOF and SOW options
  const sourceOfFundsOptions = [
    "Employment income",
"Gift/Donation",
"Grant",
"Inheritance/Trust",
"Investment returns",
"Loan or credit",
"Lottery/Gaming/Casino Winnings",
"Marital Assets",
"Other source",
"Investor Capital",
"Debt Capital",
"Sale of assets",
"Savings"

  ];

  const sourceOfWealthOptions = [
    "Business Ownership",
"Inheritance/Legacy",
"Investments",
"Asset Sales",
"Retirement Funds",
"Lottery/Gaming/Casino Winnings",
"Other source"

  ];

  const toggleIndustry = (industry) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
    setErrors((prev) => ({ ...prev, industries: "", industryOther: "" }));
  };

    const toggleSource = (source) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
    setErrors((prev) => ({ ...prev, sources: "", sourceOther: "" }));
  };

  useEffect(() => {
    setSelectedIndustries(formData.selectedIndustries || []);
    setIndustryOtherText(formData.industryOtherText || "");
    setSelectedSources(formData.selectedSources || []);
    setSourceOtherText(formData.sourceOtherText || "");
    setSourceOfFunds(formData.sourceOfFunds || "");
    setSourceOfWealth(formData.sourceOfWealth || "");
  }, []);

  useEffect(() => {
    if (mounted.current) {
      updateFormData({
        selectedIndustries,
        industryOtherText,
        selectedSources,
        sourceOtherText,
        sourceOfFunds,
        sourceOfWealth,
      });
    } else {
      mounted.current = true;
    }
  }, [
    selectedIndustries,
    industryOtherText,
    selectedSources,
    sourceOtherText,
    sourceOfFunds,
    sourceOfWealth,
  ]);

  const handleNext = () => {
    let newErrors = {
      industries: "",
      industryOther: "",
      sources: "",
      sourceOther: "",
      sourceOfFunds: "",
      sourceOfWealth: "",
    };
    let hasError = false;

    // Validate industries
    if (selectedIndustries.length === 0) {
      newErrors.industries = "Please select at least one industry.";
      hasError = true;
    }
    if (selectedIndustries.includes("Other") && !industryOtherText.trim()) {
      newErrors.industryOther = "Please specify your industry.";
      hasError = true;
    }

    // Validate sources
    if (selectedSources.length === 0) {
      newErrors.sources = "Please select at least one source of funds.";
      hasError = true;
    }
    if (selectedSources.includes("Other") && !sourceOtherText.trim()) {
      newErrors.sourceOther = "Please specify your source of funds.";
      hasError = true;
    }

    // Validate SOF and SOW dropdowns
    if (!sourceOfFunds) {
      newErrors.sourceOfFunds = "Please select a source of funds.";
      hasError = true;
    }

    if (!sourceOfWealth) {
      newErrors.sourceOfWealth = "Please select a source of wealth.";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) nextStep();
  };

  return (
    <div className="min-h-screen flex items-center">
      {/* Show the Modal when the user reaches the Employment step */}
      <SOF_Modal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />

      <div className="w-full max-w-6xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-2">
          Employment
        </h1>

        {/* INDUSTRY TYPE */}
        <div className="mt-10">
          <label className="block text-gray-300 mb-0.5">
            Please select the type of industry the company operates in. (Check
            all that apply.) <span className="text-red-500">*</span>
          </label>
          {errors.industries && (
            <p className="text-red-500 text-sm mb-2">{errors.industries}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {companyIndustry.map((ind) => (
              <button
                key={ind}
                onClick={() => toggleIndustry(ind)}
                className={`w-full px-5 py-3 rounded-lg text-white text-sm text-left border-2 transition-all duration-200 ${
                  selectedIndustries.includes(ind)
                    ? "border-blue-500 bg-[#22222a]"
                    : "bg-[#2a2a33] border-transparent hover:border-blue-500/60 hover:bg-[#24242c]"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {selectedIndustries.includes("Other") && (
            <div className="mt-6">
              <label className="block text-gray-300 mb-0.5">
                If 'Other' is selected, please specify below{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Consulting etc.."
                value={industryOtherText}
                onChange={(e) => setIndustryOtherText(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.industryOther && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.industryOther}
                </p>
              )}
            </div>
          )}
        </div>

         {/* SOURCE OF FUNDS */}
        <div className="mt-10">
          <label className="block text-gray-300 mb-0.5">
            Please select the type of industry that you work in. (Check all that
            apply.) <span className="text-red-500">*</span>
          </label>
          {errors.sources && (
            <p className="text-red-500 text-sm mb-2">{errors.sources}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {yourIndustry.map((src) => (
              <button
                key={src}
                onClick={() => toggleSource(src)}
                className={`w-full px-5 py-3 rounded-lg text-white text-sm text-left border-2 transition-all duration-200 ${
                  selectedSources.includes(src)
                    ? "border-blue-500 bg-[#22222a]"
                    : "bg-[#2a2a33] border-transparent hover:border-blue-500/60 hover:bg-[#24242c]"
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          {selectedSources.includes("Other") && (
            <div className="mt-6">
              <label className="block text-gray-300 mb-0.5">
                If 'Other' is selected, please specify below{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Specify source..."
                value={sourceOtherText}
                onChange={(e) => setSourceOtherText(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.sourceOther && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sourceOther}
                </p>
              )}
            </div>
          )}
        </div>

        {/* SOURCE OF FUNDS (SOF) Dropdown */}
       <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
  {/* Source of Funds (SOF) Dropdown */}
  <div>
    <label className="block text-gray-300 mb-0.5">
      Source of Funds (SOF) <span className="text-red-500">*</span>
    </label>
    {errors.sourceOfFunds && (
      <p className="text-red-500 text-sm mb-2">{errors.sourceOfFunds}</p>
    )}
    <select
      value={sourceOfFunds}
      onChange={(e) => setSourceOfFunds(e.target.value)}
      className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Source of Funds"
    >
      <option value="">Please choose a source of funds</option>
      {sourceOfFundsOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>

  {/* Source of Wealth (SOW) Dropdown */}
  <div>
    <label className="block text-gray-300 mb-0.5">
      Source of Wealth (SOW) <span className="text-red-500">*</span>
    </label>
    {errors.sourceOfWealth && (
      <p className="text-red-500 text-sm mb-2">{errors.sourceOfWealth}</p>
    )}
    <select
      value={sourceOfWealth}
      onChange={(e) => setSourceOfWealth(e.target.value)}
      className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Source of Wealth"
    >
      <option value="">Please choose a source of wealth</option>
      {sourceOfWealthOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
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
