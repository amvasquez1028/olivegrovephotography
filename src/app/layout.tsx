import type { Metadata } from "next";
import { PublicSiteRoot } from "@/components/PublicSiteRoot";
import { DefaultFaviconCleanup } from "@/components/DefaultFaviconCleanup";
import { SITE_LOGO_SRC, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  metadataBase: new URL("https://olivegrovephotography.com"),
  icons: {
    icon: SITE_LOGO_SRC,
    apple: SITE_LOGO_SRC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-ink antialiased">
        <DefaultFaviconCleanup />
        <PublicSiteRoot>{children}</PublicSiteRoot>
      </body>
    </html>
  );
}
