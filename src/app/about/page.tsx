import type { Metadata } from "next";
import { AboutPageClient } from "@/app/about/AboutPageClient";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About me",
  description: `Meet Chelsea — lifestyle and family portrait photographer in Waco, TX, behind ${SITE_NAME}.`,
};

export default function AboutPage() {
  return <AboutPageClient />;
}
