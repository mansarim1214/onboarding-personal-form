import { useState, useEffect } from "react";

/**
 * Step7_BeneficiaryBankInformation.jsx
 *
 * Full component (keeps all sections) with:
 * - Loading existing values from formData on mount
 * - Keeping parent formData updated (debounced)
 * - Validation of all required fields on Next (no alerts)
 * - Inline error messages and a top error summary
 *
 * Paste this file into your project replacing the old Step7 file.
 */

export default function Step7_BeneficiaryBankInformation({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) {
  // Recipient fields
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [beneficiaryCity, setBeneficiaryCity] = useState("");
  const [beneficiaryState, setBeneficiaryState] = useState("");
  const [beneficiaryCountry, setBeneficiaryCountry] = useState("");
  const [beneficiaryZip, setBeneficiaryZip] = useState("");

  // Bank fields
  const [bankName, setBankName] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [bankCity, setBankCity] = useState("");
  const [bankState, setBankState] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [bankZip, setBankZip] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  // Transaction/volume fields
  const [sizeOfTransaction, setSizeOfTransaction] = useState("");
  const [numOfTransaction, setNumOfTransaction] = useState("");
  const [fiatVolume, setFiatVolume] = useState("");
  const [avgTransaction, setAvgTransaction] = useState("");

  // Repeatable accounts
  const [accounts, setAccounts] = useState([
    {
      accountCurrencyType: "",
      accountNumber: "",
      iban: "",
      routingNumber: "",
      achRoutingNumber: "",
      transitNumber: "",
      institutionNumber: "",
    },
  ]);

  const currencies = ["USD", "EUR", "CAD", "GBP", "AED"];

  // UI selection for add-account question
  const [selectedOption, setSelectedOption] = useState(null);

  // Error state: keyed by field path
  const [errors, setErrors] = useState({});

  // Populate values when navigating back (only once)
  useEffect(() => {
    if (!formData) return;

    const data = formData.beneficiaryBankInfo || {};
    setBeneficiaryName(data.beneficiaryName ?? "");
    setBeneficiaryAddress(data.beneficiaryAddress ?? "");
    setBeneficiaryCity(data.beneficiaryCity ?? "");
    setBeneficiaryState(data.beneficiaryState ?? "");
    setBeneficiaryCountry(data.beneficiaryCountry ?? "");
    setBeneficiaryZip(data.beneficiaryZip ?? "");
    setBankName(data.bankName ?? "");
    setBankAddress(data.bankAddress ?? "");
    setBankCity(data.bankCity ?? "");
    setBankState(data.bankState ?? "");
    setBankCountry(data.bankCountry ?? "");
    setBankZip(data.bankZip ?? "");
    setSwiftCode(data.swiftCode ?? "");
    setAccounts(
      Array.isArray(data.accounts) && data.accounts.length > 0
        ? data.accounts
        : [
            {
              accountCurrencyType: "",
              accountNumber: "",
              iban: "",
              routingNumber: "",
              achRoutingNumber: "",
              transitNumber: "",
              institutionNumber: "",
            },
          ]
    );
    setSizeOfTransaction(data.sizeOfTransaction ?? "");
    setNumOfTransaction(data.numOfTransaction ?? "");
    setFiatVolume(data.fiatVolume ?? "");
    setAvgTransaction(data.avgTransaction ?? "");
    setSelectedOption(data.addAnotherAccount === "yes" ? "yes" : data.addAnotherAccount === "no" ? "no" : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only once on mount

  // Keep parent formData updated (debounced-ish)
  useEffect(() => {
    const t = setTimeout(() => {
      updateFormData({
        beneficiaryBankInfo: {
          beneficiaryName,
          beneficiaryAddress,
          beneficiaryCity,
          beneficiaryState,
          beneficiaryCountry,
          beneficiaryZip,
          bankName,
          bankAddress,
          bankCity,
          bankState,
          bankCountry,
          bankZip,
          swiftCode,
          accounts,
          sizeOfTransaction,
          numOfTransaction,
          fiatVolume,
          avgTransaction,
          addAnotherAccount: selectedOption,
        },
      });
    }, 250);
    return () => clearTimeout(t);
  }, [
    beneficiaryName,
    beneficiaryAddress,
    beneficiaryCity,
    beneficiaryState,
    beneficiaryCountry,
    beneficiaryZip,
    bankName,
    bankAddress,
    bankCity,
    bankState,
    bankCountry,
    bankZip,
    swiftCode,
    accounts,
    sizeOfTransaction,
    numOfTransaction,
    fiatVolume,
    avgTransaction,
    selectedOption,
    updateFormData,
  ]);

  // Helper to update an account entry
  const handleAccountChange = (index, field, value) => {
    setAccounts((prev) => {
      const next = prev.map((a, i) => (i === index ? { ...a, [field]: value } : a));
      return next;
    });
  };

  // Add a new blank account
  const handleAddAccount = () => {
    setAccounts((prev) => [
      ...prev,
      {
        accountCurrencyType: "",
        accountNumber: "",
        iban: "",
        routingNumber: "",
        achRoutingNumber: "",
        transitNumber: "",
        institutionNumber: "",
      },
    ]);
    setSelectedOption("yes");
    // clear account-related errors if any
    setErrors((e) => {
      const copy = { ...e };
      // remove account.* errors
      Object.keys(copy).forEach((k) => {
        if (k.startsWith("accounts")) delete copy[k];
      });
      return copy;
    });
  };

  const handleNoClick = () => {
    setSelectedOption("no");
  };

  // Validation function returns an errors object (empty if valid)
  const validateAll = () => {
    const e = {};

    // Recipient required fields
    if (!beneficiaryName.trim()) e.beneficiaryName = "Beneficiary name is required.";
    if (!beneficiaryAddress.trim()) e.beneficiaryAddress = "Beneficiary address is required.";
    if (!beneficiaryCity.trim()) e.beneficiaryCity = "City is required.";
    if (!beneficiaryState.trim()) e.beneficiaryState = "State / province is required.";
    if (!beneficiaryCountry.trim()) e.beneficiaryCountry = "Country is required.";
    if (!beneficiaryZip.trim()) e.beneficiaryZip = "Postal / ZIP code is required.";

    // Bank required fields
    if (!bankName.trim()) e.bankName = "Bank name is required.";
    if (!bankAddress.trim()) e.bankAddress = "Bank address is required.";
    if (!bankCity.trim()) e.bankCity = "Bank city is required.";
    // bankState is optional in original UI; keep as required? original had it optional — treat optional
    // if you want to require, uncomment:
    // if (!bankState.trim()) e.bankState = "Bank state is required.";
    if (!bankCountry.trim()) e.bankCountry = "Bank country is required.";
    if (!bankZip.trim()) e.bankZip = "Bank postal code is required.";
    if (!swiftCode.trim()) e.swiftCode = "SWIFT/BIC code is required.";

    // For accounts: at least one account must have required fields filled
    if (!Array.isArray(accounts) || accounts.length === 0) {
      e.accounts = "At least one account is required.";
    } else {
      accounts.forEach((acc, idx) => {
        const base = `accounts.${idx}`;
        // accountCurrencyType and accountNumber are marked required in original component
        if (!acc.accountCurrencyType || !acc.accountCurrencyType.trim()) {
          e[`${base}.accountCurrencyType`] = "Currency is required for the account.";
        }
        if (!acc.accountNumber || !acc.accountNumber.trim()) {
          e[`${base}.accountNumber`] = "Account number is required.";
        }
        // other fields (iban/routing) were optional originally — don't require them
      });
    }

    // Expected volumes
    if (!sizeOfTransaction.toString().trim()) e.sizeOfTransaction = "Size of first transaction is required.";
    if (!numOfTransaction.toString().trim()) e.numOfTransaction = "Number of transactions per month is required.";
    if (!fiatVolume.toString().trim()) e.fiatVolume = "Monthly fiat volume is required.";
    if (!avgTransaction.toString().trim()) e.avgTransaction = "Average transaction size is required.";

    return e;
  };

  // Handler for Next click -> validate and either show errors or go next
  const handleNext = () => {
    const e = validateAll();
    setErrors(e);

    if (Object.keys(e).length === 0) {
      // No errors -> proceed
      nextStep();
    } else {
      // Scroll to top of form so user sees error summary (small UX improvement)
      const el = document.getElementById("beneficiary-form-top");
      if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Simple helper to show an inline error if present
  const renderError = (field) => {
    if (!errors[field]) return null;
    return <p className="text-red-500 text-sm mt-1">{errors[field]}</p>;
  };

  // Top-level error summary
  const renderErrorSummary = () => {
    const keys = Object.keys(errors);
    if (keys.length === 0) return null;

    // Show up to 5 errors in summary for readability
    const messages = keys.slice(0, 6).map((k) => errors[k]);
    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded">
        <strong className="block mb-1">Please fix the following errors before continuing:</strong>
        <ul className="list-disc pl-5">
          {messages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
        {keys.length > 6 && <div className="text-sm mt-2">...and {keys.length - 6} more</div>}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center">
      <div id="beneficiary-form-top" className="w-full max-w-5xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-6">
          Beneficiary Bank Information
        </h1>

        {/* Error summary */}
        {renderErrorSummary()}

        {/* Recipient Information */}
        <div className="space-y-4">
          <h2 className="text-white text-xl">Recipient Information</h2>

          <div>
            <label className="block text-gray-300 mb-0.5">Beneficiary Name <span className="text-red-500">*</span></label>
            
            <input
              type="text"
              placeholder="ABC Corporation Ltd. Or John Doe"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {renderError("beneficiaryName")}
          </div>

          <div>
            <label className="block text-gray-300 mb-0.5">Beneficiary Address <span className="text-red-500">*</span></label>
            
            <input
              type="text"
              placeholder="Beneficiary Address"
              value={beneficiaryAddress}
              onChange={(e) => setBeneficiaryAddress(e.target.value)}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {renderError("beneficiaryAddress")}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-300 mb-0.5">City <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="City Name"
                value={beneficiaryCity}
                onChange={(e) => setBeneficiaryCity(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
              />
              {renderError("beneficiaryCity")}
            </div>
            <div>
              <label className="block text-gray-300 mb-0.5">State / Province <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="State or Province"
                value={beneficiaryState}
                onChange={(e) => setBeneficiaryState(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
              />
              {renderError("beneficiaryState")}
            </div>
            <div>
              <label className="block text-gray-300 mb-0.5">Country <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Country"
                value={beneficiaryCountry}
                onChange={(e) => setBeneficiaryCountry(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
              />
              {renderError("beneficiaryCountry")}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-0.5">Zip Code / Postal Code <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Zip Code"
              value={beneficiaryZip}
              onChange={(e) => setBeneficiaryZip(e.target.value)}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
            />
            {renderError("beneficiaryZip")}
          </div>
        </div>

        {/* Bank Information */}
        <div className="mt-8 space-y-4">
          <h2 className="text-white text-xl">Bank Information</h2>

          <div>
            <label className="block text-gray-300 mb-0.5">Bank Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="ABC Bank"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
            />
            {renderError("bankName")}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-0.5">Bank Address <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Bank Address"
                value={bankAddress}
                onChange={(e) => setBankAddress(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
              />
              {renderError("bankAddress")}
            </div>
            <div>
              <label className="block text-gray-300 mb-0.5">City <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="City Name"
                value={bankCity}
                onChange={(e) => setBankCity(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
              />
              {renderError("bankCity")}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-300 mb-0.5">State / Province</label>
              <input
                type="text"
                placeholder="State or Province"
                value={bankState}
                onChange={(e) => setBankState(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
              />
              {/* state optional */}
            </div>
            <div>
              <label className="block text-gray-300 mb-0.5">Country <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Country"
                value={bankCountry}
                onChange={(e) => setBankCountry(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
              />
              {renderError("bankCountry")}
            </div>
            <div>
              <label className="block text-gray-300 mb-0.5">Zip / Postal <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Postal Code"
                value={bankZip}
                onChange={(e) => setBankZip(e.target.value)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
              />
              {renderError("bankZip")}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-0.5">SWIFT/BIC <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="SWIFT/BIC Code"
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
            />
            {renderError("swiftCode")}
          </div>
        </div>

        {/* Account Info (Repeatable) */}
        <div className="space-y-6 mt-8">
          {accounts.map((acc, index) => (
            <div key={index} className="space-y-6 border-t border-gray-700 pt-6">
              <h3 className="text-white text-lg">
                Account Information {accounts.length > 1 ? `#${index + 1}` : ""}
              </h3>

              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-gray-300 mb-0.5">Account Currency Type <span className="text-red-500">*</span></label>
                  <select
                    value={acc.accountCurrencyType}
                    onChange={(e) => handleAccountChange(index, "accountCurrencyType", e.target.value)}
                    className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                  >
                    <option value="">Select Currency</option>
                    {currencies.map((cur) => (
                      <option key={cur} value={cur}>{cur}</option>
                    ))}
                  </select>
                  {renderError(`accounts.${index}.accountCurrencyType`)}
                </div>

                <div>
                  <label className="block text-gray-300 mb-0.5">Account Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Account Number"
                    value={acc.accountNumber}
                    onChange={(e) => handleAccountChange(index, "accountNumber", e.target.value)}
                    className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                  />
                  {renderError(`accounts.${index}.accountNumber`)}
                </div>

                <div>
                  <label className="block text-gray-300 mb-0.5">IBAN</label>
                  <input
                    type="text"
                    placeholder="IBAN"
                    value={acc.iban}
                    onChange={(e) => handleAccountChange(index, "iban", e.target.value)}
                    className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-0.5">Fedwire Routing Number</label>
                  <input
                    type="text"
                    placeholder="Fedwire Routing Number"
                    value={acc.routingNumber}
                    onChange={(e) => handleAccountChange(index, "routingNumber", e.target.value)}
                    className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-0.5">ACH Routing Number</label>
                  <input
                    type="text"
                    placeholder="ACH Routing Number"
                    value={acc.achRoutingNumber}
                    onChange={(e) => handleAccountChange(index, "achRoutingNumber", e.target.value)}
                    className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-0.5">Transit Number</label>
                  <input
                    type="text"
                    placeholder="Transit Number"
                    value={acc.transitNumber}
                    onChange={(e) => handleAccountChange(index, "transitNumber", e.target.value)}
                    className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-0.5">Institution Number</label>
                  <input
                    type="text"
                    placeholder="Institution Number"
                    value={acc.institutionNumber}
                    onChange={(e) => handleAccountChange(index, "institutionNumber", e.target.value)}
                    className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Another Account Buttons */}
          <div>
            <label className="block text-gray-300 mb-0.5">Would you like to add another account?</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              <button
                type="button"
                onClick={handleAddAccount}
                className={`px-6 py-3 rounded-lg text-white text-left border-2 transition-all duration-200 ${
                  selectedOption === "yes"
                    ? "bg-blue-600 border-blue-500"
                    : "bg-[#2a2a33] border-transparent hover:border-blue-500/60 hover:bg-[#24242c]"
                }`}
              >
                Yes
              </button>

              <button
                type="button"
                onClick={handleNoClick}
                className={`px-6 py-3 rounded-lg text-white text-left border-2 transition-all duration-200 ${
                  selectedOption === "no"
                    ? "bg-blue-600 border-blue-500"
                    : "bg-[#2a2a33] border-transparent hover:border-blue-500/60 hover:bg-[#24242c]"
                }`}
              >
                No
              </button>
            </div>
            {errors.accounts && <p className="text-red-500 text-sm mt-2">{errors.accounts}</p>}
          </div>

          {/* Expected Volumes */}
          <div className="space-y-4 mt-6">
            <h2 className="text-white text-xl">Expected Volumes</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 mb-0.5">Size of first transaction <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Expected size of first transaction"
                  value={sizeOfTransaction}
                  onChange={(e) => setSizeOfTransaction(e.target.value)}
                  className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                />
                {renderError("sizeOfTransaction")}
              </div>

              <div>
                <label className="block text-gray-300 mb-0.5">Number of transactions per month <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Expected number of transactions per month"
                  value={numOfTransaction}
                  onChange={(e) => setNumOfTransaction(e.target.value)}
                  className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                />
                {renderError("numOfTransaction")}
              </div>

              <div>
                <label className="block text-gray-300 mb-0.5">Monthly fiat volume <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Expected monthly fiat volume"
                  value={fiatVolume}
                  onChange={(e) => setFiatVolume(e.target.value)}
                  className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                />
                {renderError("fiatVolume")}
              </div>

              <div className="md:col-span-3">
                <label className="block text-gray-300 mb-0.5">Average transaction size <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Expected average transaction size"
                  value={avgTransaction}
                  onChange={(e) => setAvgTransaction(e.target.value)}
                  className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2"
                />
                {renderError("avgTransaction")}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {/* <button
            onClick={prevStep}
            className="bg-[#2a2a33] hover:bg-[#32323c] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-200"
          >
            Back
          </button> */}

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
