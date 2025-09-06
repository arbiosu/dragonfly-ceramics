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

  if (!mounted) {
    return <Loading />;
  }

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 p-4 text-black transition-all duration-300 ${
        isScrolled ? 'bg-white' : 'bg-transparent'
      }`}
    >
      <div className='flex items-center gap-2 tracking-[-0.04em] md:gap-6'>
        {navLinks.map((link, index) => (
          <div key={index}>
            <Link
              href={link.href}
              className='text-lg transition-colors hover:text-dfNew2 md:text-4xl'
            >
              {link.label}
            </Link>
          </div>
        ))}
        <div className='ml-auto'>
          <Link href='/shop/cart' aria-label='Shopping Cart' className='flex'>
            {cartCount > 0 && (
              <div className='flex h-8 w-8 items-center rounded-xl border border-black bg-white px-3 text-sm'>
                {cartCount}
              </div>
            )}
            <svg
              viewBox='0 0 48 60'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
            >
              <path
                d='M42 12H36C36 5.37 30.63 0 24 0C17.37 0 12 5.37 12 12H6C2.7 12 0 14.7 0 18V54C0 57.3 2.7 60 6 60H42C45.3 60 48 57.3 48 54V18C48 14.7 45.3 12 42 12ZM24 6C27.3 6 30 8.7 30 12H18C18 8.7 20.7 6 24 6ZM42 54H6V18H12V24C12 25.65 13.35 27 15 27C16.65 27 18 25.65 18 24V18H30V24C30 25.65 31.35 27 33 27C34.65 27 36 25.65 36 24V18H42V54Z'
                fill='black'
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
