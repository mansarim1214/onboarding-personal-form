export default function ProgressBar({ currentStep = 1, activeSteps = [], totalSteps = 0, accountType }) {
  const stepTitles = {
    1: "Contact Details",
    2: "Transaction Type",
    3: accountType === "Personal" ? "Employment" : "Business Information",
    4: "Business Structure",
    5: "Business Structure Cont.",
    6: "Significant Individual",
    8: "Beneficiary Bank Information",
    9: "Wallet Information",
    10: "Business Supporting Document",
    11: "Business Declarations",
    12: "Personal Declarations",
    13: "Enhanced Due Diligence",
  };

  const visibleSteps = activeSteps.map((id) => ({
    id,
    title: stepTitles[id] || `Step ${id}`,
  }));

  const currentIndex = visibleSteps.findIndex((s) => s.id === currentStep);
  const resolvedIndex = currentIndex >= 0 ? currentIndex + 1 : 1;

  return (
    <div className="min-h-screen p-6 flex flex-col hidden md:flex items-start bg-[#11111a] rounded-2xl text-white w-64">
      <h2 className="text-xl font-semibold mb-8">Progress</h2>

      <div className="relative w-full">
        <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-gray-700"></div>
        <ul className="space-y-8 relative z-10">
          {visibleSteps.map((step, idx) => {
            const isActive = step.id === currentStep;
            const isCompleted = idx < currentIndex;

            return (
              <li key={step.id} className="flex items-center gap-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-500 border-green-500"
                      : isActive
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-500"
                  }`}
                ></div>
                <span
                  className={`text-sm transition-all duration-300 ${
                    isCompleted
                      ? "text-green-400"
                      : isActive
                      ? "text-blue-400 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-gray-400 text-sm mt-10">
        Step {resolvedIndex} of {visibleSteps.length}
      </p>
    </div>
  );
}
