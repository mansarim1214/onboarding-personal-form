import React from "react";

export default function SignificantInfoPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1e1e24] p-8 rounded-2xl max-w-3xl shadow-xl text-gray-200 overflow-y-auto max-h-[80vh] border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">
          SIGNIFICANT INDIVIDUALS
        </h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            <strong className="text-blue-400">Control Person:</strong> A Control
            Person is defined as a single individual with significant
            responsibility to control, manage, or direct a legal entity
            customer, including an executive officer or senior manager (e.g., a
            Chief Executive Officer, Chief Financial Officer, Chief Operating
            Officer, Compliance Officer, Managing Member, General Partner,
            President, Vice President, or Treasurer); or any individual who
            regularly performs similar functions.
          </p>
          <p>
            <strong className="text-blue-400">Beneficiary Owner:</strong> The
            natural person who ultimately owns or controls a corporation, trust,
            or other legal entity, even if the ownership is exercised indirectly
            through layers of companies, nominees, or arrangements.
          </p>
          <p>
            <strong className="text-blue-400">Authorized Signatory:</strong> A
            person formally given the legal authority by a corporation to sign
            documents, contracts, and financial instruments on its behalf.
          </p>
          <p>
            <strong className="text-blue-400">Director:</strong> An individual
            elected or appointed to the board of directors who is legally
            responsible for overseeing the management, governance, and strategic
            direction of the corporation.
          </p>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
