"use client";

import { BookButton } from "@/components/BookButton";
import { ClientDocumentSeo } from "@/components/ClientDocumentSeo";
import { PageShell } from "@/components/PageShell";
import { useSiteUi } from "@/context/SiteUiContext";
import {
  documentTitleForContact,
  metaDescriptionForContact,
} from "@/lib/site-seo";

export const ContactPageBody = () => {
  const { ui } = useSiteUi();

  return (
    <PageShell>
      <ClientDocumentSeo
        title={documentTitleForContact(ui)}
        description={metaDescriptionForContact(ui)}
      />
      {ui.contactEyebrow.trim() ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink">
          {ui.contactEyebrow}
        </p>
      ) : null}
      <h1
        className={`font-display text-5xl font-light tracking-tight text-ink sm:text-6xl ${ui.contactEyebrow.trim() ? "mt-3" : ""}`}
      >
        {ui.contactHeading}
      </h1>
      <p className="mt-4 max-w-2xl whitespace-pre-wrap text-lg leading-relaxed text-ink/85">
        {ui.contactIntro}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section
          aria-labelledby="contact-methods"
          className="rounded-none border border-ink/12 bg-cream-dark/50 p-6 sm:p-8"
        >
          <h2
            id="contact-methods"
            className="text-xl font-semibold text-ink"
          >
            {ui.contactReachHeading}
          </h2>
          <ul className="mt-6 space-y-5 text-ink/85">
            <li>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink">
                Phone
              </p>
              <a
                href={ui.contactPhoneTel}
                className="mt-1 inline-block text-lg font-medium text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                {ui.contactPhoneDisplay}
              </a>
            </li>
            <li>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink">
                Email
              </p>
              <a
                href={`mailto:${ui.contactEmail}`}
                className="mt-1 inline-block text-lg font-medium text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                {ui.contactEmail}
              </a>
            </li>
            <li>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink">
                Book online
              </p>
              <p className="mt-1 text-sm leading-relaxed">
                Prefer to self-schedule? Use the secure booking link below.
              </p>
              <div className="mt-3">
                <BookButton />
              </div>
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="social-heading"
          className="rounded-none border border-ink/12 bg-white/40 p-6 sm:p-8"
        >
          <h2
            id="social-heading"
            className="text-xl font-semibold text-ink"
          >
            {ui.contactSocialHeading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/80">
            {ui.contactSocialBlurb}
          </p>
          <ul className="mt-6 space-y-3">
            {ui.contactSocialLinks.map((s) => (
              <li key={`${s.label}-${s.href}`}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel?.trim() ? s.ariaLabel : s.label}
                  className="inline-flex min-h-11 items-center text-base font-medium text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
};
