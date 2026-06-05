import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn('rounded-lg border border-line/70 bg-pearl shadow-soft', className)}>{children}</section>;
}
