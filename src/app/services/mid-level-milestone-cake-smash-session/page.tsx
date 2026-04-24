import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function MidLevelMilestoneCakeSmashServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Mid-level milestone + cake smash sessions are now listed under Milestone sessions."
      linkLabel="View pricing"
    />
  );
}
