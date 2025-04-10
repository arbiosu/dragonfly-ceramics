'use client';

import ShoppingCart from '@/components/shop/shopping-cart';
import { Form } from '@/components/shop/shipping-calculator';

export default function MyCart() {
  return (
    <section className='flex justify-center py-20'>
      <div className='w-full max-w-4xl px-4'>
        <ShoppingCart />
      </div>
      <Form />
    </section>
  );
}
