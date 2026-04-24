import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function GraduationMiniPortfolioRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/portfolio/graduation-sessions"
      message="Graduation galleries are combined under Graduation sessions."
      linkLabel="Open Graduation sessions gallery"
    />
  );
}
