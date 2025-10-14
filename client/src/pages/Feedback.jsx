import React, { useState } from "react";

function Feedback() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFeedback("");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Feedback</h1>
      <p className="text-gray-600 mb-4">
        We appreciate your thoughts to improve our service.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;
