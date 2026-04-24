import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function ClassicSimpleMilestoneServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Classic simple milestone sessions are now listed under Milestone sessions."
      linkLabel="View pricing"
    />
  );
}
