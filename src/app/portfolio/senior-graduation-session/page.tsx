import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function SeniorGraduationPortfolioRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/portfolio/graduation-sessions"
      message="Graduation galleries are combined under Graduation sessions."
      linkLabel="Open Graduation sessions gallery"
    />
  );
}
