import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';

export function Button({ children, className, variant = 'primary', ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }>) {
  return (
    <button
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'bg-gold text-white shadow-soft hover:bg-[#a47d21]',
        variant === 'secondary' && 'bg-champagne/15 text-ink hover:bg-champagne/25',
        variant === 'ghost' && 'bg-transparent text-charcoal hover:bg-champagne/10',
        variant === 'outline' && 'border border-champagne/70 bg-white text-gold hover:bg-champagne/10',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
