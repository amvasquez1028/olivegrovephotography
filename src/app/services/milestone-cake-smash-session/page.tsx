import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function MilestoneCakeSmashServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Milestone + cake smash sessions are now listed under Milestone sessions."
      linkLabel="View pricing"
    />
  );
}
