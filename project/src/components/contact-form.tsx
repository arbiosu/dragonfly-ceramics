"use client"

import { useState } from "react";
import { validateEmail } from "@/lib/utils";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    source: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
        setError("Invalid email address. Please try again.");
        return;
    }

    setIsLoading(true);
    setError(null)

    try {
        const res = await fetch("/shop/api/email/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (!res.ok) {
            if (res.status === 429) {
              setError(`Too many contact attempts. Please try again in ${data.resetInMinutes} minutes.`);
            }
            throw new Error(`Failed to send Contact Form email.`);
        }

        if (data !== null) {
          setSubmitted(true);
          setError(null);
      }
        
    } catch (error) {
        console.log('Contact email error', error);
        setError("Failed to send your message. Please try again later")
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-df-text">Contact</h1>
      <h2 className="text-lg text-df-text mb-6">
        For custom orders, wholesale, or general questions, please fill out the information below.
      </h2>
      {submitted ? (
        <div className="text-center py-4 px-6 bg-green-50 rounded-md">
            <p className="text-green-600 font-medium">
                Thanks for reaching out!
            </p>
            <p className="text-green-600 text-sm mt-1">
                We&apos;ll give you a reply as soon as possible!
            </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            required
            className="text-df-text w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
            className="text-df-text w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            disabled={isLoading}
            required
            className="text-df-text w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isLoading}
            required
            rows={4}
            className="text-df-text w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
            Where did you hear about me?
          </label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            disabled={isLoading}
            required
            className="text-df-text w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="family/friend">Family/Friend</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
            <option value="in person sales">In Person Sales</option>
            <option value="other">Other</option>
          </select>
          {error && <p className="text-red-600">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-df-text hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
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
            "Submit"
        )}
        </button>
      </form>
      )}
    </div>
  );
}

