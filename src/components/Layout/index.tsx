import type { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

export function Layout({ children }: ILayoutProps) {
  return (
    <div className="font-roboto flex flex-col min-h-screen w-full bg-bg text-content">
      <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
