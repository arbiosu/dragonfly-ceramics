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
    
    return (
        <nav
        className={`p-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? "bg-df-text shadow-md" : "bg-transparent"}`}
        >
            <ul className="flex gap-8 text-white text-lg md:text-3xl lg:text-4xl">
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href} className="hover:text-blue-300 transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
                <li>
                    <Image 
                        src="/logo-cropped.png"
                        alt="Dragonfly Ceramics"
                        width={70}
                        height={40}
                    />
                </li>
            </ul>
        </nav>
    )
}
