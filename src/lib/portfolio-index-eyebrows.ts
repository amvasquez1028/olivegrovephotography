export const titleCaseWords = (value: string): string =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toLocaleUpperCase() + w.slice(1).toLocaleLowerCase())
    .join(" ");

/**
 * Two-line portfolio titles: all words except the last on line 1, last word on line 2
 * (e.g. "Headshot" / "Sessions"). Single-word titles use one visible line.
 */
export const splitPortfolioTitleLines = (
  title: string,
): { line1: string; line2: string } => {
  const tc = titleCaseWords(title);
  const words = tc.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return { line1: "", line2: "" };
  }
  if (words.length === 1) {
    return { line1: words[0]!, line2: "" };
  }
  return {
    line1: words.slice(0, -1).join(" "),
    line2: words[words.length - 1]!,
  };
};
