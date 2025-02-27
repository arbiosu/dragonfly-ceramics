"use client";


import { useState } from "react";
import Image from "next/image";


export interface FAQ {
    id: number
    question: string
    answer: string
}

interface FAQProps {
    faqs: FAQ[]
}


export default function FAQCarousel({ faqs }: FAQProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const visibleFaqs = faqs.slice(currentIndex, currentIndex + 1)

    const handlePrevious = () => {
        setCurrentIndex(() => Math.max(0, currentIndex - 1))
    }

    const handleNext = () => {
        setCurrentIndex(() => Math.min(faqs.length - 1, currentIndex + 1))
    }

    return (
        <div className="w-full max-w-3xl mx-auto py-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-df-text">
                Frequently Asked Questions
            </h2>
            <div className="relative">
                <div className="grid grid-cols-1 gap-6 py-4 transition-all duration-300 ease-in-out">
                    {visibleFaqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="flex-1 min-w-0 bg-white rounded-lg shadow-md p-6 border border-gray-200 transition-all hover:shadow-lg"
                        >
                            <h3 className="text-lg text-df-text font-semibold mb-3">
                                {faq.question}
                            </h3>
                            <p className="text-df-text">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mt-6 md:mt-0">
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`relative bg-white rounded-full p-2 shadow-md z-10 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-300'}`}
                    aria-label="Previous FAQS"
                >
                    <Image src="/chevron-left.svg" alt="Left arrow icon" width={48} height={48} />
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex >= faqs.length - 1}
                    className={`relative bg-white rounded-full p-2 shadow-md z-10 ${currentIndex >= faqs.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-300'}`}
                    aria-label="Next FAQS"
                >
                    <Image src="/chevron-right.svg" alt="Right arrow icon" width={48} height={48} />
                </button>
            </div>
            <div className="flex justify-center mt-6 gap-2">
                {faqs.map((_, index) => (
                    index <= faqs.length - 1 && (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-8 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                        aria-label={`Go to page ${index + 1}`}
                    />
                    )
                ))} 
            </div>
        </div>
    )
}