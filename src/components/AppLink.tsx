import type { AnchorHTMLAttributes, ReactNode } from "react";

export type AppLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: string;
  children: ReactNode;
};

/**
 * Internal navigation via a real anchor. For `output: "export"` this avoids
 * App Router soft navigations that can drop the first interaction when client
 * state updates run in the same turn as the click.
 */
export const AppLink = ({
  href,
  children,
  ...rest
}: AppLinkProps) => (
  <a href={href} {...rest}>
    {children}
  </a>
);
