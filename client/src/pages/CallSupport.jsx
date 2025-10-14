import React from "react";

function CallSupport() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Call Support</h1>
      <p className="text-gray-600 mb-6">
        Need urgent help? You can reach our support team directly.
      </p>
      <a
        href="tel:+18001234567"
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
      >
        📞 Call +1 800 123 4567
      </a>
    </div>
  );
}

export default CallSupport;
