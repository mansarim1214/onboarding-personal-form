import { useState, useEffect } from "react";
import Step1_PersonalDetails from "./components/steps/Step1_PersonalDetails";
import Step2_BusinessBankAccount from "./components/steps/Step2_BusinessBankAccount";
import Step3_BusinessInformation from "./components/steps/Step3_BusinessInformation";
import Step4_BusinessStructure from "./components/steps/Step4_BusinessStructure";
import Step5_BusinessStructureCont from "./components/steps/Step5_BusinessStructureCont";
import Step6_SignificantIndividual from "./components/steps/Step6_SignificantIndividual";
import Step7_BeneficiaryBankInformation from "./components/steps/Step7_BeneficiaryBankInformation";
import Step8_WalletInformation from "./components/steps/Step8_WalletInformation";
import Step9_BusinessDeclarations from "./components/steps/Step9_BusinessDeclarations";
import Step10_BusinessSupportingDocuments from "./components/steps/Step10_BusinessSupportingDocuments";
import Step11_EnhancedDueDiligence from "./components/steps/Step12_EnhancedDueDiligence";
import Declarations from "./components/steps/Declarations";
import Employment from "./components/steps/Employment";
import ProgressBar from "./components/ProgressBar";

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");




  const triggerIndustries = [
    "Trust",
    "Non-Profit/Charity",
    "Accountant",
    "Agent a federal or local government",
    "Antiques and art trade",
    "Casinos",
    "Crypto services",
    "Dealers in precious metals and precious stones",
    "Factors (Receivables Factoring)",
    "Fiat/Crypto Trader",
    "Financial Entity/Services",
    "Fintech",
    "Industry engaged in virtual currency transactions",
    "Life insurance entity, broker, and/or agents",
    "Mining & Quarrying",
    "Money services businesses (MSB)",
    "Multi-level marketing (MLM)",
    "Non-profits & NGOs",
    "Provider of private or automated banking/crypto machines",
    "Real Estate & Housing",
    "Securities dealers",
    "Title Insurers",
    "Lottery/Gaming/Casino Winnings",
    "Donation/Gift/Inheritance/Trust",
  ];

  const shouldShowEDD = (data) => {
    const industries = data.industries || [];
    const hasTriggerIndustry = Array.isArray(industries)
      ? industries.some((i) => triggerIndustries.includes(i))
      : false;

    const hedge = data.operatesAsHedgeFund === "Yes";
    const finInst = data.operatesAsFinancialInstitution === "Yes";

    return hasTriggerIndustry || hedge || finInst;
  };

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // ✅ Consistent step mapping
 const getActiveSteps = (data) => {
  // Only return personal steps, skip business-related ones and skip Step 2
  return [
    1, // Contact Details (Step 1)
    2, // Employment (Step 3, skipping Step 2)
    3, // Beneficiary Bank Information
    4, // Personal Declaration
    
    
    ...(shouldShowEDD(data) ? [13] : []), // Enhanced Due Diligence (if applicable)
  ];
};

  const nextStep = (latestData = {}) => {
  const merged = { ...formData, ...latestData };
  setFormData(merged);

  const activeSteps = getActiveSteps(merged);
  const currentIndex = activeSteps.indexOf(step);

  if (currentIndex === -1) return;
  if (currentIndex === activeSteps.length - 1) {
    submitForm(merged);
    return;
  }

 

  setStep(activeSteps[currentIndex + 1]);
};


  const prevStep = () => {
    const activeSteps = getActiveSteps(formData);
    const currentIndex = activeSteps.indexOf(step);

    if (currentIndex > 0) {
      setStep(activeSteps[currentIndex - 1]);
    }
  };

  const submitForm = async (finalData = null) => {
    const payload = finalData || formData;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const functionURL =
        window.location.hostname === "localhost"
          ? "http://localhost:8888/.netlify/functions/sendEmail"
          : "/.netlify/functions/sendEmail";

      const response = await fetch(functionURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: payload }),
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = "https://www.doneotc.com/thank-you";
      } else {
        console.error("❌ Email send failed:", result);
        setErrorMessage(
          result.error || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("🚨 Submission error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPersonal = formData.accountType === "Personal";
  const showEDD = shouldShowEDD(formData);
  const activeSteps = getActiveSteps(formData);
  const totalSteps = activeSteps.length;
  const isLastStep = step === activeSteps[activeSteps.length - 1];

return (
  <div className="flex justify-center bg-[#0c0c0f] min-h-screen">
    <div className="flex w-full bg-[#1a1a22]/80 rounded-2xl shadow-2xl border border-[#2a2a33]">
      <div className="flex-1">
        {/* Step 1 */}
        {step === 1 && (
          <Step1_PersonalDetails
            nextStep={nextStep}
            updateFormData={updateFormData}
            formData={formData}
          />
        )}

        {/* Step 3 (Skip Step 2 and go directly here) */}
        {step === 2 && (
          <Employment
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            formData={formData}
          />
        )}

        {/* Step 8 */}
        {step === 3 && (
          <Step7_BeneficiaryBankInformation
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            formData={formData}
          />
        )}

        {/* Step 9
        // {step === 4 && (
        //   <Step8_WalletInformation
        //     nextStep={nextStep}
        //     prevStep={prevStep}
        //     updateFormData={updateFormData}
        //     formData={formData}
        //   />
        // )} */}


  

        {/* Personal Declarations */}
        {step === 4 &&(
          <Declarations
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            formData={formData}
            isLastStep={isLastStep}
            submitForm={submitForm}
          />
        )}

       
        {errorMessage && (
          <p className="text-red-500 mt-3 text-sm">{errorMessage}</p>
        )}
      </div>

      {/* ✅ Sidebar Progress */}
      <ProgressBar
        currentStep={step}
        activeSteps={activeSteps}
        totalSteps={totalSteps}
        accountType={formData.accountType}
      />
    </div>
  </div>
);

}
