'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/shop', label: 'shop' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 p-4 transition-all duration-300 ${isScrolled ? 'bg-df-text shadow-md' : 'bg-transparent'}`}
    >
      <div className='relative flex items-center justify-between'>
        {/* Hamburger Menu (mobile only) */}
        <button
          className='text-white md:hidden'
          onClick={toggleMobileMenu}
          aria-label='Toggle menu'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='3' y1='12' x2='21' y2='12'></line>
            <line x1='3' y1='6' x2='21' y2='6'></line>
            <line x1='3' y1='18' x2='21' y2='18'></line>
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <ul className='hidden gap-8 text-lg text-white md:flex md:text-3xl lg:text-4xl'>
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className='transition-colors hover:text-dfNew2'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Centered Logo */}
        <div className='absolute bottom-0 left-1/2 top-2 z-10 -translate-x-1/2 -translate-y-1/2'>
          <Link href='/' aria-label='Home'>
            <Image
              src='/logo-cropped.png'
              alt='Dragonfly Ceramics'
              width={100}
              height={60}
              className='object-contain'
              placeholder='blur'
              blurDataURL='/logo-cropped.png'
            />
          </Link>
        </div>
        {/* Shopping Cart right aligned */}
        <div className='m-2 text-white'>
          <Link href='/shop/cart' aria-label='Shopping Cart'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='9' cy='21' r='1'></circle>
              <circle cx='20' cy='21' r='1'></circle>
              <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
            </svg>
            {cartCount > 0 && (
              <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-dfNew text-xs text-white'>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className='absolute left-0 right-0 top-full min-h-screen bg-df-text p-4 shadow-md transition-transform duration-300 ease-in-out md:hidden'>
          <ul className='flex flex-col gap-4 text-xl text-white'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className='transition-colors hover:text-blue-300'
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
  );
}
