import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function ThanksgivingServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Thanksgiving sessions are now listed under Holiday sessions."
      linkLabel="View pricing"
    />
  );
}
