import type { Metadata } from "next";
import { PricingPageClient } from "@/app/pricing/PricingPageClient";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Session pricing and what to expect for portrait packages from ${SITE_NAME}.`,
};

export default function PricingPage() {
  return <PricingPageClient />;
}
