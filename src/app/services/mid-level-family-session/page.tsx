import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function MidLevelFamilyServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Mini, mid, and full family sessions are now one service."
      linkLabel="View pricing"
    />
  );
}
