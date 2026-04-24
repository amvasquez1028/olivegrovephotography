import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function ClassicSimpleMilestonePortfolioRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/portfolio/milestone-sessions"
      message="Milestone galleries are combined under Milestone sessions."
      linkLabel="Open Milestone sessions gallery"
    />
  );
}
