'use client';

import { Stripe } from 'stripe';
import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from './shop-button';

export interface SessionProps {
  session: Session;
}

interface Session {
  id: string;
  amountTotal: number | null;
  address: Stripe.Address | null;
  lineItems: Stripe.ApiList<Stripe.LineItem> | undefined;
  email: string;
}

export default function OrderSummary({ session }: SessionProps) {
  const formatAddress = (address: Stripe.Address) => {
    const { line1, line2, city, state, postal_code, country } = address;
    const formattedAddress = [line1, line2, city, state, postal_code, country]
      .filter(Boolean)
      .join(', ');
    return formattedAddress || 'N/A';
  };

  const handleOrderIdClick = () => {
    navigator.clipboard.writeText(session.id);
  };

  const { purgeCart } = useCart();

  useEffect(() => {
    purgeCart();
  }, [purgeCart]);

  return (
    <div className='container mx-auto py-20 text-black'>
      <h2 className='mb-4 text-3xl'>thank you for your order</h2>
      <Button
        href={'/shop'}
        variant={'outline'}
        size={'large'}
        className='transition-all duration-300 hover:scale-105 hover:shadow-2xl'
      >
        <span className='relative z-10 text-2xl'>shop</span>
      </Button>

      <p className='text-lg'>
        Order ID - keep this for your records:
        <span
          onClick={handleOrderIdClick}
          className='rounded-lg p-1 font-semibold hover:cursor-pointer hover:bg-blue-300'
        >
          {session.id}
        </span>
      </p>

      {session.address ? (
        <p className='mb-4 text-lg'>
          Shipping Address: {formatAddress(session.address)}
        </p>
      ) : (
        <p>Shipping address not found!</p>
      )}
      <div className='flex justify-center'>
        <h3 className='mb-2 text-2xl'>order summary</h3>
        {session.lineItems?.data.map((item) => (
          <div key={item.id}>
            <p className='text-lg'>{item.description}</p>
            <p className='text-lg'>Quantity: {item.quantity}</p>
            <p className='text-lg'>Price: ${item.amount_total / 100}</p>
          </div>
        ))}
        {session.amountTotal && (
          <p className='text-lg'>Total Amount: ${session.amountTotal / 100}</p>
        )}
      </div>
    </div>
  );
}
