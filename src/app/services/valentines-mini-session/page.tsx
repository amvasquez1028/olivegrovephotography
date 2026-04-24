import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function ValentinesMiniServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Valentines minis are now listed under Holiday sessions."
      linkLabel="View pricing"
    />
  );
}
