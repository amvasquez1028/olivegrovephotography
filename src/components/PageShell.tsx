import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export const PageShell = ({ children, className = "" }: PageShellProps) => {
  return (
    <div
      className={`page-shell-outer mx-auto w-full max-w-6xl rounded-none px-4 py-12 sm:px-6 sm:py-16 ${className}`}
    >
      {children}
    </div>
  );
};
