import { useState, useEffect } from "react";

export default function Declarations({
  nextStep,
  prevStep,
  updateFormData,
  formData,
  isLastStep,
}) {
  const [data, setData] = useState({
    PersonFinancialSanctions: "",
    PersonIsPEP: "",
    PersonChargedWithCrime: "",

    HighRiskCountriesActivity: "",

    AcceptingCriminalProceeds: "",
    TerroristAssociation: "",
    AnonymousAccounts: "",
    AssetsFromMinors: "",
    BinaryOptions: "",
    BanknotesSales: "",
    VirtualMixers: "",
    AssociatedWithPEPs: "",
    DrugsActivity: "",
    ShellBanks: "",
    CorrespondentBanks: "",
    ArmsDefense: "",
    PiracyMedia: "",
    AdultEntertainment: "",
    CounterfeitGoods: "",
    PyramidSchemes: "",

    SOFFile: null,
    SOWFile: null,


    TermsNoAdverseFraudMedia: false,
TermsOccupationUpdate: false,
TermsKYCUpdate: false,
TermsNoPrivacyCoins: false,
TermsBSAAcknowledgement: false,
TermsAuthorization: false,
TermsCertificateStatement: false,
TermsPrivacyConsent: false,
TermsNoThirdParty: false,
TermsAcceptTnC: false,
TermsAcceptPrivacy: false,
TermsAcceptAML: false,
TermsInformationAccurate: false,
  });

  const [errors, setErrors] = useState({
    PersonFinancialSanctions: "",
    PersonIsPEP: "",
    PersonChargedWithCrime: "",
    HighRiskCountriesActivity: "",
    AcceptingCriminalProceeds: "",
    TerroristAssociation: "",
    AnonymousAccounts: "",
    AssetsFromMinors: "",
    BinaryOptions: "",
    BanknotesSales: "",
    VirtualMixers: "",
    AssociatedWithPEPs: "",
    DrugsActivity: "",
    ShellBanks: "",
    CorrespondentBanks: "",
    ArmsDefense: "",
    PiracyMedia: "",
    AdultEntertainment: "",
    CounterfeitGoods: "",
    PyramidSchemes: "",
    SOFFile: "",
    SOWFile: "",

    TermsNoAdverseFraudMedia: "",
TermsOccupationUpdate: "",
TermsKYCUpdate: "",
TermsNoPrivacyCoins: "",
TermsBSAAcknowledgement: "",
TermsAuthorization: "",
TermsPrivacyConsent: "",
TermsNoThirdParty: "",
TermsAcceptTnC: "",
TermsAcceptPrivacy: "",
TermsAcceptAML: "",
TermsInformationAccurate: "",
  });


  const handleCheckbox = (field) => {
  const newData = { ...data, [field]: !data[field] };
  setData(newData);
  updateFormData(newData);
  setErrors((prev) => ({ ...prev, [field]: "" }));
};

  // Load saved data if exists
  useEffect(() => {
    if (formData) {
      setData((prev) => ({ ...prev, ...formData }));
    }
  }, [formData]);

  // Handle Yes/No select
  const handleSelect = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error on select
  };

  // Handle file upload
  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; // remove data:mime;base64,

      const fileData = {
        name: file.name,
        base64: base64String,
      };

      const newData = { ...data, [field]: fileData };
      setData(newData);
      updateFormData(newData);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    reader.readAsDataURL(file);
  };

  // Reusable Yes/No buttons
  const yesNoButton = (field) => (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
      {["Yes", "No"].map((option) => (
        <div
          key={option}
          onClick={() => handleSelect(field, option)}
          className={`cursor-pointer px-6 py-2 rounded-lg border-2 transition-all duration-200 text-center sm:text-left ${
            data[field] === option
              ? "border-blue-500 bg-[#22222a]"
              : "border-transparent bg-[#2a2a33] hover:border-blue-500/60 hover:bg-[#24242c]"
          }`}
        >
          <p className="text-gray-100 font-medium">{option}</p>
        </div>
      ))}
    </div>
  );

  const handleNext = () => {
    let newErrors = {
      PersonFinancialSanctions: "",
      PersonIsPEP: "",
      PersonChargedWithCrime: "",
      HighRiskCountriesActivity: "",
      AcceptingCriminalProceeds: "",
      TerroristAssociation: "",
      AnonymousAccounts: "",
      AssetsFromMinors: "",
      BinaryOptions: "",
      BanknotesSales: "",
      VirtualMixers: "",
      AssociatedWithPEPs: "",
      DrugsActivity: "",
      ShellBanks: "",
      CorrespondentBanks: "",
      ArmsDefense: "",
      PiracyMedia: "",
      AdultEntertainment: "",
      CounterfeitGoods: "",
      PyramidSchemes: "",
      SOFFile: "",
      SOWFile: "",

      
    };

    let hasError = false;

    // 🔹 Validate all Yes/No fields
    Object.keys(newErrors).forEach((field) => {
      if (field !== "SOFFile" && field !== "SOWFile" && !data[field]) {
        newErrors[field] = "Please select Yes or No for this question.";
        hasError = true;
      }
    });

    // 🔹 Validate Files
    if (!data.SOFFile) {
      newErrors.SOFFile = "Please upload a file for Source of Funds.";
      hasError = true;
    }

    if (!data.SOWFile) {
      newErrors.SOWFile = "Please upload a file for Source of Wealth.";
      hasError = true;
    }

    const requiredTerms = [
  "TermsNoAdverseFraudMedia",
  "TermsOccupationUpdate",
  "TermsNoPrivacyCoins",
  "TermsBSAAcknowledgement",
  "TermsAuthorization",
  "TermsPrivacyConsent",
  "TermsNoThirdParty",
  "TermsAcceptTnC",
  "TermsAcceptPrivacy",
  "TermsAcceptAML",
  "TermsInformationAccurate",
];

requiredTerms.forEach((field) => {
  if (!data[field]) {
    newErrors[field] = "You must accept this term.";
    hasError = true;
  }
});

    setErrors(newErrors);

    if (!hasError) {
      updateFormData(data);
      nextStep();
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-5xl p-10 shadow-2xl rounded-2xl">
        <h1 className="text-4xl font-semibold text-center text-white mb-8">
          Personal Declarations
        </h1>

        <div className="space-y-10">
          {/* Question 1 */}
          <div>
            <div className="flex flex-col flex-col-reverse sm:flex-row sm:items-start gap-4">
              {yesNoButton("PersonFinancialSanctions")}
              <p className="text-gray-300">
                Have you ever been subject to any local or international
                financial sanctions? <span className="text-red-500">*</span>
              </p>
            </div>
            {errors.PersonFinancialSanctions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.PersonFinancialSanctions}
              </p>
            )}
          </div>

          {/* Question 2 */}
          <div>
            <div className="flex flex-col flex-col-reverse sm:flex-row sm:items-start gap-4">
              {yesNoButton("PersonIsPEP")}
              <p className="text-gray-300">
                Are you a politically exposed person (PEP)?{" "}
                <span className="text-red-500">*</span>
              </p>
            </div>
            {errors.PersonIsPEP && (
              <p className="text-red-500 text-sm mt-1">{errors.PersonIsPEP}</p>
            )}
          </div>

          {/* Question 3 */}
          <div>
            <div className="flex flex-col flex-col-reverse sm:flex-row sm:items-start gap-4">
              {yesNoButton("PersonChargedWithCrime")}
              <p className="text-gray-300">
                Has the individual above ever been charged with the crime of
                money-laundering, financing, or supporting terrorism or other
                economic crimes? <span className="text-red-500">*</span>
              </p>
            </div>
            {errors.PersonChargedWithCrime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.PersonChargedWithCrime}
              </p>
            )}
          </div>

          <div>
            <div className="flex flex-col flex-col-reverse sm:flex-row sm:items-start gap-4">
              {yesNoButton("HighRiskCountriesActivity")}
              <p className="text-gray-300">
                Do you conduct any financial activity with individuals or
                businesses which reside in:
                <br />
                Afghanistan, Angola, Belarus, Burundi, Cambodia, Central African
                Republic, Chad, The Democratic Republic of the Congo, Equatorial
                Guinea, Eritrea, Guinea-Bissau, Haiti, Islamic Republic Of Iran,
                Iraq, People's Democratic Republic Lao, Lebanon, Libyan Arab
                Jamahiriya, Myanmar, Nigeria, North Korea, Papua New Guinea,
                Russian Federation, Somalia, Sudan, Syrian Arab Republic,
                Tajikistan, Turkmenistan, Venezuela, Western Sahara, Yemen,
                Zimbabwe
                <span className="text-red-500">*</span>
              </p>
            </div>
            {errors.HighRiskCountriesActivity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.HighRiskCountriesActivity}
              </p>
            )}
          </div>

          <div>
            <p className="text-gray-300 mb-4">
              Do you engage or are associated with:
            </p>

            {[
              [
                "AcceptingCriminalProceeds",
                "Accepting assets that are known or suspected to be the proceeds of criminal activity",
              ],
              [
                "TerroristAssociation",
                "Entering into/maintain business relationships with individuals or entities known or suspected to be a terrorist or a criminal organisation or member of such or listed on sanction lists",
              ],
              [
                "AnonymousAccounts",
                "Maintaining anonymous accounts, accounts for shell banks or pay-through accounts",
              ],
              [
                "AssetsFromMinors",
                "Accepting assets from individuals below the age of 18",
              ],
              ["BinaryOptions", "Binary Options"],
              ["BanknotesSales", "Banknotes sales"],
              ["VirtualMixers", "Virtual mixers"],
              ["AssociatedWithPEPs", "PEPs"],
              [
                "DrugsActivity",
                "Marijuana or Drugs and the use of a drug or drug-like substance",
              ],
              ["ShellBanks", "Shell Banks"],
              ["CorrespondentBanks", "Correspondent Banks"],
              ["ArmsDefense", "Arms/Defense"],
              ["PiracyMedia", "Illegal / piracy audio or video recordings"],
              [
                "AdultEntertainment",
                "Red light or Adult Entertainment business",
              ],
              ["CounterfeitGoods", "Infringing goods (counterfeit goods)"],
              ["PyramidSchemes", "pyramid schemes"],
            ].map(([field, label]) => (
              <div key={field} className="mb-6">
                <div className="flex flex-col flex-col-reverse sm:flex-row sm:items-start gap-4">
                  {yesNoButton(field)}
                  <p className="text-gray-300">
                    {label} <span className="text-red-500">*</span>
                  </p>
                </div>

                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

           {/* File Upload Section (at the end) */}
          <div className="mt-10 space-y-6">
            {/* SOF File Upload */}
            <div>
              <label className="block text-gray-300 mb-0.5">
                Upload Source of Funds (SOF) File <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload("SOFFile", e)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.SOFFile && (
                <p className="text-red-500 text-sm mt-1">{errors.SOFFile}</p>
              )}
            </div>

            {/* SOW File Upload */}
            <div>
              <label className="block text-gray-300 mb-0.5">
                Upload Source of Wealth (SOW) File <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload("SOWFile", e)}
                className="w-full bg-[#2a2a33] text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.SOWFile && (
                <p className="text-red-500 text-sm mt-1">{errors.SOWFile}</p>
              )}
            </div>
          </div>

          <div className="mt-12 space-y-4">
  <h2 className="text-2xl font-semibold text-white">
    Terms and Conditions
  </h2>

  {[
    ["TermsNoAdverseFraudMedia", "To your best knowledge you not aware of adverse fraud media related to you"],
    ["TermsOccupationUpdate", "You will provide updates within 30 days of any change in occupation"],
    ["TermsKYCUpdate", "If requested you will provide KYC updates with 14days from request."],
    ["TermsNoPrivacyCoins", "The crypto wallet(s) provided will not conduct transactions with any privacy coins and/or mixers."],
    ["TermsBSAAcknowledgement", "I acknowledge that Done.com Inc and/or its partner Banks and Trusts might be required by law to carry out all necessary security and customer due diligence checks on all parties involved for purposes of this application in compliance with the Bank Secrecy Act (“BSA”), and all Laws and regulations relating to AML, KYC, KYB, counter-terrorist financing, sanctions screening requirements, or any other legal obligations."],
    ["TermsAuthorization", "I agree and authorize Done.com Inc and its partner Banks and Trusts to make, directly or through any third-party, any inquiries that Done.com Inc or its Partner Banks and Trusts considers necessary to validate the information provided, including checking commercial databases or credit reports.  I further authorize Done.com Inc and its partner Banks and Trusts to take such steps as they deem necessary to comply with their legal obligations; and acknowledge and agrees that Done.com Inc or its partner Banks and Trusts may, from time to time, be required to disclose this application’s information to third-parties."],
    ["TermsCertificateStatement", "I have made, or caused to be made, such examinations or investigations as are, in my opinion, necessary to make the statements contained in this certificate and I have furnished this certificate with the intent that it may be relied on by Done.com Inc."],
    ["TermsPrivacyConsent", "To the extent that the attachments to this form include personal information, I have obtained all necessary consents from the individuals about whom such information relates to allow Done.com Inc. to collect, use and disclose the personal information for the purposes described in the Done.com Inc. Privacy Policy."],
    ["TermsNoThirdParty", "In its dealings with Done.com Inc you confirm that you are not acting on behalf of a third party."],
    ["TermsAcceptTnC", "I accept the Terms and Conditions"],
    ["TermsAcceptPrivacy", "I accept the Privacy Policy"],
    ["TermsAcceptAML", "I accept the AML Policy"],
    ["TermsInformationAccurate", "I certify that all information provided is accurate and complete"],
  ].map(([field, label]) => (
    <div key={field}>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={data[field]}
          onChange={() => handleCheckbox(field)}
          className="mt-1"
        />
        <span className="text-gray-300">{label}</span>
      </label>

      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  ))}
</div>
        </div>

        {/* Navigation */}
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
            {isLastStep ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
