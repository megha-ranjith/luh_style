import type { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Header />
      <main className="px-4 py-6 md:px-8 xl:ml-64">
        <div className="mx-auto max-w-[1540px]">{children}</div>
      </main>
    </div>
  );
}
