import type { ReactNode } from "react";

interface IBodyProps {
  children: ReactNode;
}

export function Body({ children }: IBodyProps) {
  return (
    <main className="flex-1 flex p-4 max-w-7xl mx-auto drop-shadow-md">
      {children}
    </main>
  );
}
