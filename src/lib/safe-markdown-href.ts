/**
 * Returns a safe URL for markdown links, or null to render text without a link.
 * Allows http(s), mailto, tel, and same-site root-relative paths (no protocol-relative URLs).
 */
export const toSafeMarkdownHref = (href: string | undefined | null): string | null => {
  if (href === undefined || href === null) {
    return null;
  }
  const t = href.trim();
  if (t === "") {
    return null;
  }
  const lower = t.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:")) {
    return null;
  }
  if (/^https?:\/\//i.test(t)) {
    return t;
  }
  if (/^mailto:/i.test(t) || /^tel:/i.test(t)) {
    return t;
  }
  if (t.startsWith("/") && !t.startsWith("//")) {
    return t;
  }
  return null;
};
