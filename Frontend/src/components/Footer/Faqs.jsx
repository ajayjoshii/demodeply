import React, { useState } from "react";

const faqsData = [
    {
        question: "Does FoodOrderNP prepare food itself?",
        answer: "Yes, FoodOrderNP prepare food itself.We have hired experienced chef that prepares delicious food.",
    },
    {
        question: "To which locations do you deliver?",
        answer: "We deliver to various locations within the seven provinces. You can check delivery availability by entering your address during checkout.",
    },
    {
        question: "What is the delivery charge?",
        answer: "The delivery charge is calculated based on the restaurant bill total and the approximate road distance  from the delivery location. (Up to 1 Km: Rs. 20, After 1 Km: Additional Rs. 20/km)",
    },
    {
        question: "How do I pay for my food?",
        answer: "You can pay in cash upon delivery or through supported online payment methods.",
    },
    {
        question: "Do you guarantee the quality for food?",
        answer: "We ensure the food is delivered fresh and as per restaurant standards, but the food quality is the responsibility of the restaurant.",
    },
    {
        question: "Can I cancel my order if needed?",
        answer: "Yes, orders can be canceled by contacting our support team, depending on the order status.",
    },

    {
        question: "What is the minimum order amount for delivery service?",
        answer: "Minimum order requirement is around Rs. 300.",
    },
    {
        question: "What are your service hours?",
        answer: "Our delivery hours are from 8:00 AM to 9:00 PM every day.",
    },
    {
        question: "How much time does it take to get my food delivered?",
        answer: "Delivery usually takes 45–60 minutes depending on location and restaurant preparation time.",
    },
];

export default function Faqs() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white mt-[90px] rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqsData.map((faq, index) => (
                    <div key={index} className="border-b pb-4">
                        <button
                            onClick={() => toggle(index)}
                            className="w-full text-left flex justify-between items-center font-medium text-gray-800 focus:outline-none"
                        >
                            <span>{faq.question}</span>
                            <span className="text-green-600 text-2xl">{openIndex === index ? "−" : "+"}</span>
                        </button>
                        {openIndex === index && (
                            <p className="mt-2 text-gray-600 transition-all duration-200">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
