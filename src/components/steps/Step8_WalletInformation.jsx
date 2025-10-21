import { useState, useEffect } from "react";

export default function Step8_WalletInformation({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) {
  const [data, setData] = useState({
    beneficiaryWalletOwner: "",
    beneficiaryAddress: "",
    walletCity: "",
    walletState: "",
    walletCountry: "",
    walletZip: "",
    walletAddress: "",
    walletType: "",
    associatedPlatform: "",
    purposeOfUse: "",
    network: "",
    wSizeOfTransaction: "",
    wNumOfTransaction: "",
    wFiatVolume: "",
    wAvgTransaction: "",
  });

  const [errors, setErrors] = useState({});

  // 🧠 Sync with parent formData
  useEffect(() => {
    if (formData) {
      setData((prev) => ({
        ...prev,
        ...formData,
      }));
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: value };
    setData(newData);
    updateFormData(newData);
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error when typing
  };

  const handleSelectType = (type) => {
    const newData = { ...data, walletType: type };
    setData(newData);
    updateFormData(newData);
    setErrors((prev) => ({ ...prev, walletType: "" }));
  };

  const handleNext = () => {
    const requiredFields = [
      "beneficiaryWalletOwner",
      "beneficiaryAddress",
      "walletCity",
      "walletState",
      "walletCountry",
      "walletZip",
      "walletAddress",
      "walletType",
      "network",
      "wSizeOfTransaction",
      "wNumOfTransaction",
      "wFiatVolume",
      "wAvgTransaction",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!data[field] || !data[field].toString().trim()) {
        newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop moving to next step
    }

    updateFormData(data);
    nextStep();
  };

  const renderError = (field) =>
    errors[field] ? (
      <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
    ) : null;

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-6xl rounded-2xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-2">
          Wallet Information
        </h1>

        {/* Beneficiary Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <h2 className="text-white text-xl">Recipient Information</h2>

          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-0.5">
              Beneficiary Wallet Owner Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="beneficiaryWalletOwner"
              placeholder="ABC Corporation Ltd. or John Dough"
              value={data.beneficiaryWalletOwner}
              onChange={handleChange}
              className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none ${
                errors.beneficiaryWalletOwner
                  ? "ring-2 ring-red-500"
                  : "focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {renderError("beneficiaryWalletOwner")}
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-0.5">
              Beneficiary Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="beneficiaryAddress"
              placeholder="Beneficiary Address"
              value={data.beneficiaryAddress}
              onChange={handleChange}
              className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none ${
                errors.beneficiaryAddress
                  ? "ring-2 ring-red-500"
                  : "focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {renderError("beneficiaryAddress")}
          </div>

          {[
            { label: "City", name: "walletCity", placeholder: "City Name" },
            { label: "State / Province", name: "walletState", placeholder: "State or Province" },
            { label: "Country", name: "walletCountry", placeholder: "Country" },
            { label: "Zip Code / Postal Code", name: "walletZip", placeholder: "Zip / Postal Code" },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-gray-300 mb-0.5">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={data[field.name]}
                onChange={handleChange}
                className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none ${
                  errors[field.name]
                    ? "ring-2 ring-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {renderError(field.name)}
            </div>
          ))}
        </div>

        {/* Wallet Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <h2 className="text-white md:col-span-3 text-xl">Wallet Information</h2>

          <div>
            <label className="block text-gray-300 mb-0.5">
              Wallet Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="walletAddress"
              placeholder="Unique string to receive cryptocurrency"
              value={data.walletAddress}
              onChange={handleChange}
              className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none ${
                errors.walletAddress
                  ? "ring-2 ring-red-500"
                  : "focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {renderError("walletAddress")}
          </div>

          <div>
            <label className="block text-gray-300 mb-0.5">
              Network <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="network"
              placeholder="Network name"
              value={data.network}
              onChange={handleChange}
              className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none ${
                errors.network
                  ? "ring-2 ring-red-500"
                  : "focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {renderError("network")}
          </div>

          {/* Wallet Type */}
          <div>
            <label className="block text-gray-300 mb-0.5">
              Type of Wallet <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6 mt-2">
              {["Custodial", "Non-Custodial"].map((type) => (
                <div
                  key={type}
                  onClick={() => handleSelectType(type)}
                  className={`cursor-pointer px-6 py-2 rounded-lg text-center border-2 transition-all duration-200 ${
                    data.walletType === type
                      ? "border-blue-500 bg-[#22222a]"
                      : "border-transparent bg-[#2a2a33] hover:border-blue-500/60 hover:bg-[#24242c]"
                  }`}
                >
                  <p className="text-gray-100 font-medium">{type}</p>
                </div>
              ))}
            </div>
            {renderError("walletType")}
          </div>

          {/* Optional Fields */}
          <div>
            <label className="block text-gray-300 mb-0.5">Associated Platform (if any)</label>
            <input
              type="text"
              name="associatedPlatform"
              placeholder="Kucoin, Binance, Kraken..."
              value={data.associatedPlatform}
              onChange={handleChange}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-0.5">Purpose of Wallet Use</label>
            <input
              type="text"
              name="purposeOfUse"
              placeholder="Personal, Business, Settlement..."
              value={data.purposeOfUse}
              onChange={handleChange}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Expected Volumes */}
        <div className="space-y-8 mt-10">
          <div className="grid md:grid-cols-3 gap-6">
            <h2 className="text-white col-span-3 text-xl">Expected Volumes</h2>

            {[
              { label: "Size of first transaction", name: "wSizeOfTransaction" },
              { label: "Number of transactions per month", name: "wNumOfTransaction" },
              { label: "Monthly fiat volume", name: "wFiatVolume" },
              { label: "Average transaction size", name: "wAvgTransaction" },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-gray-300 mb-0.5">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={data[field.name]}
                  onChange={handleChange}
                  className={`w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none ${
                    errors[field.name]
                      ? "ring-2 ring-red-500"
                      : "focus:ring-2 focus:ring-blue-500"
                  }`}
                />
                {renderError(field.name)}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
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
