'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/lib/stripe/utils';

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { cartItems } = useCart();

  const handleCheckout = async (cartItems: CartItem[]) => {
    setIsLoading(true);
    try {
      const res = await fetch('/shop/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cartItems }),
      });

      if (!res.ok) {
        setError('There was an error during checkout. Please try again later.');
        throw new Error(`Failed to create checkout session: ${res.status}`);
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      setError('There was an error during checkout. Please try again later.');
      console.error('Checkout Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className='w-full rounded-md bg-dfNew2 px-4 py-2 text-xl text-df-text transition-colors duration-200 hover:bg-dfNew hover:text-white'
        onClick={() => handleCheckout(cartItems)}
        disabled={isLoading}
      >
        Checkout
      </button>
      {error && <div className='mt-3 text-sm text-red-600'>{error}</div>}
    </div>
  );
}
