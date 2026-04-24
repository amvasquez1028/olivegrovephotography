import type { Metadata } from "next";
import { PortfolioPageClient } from "@/app/portfolio/PortfolioPageClient";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Browse galleries by sessions from ${SITE_NAME}.`,
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
