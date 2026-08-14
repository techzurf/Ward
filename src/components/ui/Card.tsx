import React from 'react';
import { cn } from '../../utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  children?: React.ReactNode;
}

export function Card({ className, noPadding, children, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-[#FFFFFF] rounded-2xl shadow-lg border-4 border-[#000000] overflow-hidden relative",
        !noPadding && "p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'red' | 'yellow' | 'black' | 'gray' | 'success';
  children?: React.ReactNode;
}

export function Badge({ className, variant = 'gray', children, ...props }: BadgeProps) {
  const variants = {
    red: 'bg-[#D71920] text-white border border-[#D71920]',
    yellow: 'bg-[#FFD400] text-black border border-[#FFD400]',
    black: 'bg-[#000000] text-white border border-[#000000]',
    gray: 'bg-gray-200 text-black border border-gray-300',
    success: 'bg-black text-white border border-black'
  };

  return (
    <span 
      className={cn(
        "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest inline-flex items-center",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
