/** Slugs with a built UI in this repo — must match a key in `toolViewBySlug` and a row in `TOOLS`. */
export const IMPLEMENTED_TOOL_SLUGS = [
  'age-calculator',
  'bmi-calculator',
  'coin-flip',
  'currency-converter',
  'days-until',
  'ip-address',
  'password-generator',
  'percentage-calculator',
  'temperature-converter',
  'timezone-converter',
  'weight-converter',
  'word-counter',
] as const;

export type ImplementedToolSlug = (typeof IMPLEMENTED_TOOL_SLUGS)[number];

const SET = new Set<string>(IMPLEMENTED_TOOL_SLUGS);

export function isImplementedToolSlug(slug: string): slug is ImplementedToolSlug {
  return SET.has(slug);
}
