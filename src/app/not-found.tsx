import { AppLink } from "@/components/AppLink";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <h1 className="font-display text-5xl font-light tracking-tight text-ink">
        Page not found
      </h1>
      <p className="mt-4 max-w-lg text-lg text-ink/80">
        That link may have moved. Try the navigation above or head back home.
      </p>
      <AppLink
        href="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-none bg-sage px-5 text-sm font-semibold tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-dark"
      >
        Back to home
      </AppLink>
    </PageShell>
  );
}
