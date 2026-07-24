/**
 * Utility: Merge class names.
 * Filters out falsy values and joins the rest with a space.
 * Replace with `clsx` + `tailwind-merge` if needed in a later phase.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
