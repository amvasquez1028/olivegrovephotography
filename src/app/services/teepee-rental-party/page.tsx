import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function TeepeeRentalPartyServiceRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/pricing"
      message="Teepee rental parties are now listed under Special sessions."
      linkLabel="View pricing"
    />
  );
}
