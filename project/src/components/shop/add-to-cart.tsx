'use client';

import { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useCart } from '@/contexts/CartContext';
import { Tables } from '@/lib/supabase/database';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'text-black w-full rounded-3xl border border-black bg-df-yellow px-4 py-2 text-xl transition-colors duration-200 hover:bg-dfNew2',
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
