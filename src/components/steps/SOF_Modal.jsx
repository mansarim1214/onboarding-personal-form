import React from "react";

export default function SOF_Modal({ showModal, handleClose }) {
  return (
    showModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">SOF vs SOW — What’s the difference?</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-lg"
            >
              &times;
            </button>
          </div>

          {/* Modal Content */}
          <div className="space-y-6">
            <p>
              <strong>SOF (Source of Funds)</strong> = Where the money for this deposit is coming from today.
              <br />
              <strong>SOW (Source of Wealth)</strong> = How you built your overall wealth over time.
            </p>
            <p className="text-sm text-gray-600">
              Think of it like this:
              <br />
              <strong>SOF:</strong> "Which account or event is funding this payment?"
              <br />
              <strong>SOW:</strong> "What’s the main story of how you became financially able to make it?"
            </p>

            {/* SOF Section */}
            <div>
              <h3 className="font-semibold text-lg">Source of Funds (SOF)</h3>
              <p>Where the money for your deposit is coming from:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Employment income (e.g., your paycheck)</li>
                <li>Savings (money in a bank account)</li>
                <li>Corporation income / profit or working capital</li>
                <li>Investment returns (dividends / interest)</li>
                <li>Sale of assets (sold a car, house, or investment)</li>
                <li>Loan or credit, donation, inheritance/trust, grant</li>
              </ul>
            </div>

            {/* SOW Section */}
            <div>
              <h3 className="font-semibold text-lg">Source of Wealth (SOW)</h3>
              <p>How you made your wealth over time (your main long-term wealth source):</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Employment income (career earnings over time)</li>
                <li>Business ownership (profits, dividends, or sale of a business)</li>
                <li>Inheritance / legacy (assets received from family/estate)</li>
                <li>Investments (long-term investing in stocks or real estate)</li>
                <li>Asset sales, retirement funds, lottery/gaming winnings</li>
              </ul>
            </div>

            {/* Quick Examples Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Quick Examples:</h4>
              <div className="flex space-x-6">
                <div>
                  <h5 className="font-semibold">Scenario:</h5>
                  <p>
                    You deposit $2,000 from your checking account<br />
                    A company deposits $50,000 to fund operations<br />
                    You deposit $25,000 after selling investments
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold">SOF (for this deposit):</h5>
                  <ul className="list-disc pl-5">
                    <li>Salary / Employment income</li>
                    <li>Corporation working capital</li>
                    <li>Sale of assets / Investment returns</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold">SOW (overall):</h5>
                  <ul className="list-disc pl-5">
                    <li>Employment income</li>
                    <li>Business ownership</li>
                    <li>Investments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={handleClose}
                className="bg-blue-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
