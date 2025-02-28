"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"


const navLinks = [
    { href: "/", label: "home"},
    { href: "/shop", label: "shop" },
    { href: "/about", label: "about" },
    { href: "/contact", label: "contact" },
    ]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState<boolean>(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 10) {
            setIsScrolled(true)
          } else{
            setIsScrolled(false)
          }
        }
    
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
      }, [])

      const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev)
      }
    
    return (
        <nav
        className={`p-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? "bg-df-text shadow-md" : "bg-transparent"}`}
        >
            <div className="relative flex items-center justify-between">
                {/* Hamburger Menu (mobile only) */}
                <button 
                    className="md:hidden text-white"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex gap-8 text-white text-lg md:text-3xl lg:text-4xl">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} className="hover:text-blue-300 transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Centered Logo */}
                <div className="absolute left-1/2 top-2 bottom-0 z-10 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/" aria-label="Home">
                        <Image 
                            src="/logo-cropped.png"
                            alt="Dragonfly Ceramics"
                            width={80}
                            height={60}
                            className="object-contain"
                        />
                    </Link>
                </div>
                {/* Shopping Cart right aligned */}
                <div className="text-white m-2">
                    <Link href="/cart" aria-label="Shopping Cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </Link>
                </div>
            </div>
            {/* Mobile menu overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full min-h-screen left-0 right-0 bg-df-text shadow-md p-4">
                    <ul className="flex flex-col gap-4 text-white text-xl">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    href={link.href} 
                                    className="hover:text-blue-300 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    )
}
