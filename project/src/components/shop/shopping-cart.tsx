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
      <section className='relative min-h-screen bg-df-yellow'>
        <div className='absolute left-0 top-0 w-full rotate-180 overflow-hidden leading-[0]'>
          <svg
            data-name='Layer 2'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            className='relative block h-[500px] w-[calc(156%+1.3px)] [transform:rotateY(180deg)]'
          >
            <path
              d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
              className='fill-white'
            ></path>
          </svg>
        </div>
        <section className='relative z-10 flex min-h-screen flex-col items-center justify-center'>
          <h1 className='text-center text-5xl tracking-[-0.04em] text-black md:text-9xl'>
            your cart is empty. <br></br>oh no!
          </h1>
          <div className='mt-8 flex justify-center'>
            <Button variant='outline' href='/shop'>
              shop
            </Button>
          </div>
        </section>
      </section>
    );
  }

  return (
    <main className='container mx-auto mb-20 max-w-full flex-grow px-8 pt-20 text-black'>
      <h1 className='mb-16 text-6xl tracking-[-0.04em] lg:text-9xl'>
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
        <p className='mb-8 text-right text-xl font-extralight tracking-[-0.04em] md:text-2xl'>
          subtotal:
        </p>
        <p className='mb-8 text-right text-xl font-medium tracking-[-0.04em] md:text-2xl'>
          ${cartTotal}.00
        </p>
      </div>
      <div className='flex justify-end'>
        <Link href='/shop/cart/shipping'>
          <button className='w-full rounded-3xl border border-black bg-df-yellow px-4 py-2 text-xl transition-colors duration-200 hover:bg-dfNew2'>
            checkout
          </button>
        </Link>
      </div>
    </main>
  );
}
