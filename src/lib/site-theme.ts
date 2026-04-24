/** Preset IDs + custom entries saved in `SiteUiPayload` / `MergedSiteUi`; applied as CSS variables on `html`. */

export const DEFAULT_SITE_THEME_FONT_ID = "classic";
export const DEFAULT_SITE_THEME_COLOR_ID = "olive";

export const SITE_THEME_FONT_OPTIONS = [
  {
    id: "classic",
    label: "Classic — Georgia body, Courier headings",
  },
  {
    id: "elegant",
    label: "Elegant — Charter / Palatino body, Baskerville headings",
  },
  {
    id: "modern",
    label: "Modern — system UI sans (clean)",
  },
  {
    id: "warm",
    label: "Warm — Palatino body, Lucida-style headings",
  },
] as const;

export const SITE_THEME_COLOR_OPTIONS = [
  {
    id: "olive",
    label: "Olive Grove — sage greens & warm neutrals (default)",
  },
  {
    id: "ocean",
    label: "Ocean — cool teal, soft blue-gray cream",
  },
  {
    id: "terracotta",
    label: "Terracotta — clay accent, warm cream",
  },
  {
    id: "slate",
    label: "Slate — stone neutrals, muted sage",
  },
] as const;

export type SiteThemeFontId = (typeof SITE_THEME_FONT_OPTIONS)[number]["id"];
export type SiteThemeColorId = (typeof SITE_THEME_COLOR_OPTIONS)[number]["id"];

/** Admin-defined font style (saved + listed next to built-ins). */
export type SiteThemeCustomFontEntry = {
  id: string;
  label: string;
  /** Optional WOFF/WOFF2 URL — pair with `sansFontFamily` for @font-face. */
  sansFontUrl?: string;
  /** CSS `font-family` name matching @font-face (e.g. `MyBodyFont`). */
  sansFontFamily?: string;
  displayFontUrl?: string;
  displayFontFamily?: string;
  /** When files are omitted, use these stacks (comma-separated CSS). */
  sansStack?: string;
  displayStack?: string;
  scriptStack?: string;
};

/** Admin-defined color style (four hex fields + label). */
export type SiteThemeCustomColorEntry = {
  id: string;
  label: string;
  backgroundHex: string;
  fontHex: string;
  buttonBackgroundHex: string;
  buttonFontHex: string;
};

const FONT_PRESETS: Record<
  SiteThemeFontId,
  { sans: string; display: string; script: string }
> = {
  classic: {
    sans: `Georgia, "Times New Roman", Times, serif`,
    display: `"Courier New", Courier, monospace`,
    script: `"Courier New", Courier, monospace`,
  },
  elegant: {
    sans: `Charter, "Bitstream Charter", "Sitka Text", Cambria, serif`,
    display: `Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, serif`,
    script: `Baskerville, "Baskerville Old Face", Garamond, serif`,
  },
  modern: {
    sans: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
    display: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    script: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  },
  warm: {
    sans: `Palatino, "Palatino Linotype", "Book Antiqua", Georgia, serif`,
    display: `"Lucida Sans Unicode", "Lucida Grande", "Trebuchet MS", sans-serif`,
    script: `"Lucida Sans Unicode", "Lucida Grande", sans-serif`,
  },
};

type ColorSet = {
  cream: string;
  creamDark: string;
  gold: string;
  goldDark: string;
  sage: string;
  sageDark: string;
  ink: string;
};

const COLOR_PRESETS: Record<SiteThemeColorId, ColorSet> = {
  olive: {
    cream: "#ffffff",
    creamDark: "#ffffff",
    gold: "#b8956e",
    goldDark: "#9a7a52",
    sage: "#8faa86",
    sageDark: "#5c7557",
    ink: "#0a0a0a",
  },
  ocean: {
    cream: "#f3f8fa",
    creamDark: "#e8f2f5",
    gold: "#6a9fb0",
    goldDark: "#4a7f90",
    sage: "#7ab8b0",
    sageDark: "#3d7a72",
    ink: "#0c1c22",
  },
  terracotta: {
    cream: "#fdf8f3",
    creamDark: "#f5ebe3",
    gold: "#b88962",
    goldDark: "#8f6845",
    sage: "#c4725c",
    sageDark: "#8b4a3a",
    ink: "#2b1810",
  },
  slate: {
    cream: "#f5f5f4",
    creamDark: "#e7e5e4",
    gold: "#a8a29e",
    goldDark: "#78716c",
    sage: "#78716c",
    sageDark: "#57534e",
    ink: "#1c1917",
  },
};

const BUILTIN_FONT_IDS = new Set<string>(
  SITE_THEME_FONT_OPTIONS.map((o) => o.id),
);
const BUILTIN_COLOR_IDS = new Set<string>(
  SITE_THEME_COLOR_OPTIONS.map((o) => o.id),
);

export const isBuiltinSiteThemeFontId = (id: string): boolean =>
  BUILTIN_FONT_IDS.has(id);

export const isBuiltinSiteThemeColorId = (id: string): boolean =>
  BUILTIN_COLOR_IDS.has(id);

export const normalizeHexColor = (raw: string, fallback: string): string => {
  const t = raw.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{6}$/.test(t)) {
    return `#${t.toLowerCase()}`;
  }
  if (/^[0-9a-fA-F]{3}$/.test(t)) {
    const e = t
      .split("")
      .map((c) => c + c)
      .join("");
    return `#${e.toLowerCase()}`;
  }
  const fb = fallback.replace(/^#/, "");
  if (/^[0-9a-fA-F]{6}$/i.test(fb)) {
    return `#${fb.toLowerCase()}`;
  }
  return "#ffffff";
};

const clamp255 = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

const darkenHex = (hex: string, ratio = 0.18): string => {
  const h = normalizeHexColor(hex, "#000000").slice(1);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const dr = clamp255(r * (1 - ratio));
  const dg = clamp255(g * (1 - ratio));
  const db = clamp255(b * (1 - ratio));
  const to = (x: number) => x.toString(16).padStart(2, "0");
  return `#${to(dr)}${to(dg)}${to(db)}`;
};

const fontFormatFromUrl = (url: string): string => {
  const u = url.toLowerCase();
  if (u.endsWith(".woff2")) {
    return "woff2";
  }
  if (u.endsWith(".woff")) {
    return "woff";
  }
  if (u.endsWith(".ttf")) {
    return "truetype";
  }
  if (u.endsWith(".otf")) {
    return "opentype";
  }
  return "woff2";
};

export const buildSiteThemeFontFaceCss = (
  fonts: readonly SiteThemeCustomFontEntry[],
): string | null => {
  const blocks: string[] = [];
  for (const f of fonts) {
    if (f.sansFontUrl?.trim() && f.sansFontFamily?.trim()) {
      const fam = f.sansFontFamily.trim().replace(/[^a-zA-Z0-9-_ ]/g, "");
      if (fam) {
        blocks.push(
          `@font-face{font-family:'${fam}';src:url('${f.sansFontUrl.trim().replace(/'/g, "%27")}') format('${fontFormatFromUrl(f.sansFontUrl)}');font-display:swap;}`,
        );
      }
    }
    if (f.displayFontUrl?.trim() && f.displayFontFamily?.trim()) {
      const fam = f.displayFontFamily.trim().replace(/[^a-zA-Z0-9-_ ]/g, "");
      if (fam) {
        blocks.push(
          `@font-face{font-family:'${fam}';src:url('${f.displayFontUrl.trim().replace(/'/g, "%27")}') format('${fontFormatFromUrl(f.displayFontUrl)}');font-display:swap;}`,
        );
      }
    }
  }
  return blocks.length > 0 ? blocks.join("") : null;
};

const fallbackSans = FONT_PRESETS.classic.sans;
const fallbackDisplay = FONT_PRESETS.classic.display;

const resolveCustomFontStacks = (
  entry: SiteThemeCustomFontEntry,
): { sans: string; display: string; script: string } => {
  const sans =
    entry.sansStack?.trim() ||
    (entry.sansFontUrl?.trim() && entry.sansFontFamily?.trim()
      ? `'${entry.sansFontFamily.trim()}', ${fallbackSans}`
      : fallbackSans);

  const display =
    entry.displayStack?.trim() ||
    (entry.displayFontUrl?.trim() && entry.displayFontFamily?.trim()
      ? `'${entry.displayFontFamily.trim()}', ${fallbackDisplay}`
      : sans);

  const script = entry.scriptStack?.trim() || display;

  return { sans, display, script };
};

const resolveBuiltinOrCustomFont = (
  preset: string,
  customs: readonly SiteThemeCustomFontEntry[],
): { sans: string; display: string; script: string } => {
  if (BUILTIN_FONT_IDS.has(preset)) {
    return FONT_PRESETS[preset as SiteThemeFontId];
  }
  const custom = customs.find((c) => c.id === preset);
  if (custom) {
    return resolveCustomFontStacks(custom);
  }
  return FONT_PRESETS.classic;
};

const resolveBuiltinOrCustomColorCss = (
  preset: string,
  customs: readonly SiteThemeCustomColorEntry[],
): Record<string, string> => {
  if (BUILTIN_COLOR_IDS.has(preset)) {
    const c = COLOR_PRESETS[preset as SiteThemeColorId];
    return {
      "--cream": c.cream,
      "--cream-dark": c.creamDark,
      "--gold": c.gold,
      "--gold-dark": c.goldDark,
      "--sage": c.sage,
      "--sage-dark": c.sageDark,
      "--ink": c.ink,
      "--background": c.cream,
      "--foreground": c.ink,
      "--og-button-fg": "#ffffff",
    };
  }
  const x = customs.find((c) => c.id === preset);
  if (x) {
    const bg = normalizeHexColor(x.backgroundHex, "#ffffff");
    const fg = normalizeHexColor(x.fontHex, "#0a0a0a");
    const btn = normalizeHexColor(x.buttonBackgroundHex, "#8faa86");
    const btnFg = normalizeHexColor(x.buttonFontHex, "#ffffff");
    const creamDark = darkenHex(bg, 0.06);
    return {
      "--cream": bg,
      "--cream-dark": creamDark,
      "--gold": fg,
      "--gold-dark": darkenHex(fg, 0.15),
      "--sage": btn,
      "--sage-dark": darkenHex(btn, 0.18),
      "--ink": fg,
      "--background": bg,
      "--foreground": fg,
      "--og-button-fg": btnFg,
    };
  }
  return resolveBuiltinOrCustomColorCss(DEFAULT_SITE_THEME_COLOR_ID, []);
};

/** Keeps `preset` if it is built-in or matches a saved custom row; otherwise falls back. */
export const normalizeSiteThemeFontPreset = (
  preset: string | undefined,
  customs: readonly SiteThemeCustomFontEntry[],
): string => {
  const t = preset?.trim() || DEFAULT_SITE_THEME_FONT_ID;
  if (BUILTIN_FONT_IDS.has(t)) {
    return t;
  }
  if (customs.some((c) => c.id === t)) {
    return t;
  }
  return DEFAULT_SITE_THEME_FONT_ID;
};

export const normalizeSiteThemeColorPreset = (
  preset: string | undefined,
  customs: readonly SiteThemeCustomColorEntry[],
): string => {
  const t = preset?.trim() || DEFAULT_SITE_THEME_COLOR_ID;
  if (BUILTIN_COLOR_IDS.has(t)) {
    return t;
  }
  if (customs.some((c) => c.id === t)) {
    return t;
  }
  return DEFAULT_SITE_THEME_COLOR_ID;
};

export type SiteThemeResolutionInput = {
  siteThemeFontPreset: string;
  siteThemeColorPreset: string;
  siteThemeCustomFonts: readonly SiteThemeCustomFontEntry[];
  siteThemeCustomColors: readonly SiteThemeCustomColorEntry[];
};

export type ResolvedSiteTheme = {
  cssVars: Record<string, string>;
  bodyFont: string;
  displayFont: string;
  scriptFont: string;
  fontFaceCss: string | null;
};

export const getResolvedSiteTheme = (
  ui: SiteThemeResolutionInput,
): ResolvedSiteTheme => {
  const fontPreset = normalizeSiteThemeFontPreset(
    ui.siteThemeFontPreset,
    ui.siteThemeCustomFonts,
  );
  const colorPreset = normalizeSiteThemeColorPreset(
    ui.siteThemeColorPreset,
    ui.siteThemeCustomColors,
  );
  const fonts = resolveBuiltinOrCustomFont(fontPreset, ui.siteThemeCustomFonts);
  const colors = resolveBuiltinOrCustomColorCss(
    colorPreset,
    ui.siteThemeCustomColors,
  );
  const cssVars: Record<string, string> = {
    "--og-font-sans": fonts.sans,
    "--og-font-display": fonts.display,
    "--og-font-script": fonts.script,
    ...colors,
  };
  const fontFaceCss = buildSiteThemeFontFaceCss(ui.siteThemeCustomFonts);
  return {
    cssVars,
    bodyFont: fonts.sans,
    displayFont: fonts.display,
    scriptFont: fonts.script,
    fontFaceCss,
  };
};

const THEME_VAR_KEYS = [
  "--og-font-sans",
  "--og-font-display",
  "--og-font-script",
  "--cream",
  "--cream-dark",
  "--gold",
  "--gold-dark",
  "--sage",
  "--sage-dark",
  "--ink",
  "--background",
  "--foreground",
  "--og-button-fg",
] as const;

const STYLE_TAG_ID = "og-site-theme-font-faces";

export const applySiteThemeFromResolution = (resolved: ResolvedSiteTheme): void => {
  if (typeof document === "undefined") {
    return;
  }
  const root = document.documentElement;
  for (const key of THEME_VAR_KEYS) {
    root.style.setProperty(key, resolved.cssVars[key] ?? "");
  }
  let styleEl = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null;
  if (resolved.fontFaceCss) {
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_TAG_ID;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = resolved.fontFaceCss;
  } else if (styleEl) {
    styleEl.remove();
  }
};

export const applySiteThemeFromMergedFields = (
  ui: SiteThemeResolutionInput,
): void => {
  applySiteThemeFromResolution(getResolvedSiteTheme(ui));
};

/** @deprecated Use `getResolvedSiteTheme` — kept for any external callers. */
export const getSiteThemeCssVariables = (
  fontId: string | undefined,
  colorId: string | undefined,
): Record<string, string> => {
  return getResolvedSiteTheme({
    siteThemeFontPreset: fontId ?? DEFAULT_SITE_THEME_FONT_ID,
    siteThemeColorPreset: colorId ?? DEFAULT_SITE_THEME_COLOR_ID,
    siteThemeCustomFonts: [],
    siteThemeCustomColors: [],
  }).cssVars;
};
