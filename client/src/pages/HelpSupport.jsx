import React, { useState } from "react";
import {
  FaQuestionCircle,
  FaPhoneAlt,
  FaComments,
  FaShieldAlt,
  FaExclamationTriangle,
  FaEnvelope,
  FaStar,
} from "react-icons/fa";

function HelpSupport() {
  // FAQ Toggle State
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I book a ride?",
      answer:
        "Go to 'Search Rides', find your preferred ride, and click 'Book Now'. You’ll need to confirm your seat and payment.",
    },
    {
      question: "How do I post a ride as a driver?",
      answer:
        "Click 'Post a Ride' from your dashboard, fill in the trip details like route, date, time, and price per seat, then publish.",
    },
    {
      question: "What if I need to cancel my booking?",
      answer:
        "You can cancel bookings from 'My Bookings' page. Refund policies depend on timing and ride conditions.",
    },
    {
      question: "How does payment work?",
      answer:
        "Passengers pay via the app during booking. Drivers receive the fare after the ride is completed.",
    },
    {
      question: "Is my ride safe?",
      answer:
        "Yes, all drivers and passengers are verified. We recommend checking profiles before confirming a ride.",
    },
  ];

  const quickActions = [
    {
      title: "Report a Problem",
      desc: "Facing issues during booking or ride? Report here.",
      icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
    },
    {
      title: "Call Support",
      desc: "Speak directly with our support team for urgent help.",
      icon: <FaPhoneAlt className="text-green-500 text-2xl" />,
    },
    {
      title: "Live Chat",
      desc: "Chat instantly with our support team.",
      icon: <FaComments className="text-purple-500 text-2xl" />,
    },
    {
      title: "Feedback",
      desc: "Help us improve by sharing your experience.",
      icon: <FaStar className="text-yellow-500 text-2xl" />,
    },
  ];

  const policies = [
    {
      title: "How do I pay for a ride?",
      desc: "You pay the driver directly in cash after the ride. Please carry exact change if possible.",
    },

    {
      title: "Refund Policy",
      desc: "Full refund if cancelled within allowed time. Partial refund may apply otherwise.",
    },
    {
      title: "Safety Guidelines",
      desc: "Always verify driver and passenger details before the trip. Share ride details with friends/family.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Help & Support
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Need assistance? We're here to help passengers and drivers every step of
        the way.
      </p>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaQuestionCircle className="text-blue-500" /> Frequently Asked
          Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                <span className="text-gray-500">
                  {openFAQ === index ? "−" : "+"}
                </span>
              </div>
              {openFAQ === index && (
                <p className="text-gray-600 mt-2 text-sm">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 shadow-md rounded-xl p-5 flex items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition"
            >
              {action.icon}
              <div>
                <h3 className="font-semibold text-gray-800">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaShieldAlt className="text-red-500" /> Safety & Policies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white border shadow-md rounded-xl p-5 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-gray-800">{policy.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{policy.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Still need help?
        </h2>
        <p className="text-gray-600 mb-6">
          You can always reach out to us directly.
        </p>
        <a
          href="mailto:support@rideapp.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition"
        >
          <FaEnvelope /> Email Support
        </a>
      </div>
    </div>
  );
}

export default HelpSupport;
