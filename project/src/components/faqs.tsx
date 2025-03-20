"use client";


import { useState, useRef } from "react";
import Image from "next/image";


export interface FAQ {
    id: number
    question: string
    answer: string
}

interface FAQProps {
    faqs: FAQ[]
}

export function FAQHorizontalScroll({ faqs }: FAQProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
        }
    }

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto py-6">
            <h2 className="text-2xl mb-6 text-center text-df-text">
                Frequently Asked Questions
            </h2>
            <div
                ref={scrollRef}
                className="relative overflow-x-auto flex flex-nowrap py-4 px-2"
            >
                {faqs.map((faq) => (
                    <div
                        key={faq.id}
                        className="inline-block align-top p-6 mr-4 last:mr-0 flex-shrink-0 w-96"
                    >
                        <h3 className="text-lg text-dfNew mb-3">
                            {faq.question}
                        </h3>
                        <p className="text-dfNew">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
            {/* Buttons */}
            <div className="flex justify-between mt-6">
                <button onClick={scrollLeft} className="bg-dfNew2 rounded-full p-2 shadow-md hover:bg-blue-300" aria-label="Scroll left">
                    <Image src="/chevron-left.svg" alt="Left arrow icon" width={48} height={48} />
                </button>
                <button onClick={scrollRight} className="bg-dfNew2 rounded-full p-2 shadow-md hover:bg-blue-300" aria-label="Scroll left">
                    <Image src="/chevron-right.svg" alt="Right arrow icon" width={48} height={48} />
                </button>
            </div>
        </div>
    )
}


export default function FAQCarousel({ faqs }: FAQProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const visibleFaqs = faqs.slice(currentIndex, currentIndex + 3)

    const handlePrevious = () => {
        setCurrentIndex(() => Math.max(0, currentIndex - 3))
    }

    const handleNext = () => {
        setCurrentIndex(() => Math.min(faqs.length - 3, currentIndex + 3))
    }

    return (
        <div className="w-full max-w-6xl mx-auto py-6">
            <h2 className="text-2xl mb-6 text-center text-df-text">
                Frequently Asked Questions
            </h2>
            <div className="relative">
                <div className="flex gap-6 overflow-hidden py-4">
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
                {Array.from({ length: Math.ceil(faqs.length / 3) }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index * 3)}
                    className={`h-2 w-8 rounded-full ${currentIndex / 3 === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                    aria-label={`Go to page ${index + 1}`}
                />
                ))}
            </div>
        </div>
    )
}