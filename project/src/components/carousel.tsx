"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image";


interface BasicCarouselProps {
  /**
   * Array of items to display in the carousel
   */
  items: React.ReactNode[]
  /**
   * Additional class name for the carousel container
   */
  className?: string
}

export function BasicCarousel({ items, className }: BasicCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }, [items.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }, [items.length])

  if (items.length === 0) {
    return null
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)} role="region" aria-roledescription="carousel">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${items.length}`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-gray-800 shadow-md transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Previous slide"
          >
            <Image src="/chevron-left.svg" alt="Left arrow icon" width={48} height={48} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-gray-800 shadow-md transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Next slide"
          >
            <Image src="/chevron-right.svg" alt="Right arrow icon" width={48} height={48} />
          </button>
        </>
      )}
    </div>
  )
}
