import type { ReactNode } from "react";

interface IPageProps {
  title?: string;
  children: ReactNode;
}

export function Page(props: IPageProps) {
  return (
    <div className="max-w-6xl mx-auto text-center md:text-left">
      <h1 className="text-4xl md:text-4xl font-extrabold  tracking-tight">
        {props.title}
      </h1>
      <div className="h-1 w-24 my-4 mx-auto bg-primary-dark md:mx-0 rounded-full" />
      <div className="mx-auto max-w-6xl space-y-6 px-4 pb-24">
        {props.children}
      </div>
    </div>
  );
}
