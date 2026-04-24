import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function BluebonnetServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Bluebonnet sessions are now listed under Seasonal sessions."
      linkLabel="View pricing"
    />
  );
}
