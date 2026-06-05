import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compactNumber(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(value > 9900 ? 0 : 1)}k`;
  return String(value);
}

export function nowLabel(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.max(1, Math.round(diff / 36e5));
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
