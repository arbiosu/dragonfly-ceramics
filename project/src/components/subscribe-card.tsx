"use client";


import { useState } from "react";
import Image from "next/image";
import { validateEmail } from "@/lib/utils";


export default function SubscribeCard() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email) {
            setError("Please enter your email address. Thank you!");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email address. Please try again.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/shop/api/email/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 429) {
                    setError(`Too many subscription attempts. Please try again in ${data.resetInMinutes} minutes.`);
                }
                throw new Error(`Failed to send email`);
            }
            if (data !== null) {
                setSubmitted(true);
                setError(null);
            }
        } catch (error) {
            console.log("Email error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto rounded-lg p-6 flex flex-col h-full">
            <div className="text-center mb-auto justify-items-center space-y-8">
                <h2 className="text-xl text-df-text mb-2">
                    Subscribe
                </h2>
            </div>
            <div className="flex justify-center">
                <Image 
                    src="/mail.svg"
                    alt="Envelope icon"
                    width={100}
                    height={100}
                />
            </div>
            <div className="text-center my-auto py-4">
            </div>
            {submitted ? (
                <div className="text-center py-4 px-6 bg-green-50 rounded-md">
                    <p className="text-green-600 font-medium">
                        Thanks for subscribing!
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                        We&apos;ll keep you updated with the latest news
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <div className="relative">
                            <input
                                type="text"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setEmail(() => e.target.value)
                                }}
                                placeholder="name@example.com"
                                className="text-black w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={isLoading}
                            />
                        </div>
                        {error && <p className="text-red-600">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="flex justify-center mt-4 w-full bg-df-text hover:bg-blue-300 text-white py-3 px-4 rounded-md transition duration-300 ease-in-out"
                        disabled={isLoading}
                    >
                    {isLoading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </div>
                    ) : (
                        "Subscribe Now"
                    )}
                    </button>
                </form>
            )}
        </div>
    )
}