import { Fragment } from "react";

/** Renders `*single*` and `**double**` segments as italic emphasis. */
export const formatBulletEmphasis = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part === "") {
      return null;
    }
    const doubleStar = /^\*\*(.+)\*\*$/.exec(part);
    if (doubleStar) {
      return (
        <em key={i} className="italic">
          {doubleStar[1]}
        </em>
      );
    }
    const singleStar = /^\*([^*]+)\*$/.exec(part);
    if (singleStar) {
      return (
        <em key={i} className="italic">
          {singleStar[1]}
        </em>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
};
