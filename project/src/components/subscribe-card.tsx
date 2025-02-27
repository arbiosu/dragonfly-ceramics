"use client";


import { useState } from "react";
import Image from "next/image";


export default function SubscribeCard() {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // TODO: make into util function
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email) {
            setError("Please enter your email address. Thank you!")
            return
        }

        if (!validateEmail(email)) {
            setError("Invalid email address. Please try again.")
            return
        }

        setSubmitted(true)
        setError(null)
        // TODO: hit api
    }
        return (
            <div className="w-full mx-auto rounded-lg shadow-lg bg-white p-6 flex flex-col h-full">
                <div className="text-center mb-auto justify-items-center space-y-8">
                    <h2 className="text-xl font-bold text-df-text mb-2">
                        Subcribe
                    </h2>
                    <Image 
                        src="/mail.svg"
                        alt="Profile icon with heart"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="text-center my-auto py-4">
                    <p className="text-df-text">
                        Join our mailing list for product updates!
                    </p>
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
                                />
                            </div>
                            {error && <p className="text-red-600">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className="flex justify-center mt-4 w-full bg-df-text hover:bg-blue-300 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
                        >
                            Subscribe Now
                        </button>
                    </form>
                )}
            </div>
        )
}