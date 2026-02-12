import React from "react";

export default function GlobalAlertModal({ title, message, type = "error", onClose }) {
  const colors = {
    error: "bg-red-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    info: "bg-blue-600",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-[#2a2a33] text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className={`text-xl font-semibold mb-2 ${colors[type] ? colors[type] : ""}`}>
          {title || "Notification"}
        </h2>
        <p className="text-gray-200 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
}
