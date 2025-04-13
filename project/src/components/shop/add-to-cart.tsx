'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { type Product } from '@/lib/stripe/utils';

interface ButtonProps {
  label: string;
  product: Product;
  quantity: number;
}

const buttonClass =
  'w-full rounded-md bg-dfNew2 px-4 py-2 text-df-text transition-colors hover:bg-dfNew hover:text-white';

export default function AddToCartButton({
  label,
  product,
  quantity,
}: ButtonProps) {
  const [clicked, setClicked] = useState<boolean>(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setClicked(true);
    try {
      addToCart(product, quantity);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error);
    } finally {
      setClicked(false);
    }
  };

  return (
    <button className={buttonClass} onClick={handleAddToCart}>
      {clicked
        ? 'added to cart!'
        : product.active
          ? label
          : 'sold out!'}
    </button>
  );
}
