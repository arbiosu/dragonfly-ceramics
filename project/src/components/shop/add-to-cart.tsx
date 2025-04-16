'use client';

import { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useCart } from '@/contexts/CartContext';
import { Tables } from '@/lib/supabase/database';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'rounded-md bg-dfNew2 px-2 py-1 md:px-4 md:py-2 text-sm md:text-base text-df-text transition-colors hover:bg-dfNew hover:text-white',
  {
    variants: {
      variant: {
        default: 'w-full',
        hidden: 'w-full hidden group-hover:block',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  label: string;
  product: Tables<'products'>;
  quantity: number;
}

export default function AddToCartButton({
  label,
  product,
  quantity,
  variant,
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
    <button
      className={cn(buttonVariants({ variant }))}
      onClick={handleAddToCart}
      disabled={!product.active}
    >
      {clicked ? 'added to cart!' : product.active ? label : 'sold out!'}
    </button>
  );
}
