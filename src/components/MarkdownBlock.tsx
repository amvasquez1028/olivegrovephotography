"use client";

import ReactMarkdown from "react-markdown";
import { toSafeMarkdownHref } from "@/lib/safe-markdown-href";

type MarkdownBlockProps = {
  content: string;
  className?: string;
};

export const MarkdownBlock = ({
  content,
  className = "text-ink/85",
}: MarkdownBlockProps) => {
  return (
    <div className={`markdown-block space-y-3 leading-relaxed ${className}`}>
      <ReactMarkdown
        urlTransform={(url) => toSafeMarkdownHref(url) ?? ""}
        components={{
          p: ({ children }) => (
            <p className="text-base leading-relaxed text-ink/85">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-ink">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-ink/90">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-inside list-disc space-y-2 pl-1 marker:text-sage-dark">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-inside list-decimal space-y-2 pl-1 marker:text-sage-dark">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-base text-ink/85">{children}</li>
          ),
          h1: ({ children }) => (
            <h4 className="font-display text-xl font-light text-ink">{children}</h4>
          ),
          h2: ({ children }) => (
            <h4 className="font-display text-lg font-light text-ink">{children}</h4>
          ),
          h3: ({ children }) => (
            <h4 className="font-display text-base font-semibold text-ink">
              {children}
            </h4>
          ),
          a: ({ href, children }) => {
            const safe = toSafeMarkdownHref(href);
            if (!safe) {
              return (
                <span className="font-medium text-ink/80">{children}</span>
              );
            }
            const isExternal = /^https?:\/\//i.test(safe);
            return (
              <a
                href={safe}
                className="font-medium text-sage-dark underline-offset-4 hover:underline"
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
