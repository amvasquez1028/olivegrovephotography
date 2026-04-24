import type { Metadata } from "next";
import { ContactPageClient } from "@/app/contact/ContactPageClient";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE_NAME} for availability and custom quotes.`,
};

export default function ContactPage() {
  return <ContactPageClient />;
}
