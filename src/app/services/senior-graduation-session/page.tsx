import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function SeniorGraduationServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Senior + graduation sessions are now listed under Graduation sessions."
      linkLabel="View pricing"
    />
  );
}
