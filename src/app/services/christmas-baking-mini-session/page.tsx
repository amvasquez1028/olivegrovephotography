import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function ChristmasBakingMiniServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Christmas baking minis are now listed under Holiday sessions."
      linkLabel="View pricing"
    />
  );
}
