import type { Metadata } from "next";
import { ServicesIndexRedirectClient } from "@/app/services/ServicesIndexRedirectClient";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Pricing | ${SITE_NAME}`,
  description: "Redirecting to session pricing.",
};

export default function ServicesIndexPage() {
  return <ServicesIndexRedirectClient />;
}
