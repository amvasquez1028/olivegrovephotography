import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Font stack examples",
  description:
    "Local preview of Inter, Georgia, and Monaco font stacks with fallbacks.",
  robots: { index: false, follow: false },
};

const SAMPLE =
  "The quick brown fox jumps over the lazy dog. 0123456789 — “Quotes” & accents: résumé naïve.";

const StackLabel = ({ children }: { children: string }) => (
  <h2 className="text-lg font-semibold tracking-tight text-ink">{children}</h2>
);

const StackCss = ({ css }: { css: string }) => (
  <p className="mt-2 font-mono text-xs leading-relaxed text-ink/70">
    <span className="text-ink/50">font-family: </span>
    {css}
  </p>
);

export default function FontExamplesPage() {
  const sansStack = `${inter.style.fontFamily}, Arial, Helvetica, sans-serif`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav aria-label="Back to site" className="mb-10 text-sm text-ink/70">
        <Link
          href="/"
          className="font-medium text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          Home
        </Link>
        <span className="text-ink/40" aria-hidden>
          {" · "}
        </span>
        <span className="text-ink/80">Font stack examples (local)</span>
      </nav>

      <h1 className="font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
        Font family examples
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">
        Three stacks as requested. Inter is loaded with{" "}
        <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">next/font</code>{" "}
        so the first stack renders Inter when available.
      </p>

      <ul className="mt-10 space-y-10">
        <li className="rounded-none border border-ink/12 bg-white/60 p-6 shadow-sm sm:p-8">
          <StackLabel>Sans-serif stack</StackLabel>
          <StackCss css="Inter, Arial, Helvetica, sans-serif;" />
          <p
            className="mt-5 text-2xl leading-relaxed text-ink sm:text-3xl"
            style={{ fontFamily: sansStack }}
          >
            {SAMPLE}
          </p>
        </li>

        <li className="rounded-none border border-ink/12 bg-white/60 p-6 shadow-sm sm:p-8">
          <StackLabel>Serif stack</StackLabel>
          <StackCss css="Georgia, Times New Roman, serif;" />
          <p
            className="mt-5 text-2xl leading-relaxed text-ink sm:text-3xl"
            style={{
              fontFamily: "Georgia, Times New Roman, serif",
            }}
          >
            {SAMPLE}
          </p>
        </li>

        <li className="rounded-none border border-ink/12 bg-white/60 p-6 shadow-sm sm:p-8">
          <StackLabel>Monospace stack</StackLabel>
          <StackCss css="Monaco, Courier New, monospace;" />
          <p
            className="mt-5 text-xl leading-relaxed text-ink sm:text-2xl"
            style={{
              fontFamily: "Monaco, Courier New, monospace",
            }}
          >
            {SAMPLE}
          </p>
        </li>
      </ul>
    </main>
  );
}
