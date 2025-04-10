'use client';

import { Stripe } from 'stripe';
import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

export interface SessionProps {
  session: Session;
}

interface Session {
  id: string;
  amountTotal: number | null;
  address: Stripe.Address| null;
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
    <div className='container mx-auto py-20'>
      <h2 className='mb-4 text-3xl font-semibold text-df-text'>
        Thank you! Your Order Summary:
      </h2>
      <p className='text-lg text-df-text'>
        Order ID - keep this for your records:
        <span
          onClick={handleOrderIdClick}
          className='rounded-lg p-1 font-semibold text-df-text hover:cursor-pointer hover:bg-blue-300'
        >
          {session.id}
        </span>
      </p>
      {session.amountTotal && (
        <p className='text-lg text-df-text'>
          Total Amount: ${session.amountTotal / 100}
        </p>
      )}
      {session.address ? (
        <p className='mb-4 text-lg text-df-text'>
          Shipping Address: {formatAddress(session.address)}
        </p>
      ) : (
        <p>Shipping address not found!</p>
      )}
      <div>
        <h3 className='mb-2 text-2xl font-semibold text-df-text'>
          Your receipt
        </h3>
        {session.lineItems?.data.map((item) => (
          <div key={item.id}>
            <p className='text-lg text-df-text'>{item.description}</p>
            <p className='text-lg text-df-text'>Quantity: {item.quantity}</p>
            <p className='text-lg text-df-text'>
              Price: ${item.amount_total / 100}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
