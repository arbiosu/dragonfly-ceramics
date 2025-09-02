'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import Loading from '@/components/loading';

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/shop', label: 'shop' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const { cartCount } = useCart();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (!mounted) {
    return <Loading />;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 p-4 transition-all duration-300 ${
        isScrolled ? 'bg-transparent/20 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className='relative flex items-center justify-between'>
        {/* Hamburger Menu (mobile only) */}
        <button
          className='z-60 text-white md:hidden'
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
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
            className={`transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-90' : ''
            }`}
          >
            {isMobileMenuOpen ? (
              // X icon when menu is open
              <>
                <line x1='18' y1='6' x2='6' y2='18'></line>
                <line x1='6' y1='6' x2='18' y2='18'></line>
              </>
            ) : (
              // Hamburger icon when menu is closed
              <>
                <line x1='3' y1='12' x2='21' y2='12'></line>
                <line x1='3' y1='6' x2='21' y2='6'></line>
                <line x1='3' y1='18' x2='21' y2='18'></line>
              </>
            )}
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

        {/* Shopping Cart right aligned */}
        <div className='relative m-2 text-white'>
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

      {/* Backdrop overlay */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/50 md:hidden'
          onClick={closeMobileMenu}
          aria-hidden='true'
        />
      )}

      {/* Mobile menu overlay */}
      <div
        className={`fixed left-0 top-0 z-40 h-screen w-full bg-df-text transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button inside mobile menu */}
        <div className='absolute right-4 top-4 z-50'>
          <button
            onClick={closeMobileMenu}
            className='text-white transition-colors hover:text-dfNew2'
            aria-label='Close menu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
        </div>

        <div className='flex h-full flex-col justify-center px-8'>
          <ul className='flex flex-col gap-8 text-center'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className='text-3xl font-light text-white transition-colors hover:text-dfNew2 focus:text-dfNew2 focus:outline-none'
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
