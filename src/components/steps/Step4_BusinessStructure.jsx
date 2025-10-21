import { useState, useEffect, useRef } from "react";

export default function Step4_BusinessStructure({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) {
  const [entityType, setEntityType] = useState("");
  const [entityOther, setEntityOther] = useState("");
  const [industries, setIndustries] = useState([]);
  const [industryOther, setIndustryOther] = useState("");
  const [sourcesOfFunds, setSourcesOfFunds] = useState([]);
  const [sourceOther, setSourceOther] = useState("");
  const [errors, setErrors] = useState({});

  const mounted = useRef(false);

  const entityOptions = [
    "Corporation",
    "C-Corporation (Private)",
    "C-Corporation (Public)",
    "Limited Liability Corporation (LLC)",
    "Limited Liability Partnership (LLP)",
    "Limited Partnership (LP)",
    "S Corporation",
    "Sole Proprietorship",
    "Trust",
    "Non-Profit/Charity",
    "Other",
  ];

  const industryOptions = [
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

  const sourcesOfFundsOptions = [
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

  // Load existing data
  useEffect(() => {
    if (!formData) return;
    setEntityType(formData.entityType || "");
    setEntityOther(formData.entityOther || "");
    setIndustries(formData.industries || []);
    setIndustryOther(formData.industryOther || "");
    setSourcesOfFunds(formData.sourcesOfFunds || []);
    setSourceOther(formData.sourceOther || "");
  }, []);

  // Sync data
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    updateFormData({
      entityType,
      entityOther,
      industries,
      industryOther,
      sourcesOfFunds,
      sourceOther,
    });
  }, [
    entityType,
    entityOther,
    industries,
    industryOther,
    sourcesOfFunds,
    sourceOther,
  ]);

  // Validate step before next
  const handleNext = () => {
    const newErrors = {};

    if (!entityType) newErrors.entityType = "Please select the company entity type.";
    if (entityType === "Other" && !entityOther.trim())
      newErrors.entityOther = "Please specify your entity type.";
    if (industries.length === 0)
      newErrors.industries = "Please select at least one industry.";
    if (industries.includes("Other") && !industryOther.trim())
      newErrors.industryOther = "Please specify your industry.";
    if (sourcesOfFunds.length === 0)
      newErrors.sourcesOfFunds = "Please select at least one source of funds.";
    if (sourcesOfFunds.includes("Other") && !sourceOther.trim())
      newErrors.sourceOther = "Please specify your source of funds.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) nextStep();
  };

  const toggleIndustry = (industry) => {
    setIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const toggleSource = (source) => {
    setSourcesOfFunds((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-6xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-2">
          Business Structure
        </h1>

        {/* ENTITY TYPE */}
        <div className="mt-10">
          <label className="block text-gray-300 mb-1">
            What type of entity is the company? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {entityOptions.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setEntityType(type)}
                className={`px-6 py-3 rounded-lg text-white text-left border-2 transition-all duration-200 ${
                  entityType === type
                    ? "border-blue-500 bg-[#22222a]"
                    : "bg-[#2a2a33] border-transparent hover:border-blue-500/60 hover:bg-[#24242c]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {errors.entityType && (
            <p className="text-red-400 text-sm mt-2">{errors.entityType}</p>
          )}

          {entityType === "Other" && (
            <div className="mt-6">
              <label className="block text-gray-300 mb-1">
                Please specify your entity type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="LLP etc..."
                value={entityOther}
                onChange={(e) => setEntityOther(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.entityOther && (
                <p className="text-red-400 text-sm mt-2">{errors.entityOther}</p>
              )}
            </div>
          )}
        </div>

        {/* INDUSTRY */}
        <div className="mt-10">
          <label className="block text-gray-300 mb-1">
            What industry does the corporation operate in?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {industryOptions.map((ind) => (
              <button
                key={ind}
                onClick={() => toggleIndustry(ind)}
                className={`w-full px-6 py-3 rounded-lg text-white text-sm text-left border-2 transition-all duration-200 ${
                  industries.includes(ind)
                    ? "border-blue-500 bg-[#22222a]"
                    : "bg-[#2a2a33] border-transparent hover:border-blue-500/60 hover:bg-[#24242c]"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
          {errors.industries && (
            <p className="text-red-400 text-sm mt-2">{errors.industries}</p>
          )}

          {industries.includes("Other") && (
            <div className="mt-6">
              <label className="block text-gray-300 mb-1">
                Please specify your industry <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Consulting etc.."
                value={industryOther}
                onChange={(e) => setIndustryOther(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.industryOther && (
                <p className="text-red-400 text-sm mt-2">{errors.industryOther}</p>
              )}
            </div>
          )}
        </div>

        {/* SOURCE OF FUNDS */}
        <div className="mt-10">
          <label className="block text-gray-300 mb-1">
            Business Source of Funds (Select all that apply){" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sourcesOfFundsOptions.map((src) => (
              <button
                key={src}
                onClick={() => toggleSource(src)}
                className={`w-full px-6 py-3 rounded-lg text-white text-sm text-left border-2 transition-all duration-200 ${
                  sourcesOfFunds.includes(src)
                    ? "border-blue-500 bg-[#22222a]"
                    : "bg-[#2a2a33] border-transparent hover:border-blue-500/60 hover:bg-[#24242c]"
                }`}
              >
                {src}
              </button>
            ))}
          </div>
          {errors.sourcesOfFunds && (
            <p className="text-red-400 text-sm mt-2">{errors.sourcesOfFunds}</p>
          )}

          {sourcesOfFunds.includes("Other") && (
            <div className="mt-6">
              <label className="block text-gray-300 mb-1">
                Please specify your source of funds{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Specify source..."
                value={sourceOther}
                onChange={(e) => setSourceOther(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.sourceOther && (
                <p className="text-red-400 text-sm mt-2">{errors.sourceOther}</p>
              )}
            </div>
          )}
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
