import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function GraduationMiniServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Graduation mini sessions are now listed under Graduation sessions."
      linkLabel="View pricing"
    />
  );
}
