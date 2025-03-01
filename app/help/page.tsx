"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "How do I create an event?",
    answer: `If you have an account:
    \nGo to the 'Create Event' page.
    Alternatively, press the Create Event button in the footer.
    Then fill in the details, and click 'Create Event'`,
  },
  {
    question: "Can I edit or delete an event after creating it?",
    answer: "Yes, you can edit or delete an event from the 'My Events' section in your profile page.",
  },
  {
    question: "Is there a fee to create an event?",
    answer: "No, creating events is completely free!",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach us via email at support@meeteen.com.",
  },
];

const HelpPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto rounded-md">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-3 border-b pb-2">
            <button
              className="w-full text-left flex justify-between items-center p-2 bg-gray-200 rounded-md"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-700 whitespace-pre-line">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Need More Help?</h2>
        <p className="text-gray-700">If you have any other questions, feel free to contact us.</p>
        <p className="mt-2">
          📧 <a href="mailto:support@meeteen.com" className="text-blue-500 underline">support@meeteen.com</a>
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
