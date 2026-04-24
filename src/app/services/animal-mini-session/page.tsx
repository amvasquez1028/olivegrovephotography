import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function AnimalMiniServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Animal minis are now listed under Special sessions."
      linkLabel="View pricing"
    />
  );
}
