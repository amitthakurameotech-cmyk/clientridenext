import React, { useState } from "react";

function ReportProblem() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your problem report has been submitted!");
    setMessage("");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Report a Problem</h1>
      <p className="text-gray-600 mb-4">
        Describe the issue you're facing. Our support team will review it shortly.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Describe your problem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReportProblem;
