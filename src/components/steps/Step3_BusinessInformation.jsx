import { useState, useEffect } from "react";

export default function Step3_BusinessInformation({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) {
  const [data, setData] = useState({
    legalEntityName: "",
    dbaName: "",
    ein: "",
    whatJurisdiction: "",
    natureOfBusiness: "",
    industryType: "",
    requiredRegistrations: "",
    registrationNumbers: "",
    renewalDates: "",
    operatingCountries: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessCountry: "",
    businessZip: "",
    businessEmail: "",
    businessPhone: "",
    website: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (formData) {
      setData((prev) => ({ ...prev, ...formData }));
    }
  }, [formData]);

  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
    updateFormData(newData);
    setError(""); // clear error when user starts typing
  };

  const handleNext = () => {
    const requiredFields = [
      "legalEntityName",
      "ein",
      "natureOfBusiness",
      "whatJurisdiction",
      "industryType",
      "operatingCountries",
      "businessAddress",
      "businessCity",
      "businessState",
      "businessCountry",
      "businessZip",
      "businessEmail",
      "businessPhone",
      
    ];

    const emptyFields = requiredFields.filter(
      (f) => !data[f] || !data[f].trim()
    );

    if (emptyFields.length > 0) {
      setError("Please fill all required fields before continuing.");
      return;
    }

    updateFormData(data);
    nextStep();
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-5xl p-10 shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-2">
          Business Information
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side */}
          <div>
            <label className="block text-gray-300 mb-0.5">
              Legal Entity Name <span className="text-red-500">*</span>
            </label>
            <p className="text-red-500 text-xs mb-1">Required</p>
            <input
              type="text"
              name="legalEntityName"
              placeholder="ABC Corporation Ltd."
              value={data.legalEntityName}
              onChange={handleChange}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-5">DBA / Trade Name</label>
            <input
              type="text"
              name="dbaName"
              placeholder="ABC Corporation"
              value={data.dbaName}
              onChange={handleChange}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-0.5">
              Employer ID (EIN) / Tax Identification (TIN)
              <span className="text-red-500">*</span>
            </label>
            <p className="text-red-500 text-xs mb-1">Required</p>
            <input
              type="text"
              name="ein"
              placeholder="Employer ID (EIN) or Tax Identification (TIN) or HST"
              value={data.ein}
              onChange={handleChange}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-0.5">
              What jurisdiction(s) is the corporation a tax resident?
              <span className="text-red-500">*</span>
            </label>
            <p className="text-red-500 text-xs mb-1">Required</p>
            <input
              type="text"
              name="whatJurisdiction"
              placeholder="What jurisdiction(s) is the corporation a tax resident?"
              value={data.whatJurisdiction}
              onChange={handleChange}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nature of Business */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-0.5">
              Nature of Business <span className="text-red-500">*</span>
            </label>
            <p className="text-red-500 text-xs mb-1">Required</p>
            <textarea
              name="natureOfBusiness"
              placeholder="Describe what your business does and what product or service it provides.."
              value={data.natureOfBusiness}
              onChange={handleChange}
              rows="4"
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Industry Type */}
          <div className="md:col-span-2 w-full">
            <label className="block text-gray-300 mb-0.5">
              Is your industry: <span className="text-red-500">*</span>
            </label>
            <select
              name="industryType"
              value={data.industryType || ""}
              onChange={(e) => {
                const newData = { ...data, industryType: e.target.value };
                setData(newData);
                updateFormData(newData);
                setError("");
              }}
              className="w-full bg-[#2a2a33] border-2 border-transparent hover:border-blue-500/60 focus:border-blue-500 focus:ring-0 text-white px-4 py-3 rounded-lg transition duration-200"
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Regulated">Regulated</option>
              <option value="Unregulated">Unregulated</option>
            </select>

            {/* Conditionally show extra fields if Regulated */}
            {data.industryType === "Regulated" && (
              <div className="mt-6 space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="block text-gray-300 mb-0.5">
                    Required Registrations/Licences{" "}
                   
                  </label>
                  <input
                    type="text"
                    name="requiredRegistrations"
                    value={data.requiredRegistrations || ""}
                    onChange={handleChange}
                    placeholder="Enter required registrations or licences"
                    className="w-full bg-[#2a2a33] border-2 border-transparent hover:border-blue-500/60 focus:border-blue-500 focus:ring-0 text-white px-4 py-3 rounded-lg transition duration-200"
                    
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="block text-gray-300 mb-0.5">
                    Registration/Licence Numbers{" "}
                    
                  </label>
                  <input
                    type="text"
                    name="registrationNumbers"
                    value={data.registrationNumbers || ""}
                    onChange={handleChange}
                    placeholder="Enter registration or licence numbers"
                    className="w-full bg-[#2a2a33] border-2 border-transparent hover:border-blue-500/60 focus:border-blue-500 focus:ring-0 text-white px-4 py-3 rounded-lg transition duration-200"
                    
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="block text-gray-300 mb-0.5">
                    Renewal Dates <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="renewalDates"
                    value={data.renewalDates || ""}
                    onChange={handleChange}
                    className="w-full bg-[#2a2a33] border-2 border-transparent hover:border-blue-500/60 focus:border-blue-500 focus:ring-0 text-white px-4 py-3 rounded-lg transition duration-200"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Operating Countries */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-0.5">
              List all countries where the corporation operates, has customers,
              suppliers, and/or banks: <span className="text-red-500">*</span>
            </label>
            <textarea
              name="operatingCountries"
              value={data.operatingCountries || ""}
              onChange={handleChange}
              placeholder="Enter all countries separated by commas"
              className="w-full bg-[#2a2a33] border-2 border-transparent hover:border-blue-500/60 focus:border-blue-500 focus:ring-0 text-white px-4 py-3 rounded-lg transition duration-200 min-h-[100px]"
              required
            />
          </div>

          {/* Business Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-0.5">
              Business Address <span className="text-red-500">*</span>
            </label>
            <p className="text-red-500 text-xs mb-1">Required</p>
            <input
              type="text"
              name="businessAddress"
              placeholder="Business Address"
              value={data.businessAddress}
              onChange={handleChange}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City, State, etc */}
          {[
            { label: "City", name: "businessCity", placeholder: "City Name" },
            {
              label: "State / Province",
              name: "businessState",
              placeholder: "State or Province",
            },
            {
              label: "Country",
              name: "businessCountry",
              placeholder: "Country Business HQ",
            },
            {
              label: "Zip Code / Postal Code",
              name: "businessZip",
              placeholder: "Zip Code / Postal Code",
            },
            {
              label: "Business Email Address",
              name: "businessEmail",
              placeholder: "john@ABC.com",
              type: "email",
            },
            {
              label: "Business Phone Number",
              name: "businessPhone",
              placeholder: "+1 888 123 4567",
              type: "tel",
            },
          ].map((f, i) => (
            <div key={i}>
              <label className="block text-gray-300 mb-0.5">
                {f.label} <span className="text-red-500">*</span>
              </label>
              <p className="text-red-500 text-xs mb-1">Required</p>
              <input
                type={f.type || "text"}
                name={f.name}
                placeholder={f.placeholder}
                value={data[f.name]}
                onChange={handleChange}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Website */}
          <div>
            <label className="block text-gray-300 mb-0.5">Website</label>
            <input
              type="url"
              name="website"
              placeholder="https://ABC.com"
              value={data.website}
              onChange={handleChange}
              className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Inline Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-6">{error}</p>
        )}

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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
