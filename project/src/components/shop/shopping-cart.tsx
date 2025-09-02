'use client';

import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CartItemCard from '@/components/shop/cart-item';
import Loading from '@/components/loading';
import { Button } from './shop-button';

export default function ShoppingCart() {
  const { cartItems, cartTotal } = useCart();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  if (cartTotal < 1) {
    return (
      <main className='p-8'>
        <h1 className='text-center text-4xl tracking-[-0.069em] text-black md:text-6xl lg:text-9xl'>
          your cart is empty. oh no!
        </h1>
        <div className='mt-8 flex justify-center'>
          <Button variant='outline' href='/shop'>
            shop
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className='container mx-auto max-w-4xl flex-grow px-4 py-8 text-black'>
      <h1 className='mb-8 text-4xl tracking-[-0.069em] md:text-6xl lg:text-9xl'>
        your cart
      </h1>
      {cartItems.map((item, index) => (
        <CartItemCard
          product={item.product}
          quantity={item.quantity}
          key={index}
        />
      ))}
      <div className='flex justify-end gap-8'>
        <p className='mb-8 text-right text-xl font-extralight tracking-[-0.069em] md:text-2xl'>
          subtotal:
        </p>
        <p className='mb-8 text-right text-xl font-medium tracking-[-0.069em] md:text-2xl'>
          {cartTotal}.00
        </p>
      </div>
      <div className='flex justify-end'>
        <Link href='/shop/cart/shipping'>
          <button className='w-full rounded-3xl border border-black bg-df-yellow px-4 py-2 text-xl transition-colors duration-200 hover:bg-dfNew hover:text-white'>
            checkout
          </button>
        </Link>
      </div>
    </main>
  );
}
