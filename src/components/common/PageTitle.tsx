import type { ReactNode } from 'react';

export function PageTitle({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-serif text-3xl text-ink">{title}</h2>
        <p className="mt-1 text-sm text-charcoal/70">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
