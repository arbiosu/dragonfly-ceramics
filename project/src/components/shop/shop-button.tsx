import React from 'react';
import Link from 'next/link';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'tracking-[-0.04em] inline-flex items-center hover:text-white text-black bg-white hover:bg-white/10 justify-center rounded-3xl text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border-2 border-black hover:bg-dfNew2 hover:text-black',
      },
      size: {
        default: 'h-10 px-8 py-4',
        large: 'h-16 px-8 py-4 text-4xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    return (
      <Link href={href}>
        <button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </Link>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
