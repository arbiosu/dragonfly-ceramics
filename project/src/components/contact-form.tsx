"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { validateEmail } from "@/lib/utils"
import Image from "next/image"

export default function ContactForm() {
  // Create refs for form fields that don't need immediate UI updates
  const nameRef = useRef("")
  const emailRef = useRef("")
  const messageRef = useRef("")
  const sourceRef = useRef("")
  
  // Keep topic in state since it affects UI (image changes)
  const [topic, setTopic] = useState("customOrder")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>("/customOrder.jpeg")

  // Update image when topic changes
  useEffect(() => {
    switch (topic) {
      case "wholesale":
        setSelectedImage("/wholesale.jpeg")
        break
      case "general":
        setSelectedImage("/pottery1.jpg")
        break
      default:
        setSelectedImage("/customOrder.jpeg") // Default image
    }
  }, [topic])

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Get current ref values
    const formData = {
      name: nameRef.current,
      email: emailRef.current,
      topic: topic,
      message: messageRef.current,
      source: sourceRef.current,
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid email address. Please try again.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/shop/api/email/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 429) {
          setError(`Too many contact attempts. Please try again in ${data.resetInMinutes} minutes.`)
        }
        throw new Error(`Failed to send Contact Form email.`)
      }

      if (data !== null) {
        setSubmitted(true)
        setError(null)
      }
    } catch (error) {
      console.log("Contact email error", error)
      setError("Failed to send your message. Please try again later")
    } finally {
      setIsLoading(false)
    }
  }

  // Topic-specific instructions
  const getTopicInstructions = () => {
    switch (topic) {
      case "customOrder":
        return (
          <div className="p-4 border-l-4 border-dfNew bg-dfNew2 rounded mb-4">
            <h3 className="font-medium text-dfNew flex items-center">custom order instructions</h3>
            <p className="text-dfNew mt-1">
              please include details about your desired design, size, colors, and any specific requirements. if
              possible, mention your preferred date of completion.
            </p>
          </div>
        )
      case "wholesale":
        return (
          <div className="p-4 border-l-4 border-dfNew bg-dfNew2 rounded mb-4">
            <h3 className="font-medium text-dfNew flex items-center">wholesale order instructions</h3>
            <p className="text-dfNew mt-1">
              {`please include information about your business, the products you're interested in, estimated quantities,
              and your location. 
              times for production and shipping vary based on order size and custom requests.
              50% deposit is required for wholesale orders. the remaining balance will be due prior to shipment.
              returns and exchanges are only accepted if items are damaged in transit.`}
            </p>
          </div>
        )
      case "general":
        return (
          <div className="p-4 border-l-4 border-dfNew bg-dfNew2 rounded mb-4">
            <h3 className="font-medium text-dfNew flex items-center">General Inquiry</h3>
            <p className="text-dfNew mt-1">
              {`feel free to ask any questions about our products, shipping, returns, 
              or any other information you need. we'll get back to you as soon as possible.`}
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl mb-2 text-df-text">contact</h1>
      <h2 className="text-lg text-df-text mb-6">
        for custom orders, wholesale, or general questions, please fill out the information below.
      </h2>
      {submitted ? (
        <div className="text-center py-4 px-6 bg-green-50 rounded-md">
          <p className="text-green-600 font-medium">thanks for reaching out!</p>
          <p className="text-green-600 text-sm mt-1">we&apos;ll give you a reply as soon as possible!</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-24">
          {/* Form Section */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="topic" className="block text-lg font-medium text-gray-700 mb-1">
                  topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={topic}
                  onChange={handleTopicChange}
                  disabled={isLoading}
                  required
                  className="text-df-text text-lg w-full px-4 py-2 bg-df-bg border-b border-dfNew focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" disabled>
                    select an option
                  </option>
                  <option value="customOrder">custom order</option>
                  <option value="wholesale">wholesale</option>
                  <option value="general">general inquiry</option>
                </select>
              </div>
              {topic && getTopicInstructions()}
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
                  name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue=""
                  onChange={(e) => nameRef.current = e.target.value}
                  disabled={isLoading}
                  required
                  className="text-df-text bg-df-bg w-full px-4 py-2 bg border-b border-dfNew focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue=""
                  onChange={(e) => emailRef.current = e.target.value}
                  disabled={isLoading}
                  required
                  className="text-df-text bg-df-bg w-full px-4 py-2 bg border-b border-dfNew focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-1">
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  defaultValue=""
                  onChange={(e) => messageRef.current = e.target.value}
                  disabled={isLoading}
                  required
                  rows={4}
                  className="text-df-text bg-df-bg w-full px-4 py-2 bg border-b border-dfNew focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="source" className="block text-lg font-medium text-gray-700 mb-1">
                  where did you hear about me?
                </label>
                <select
                  id="source"
                  name="source"
                  defaultValue=""
                  onChange={(e) => sourceRef.current = e.target.value}
                  disabled={isLoading}
                  required
                  className="text-df-text text-lg w-full px-4 py-2 bg-df-bg border-b border-dfNew focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                {error && <p className="text-red-600 mt-2">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-dfNew2 hover:bg-dfNew hover:text-white text-df-text py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    processing...
                  </div>
                ) : (
                  "submit"
                )}
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full h-full overflow-hidden shadow-lg">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt={`${topic} image`}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                  placeholder="blur"
                  blurDataURL={selectedImage}
                />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}