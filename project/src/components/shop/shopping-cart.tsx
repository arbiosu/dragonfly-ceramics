'use client';

import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CartItemCard from '@/components/shop/cart-item';
import Loading from '@/components/loading';

export default function ShoppingCart() {
  const { cartItems, cartTotal } = useCart();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  return (
    <main className='container mx-auto max-w-4xl flex-grow px-4 py-8'>
      <h1 className='mb-8 text-3xl text-df-text'>my cart</h1>
      {cartItems.map((item, index) => (
        <CartItemCard
          product={item.product}
          quantity={item.quantity}
          key={index}
        />
      ))}
      <div>
        <h3 className='mb-8 text-xl text-df-text'>
          estimated subtotal: ${cartTotal}
        </h3>
      </div>
      <Link href='/shop/cart/shipping'>
        <button className='w-full rounded-md bg-dfNew2 px-4 py-2 text-xl text-df-text transition-colors duration-200 hover:bg-dfNew hover:text-white'>
          checkout
        </button>
      </Link>
    </main>
  );
}
