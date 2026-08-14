import React from 'react';
import { cn } from '../../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-[#D71920] text-white hover:bg-red-700 active:bg-red-800 border-2 border-[#D71920]',
      secondary: 'bg-[#FFD400] text-black hover:bg-yellow-500 active:bg-yellow-600 border-2 border-black',
      outline: 'bg-white border-2 border-black text-black hover:bg-gray-100 active:bg-gray-200',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm font-bold uppercase tracking-widest',
      md: 'px-4 py-3 text-sm font-bold uppercase tracking-widest',
      lg: 'px-6 py-4 text-base font-bold uppercase tracking-widest'
    };

    return (
      <button
        ref={ref}
        className={cn(
          'rounded-xl transition-colors min-h-[44px] inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
