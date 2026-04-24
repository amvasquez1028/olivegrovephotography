import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function NewbornFullServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Mini, mid, and full newborn sessions are now one service."
      linkLabel="View pricing"
    />
  );
}
