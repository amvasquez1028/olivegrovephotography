import type { SessionWhatToExpect } from "@/lib/site";

/**
 * Serializes structured “what to expect” copy into Markdown so admin textareas
 * can show the same content the site uses when no Markdown override is saved.
 */
export const whatToExpectStructuredToMarkdown = (
  w: SessionWhatToExpect,
): string => {
  const blocks: string[] = [];
  const preamble = w.preambleLines.map((l) => l.trim()).filter(Boolean);
  if (preamble.length > 0) {
    blocks.push(preamble.join("\n\n"));
  }
  const bullets = w.bullets.map((b) => b.trim()).filter(Boolean);
  if (bullets.length > 0) {
    blocks.push(bullets.map((b) => `- ${b}`).join("\n"));
  }
  if (w.footnote?.trim()) {
    blocks.push(`*${w.footnote.trim()}*`);
  }
  return blocks.join("\n\n");
};
