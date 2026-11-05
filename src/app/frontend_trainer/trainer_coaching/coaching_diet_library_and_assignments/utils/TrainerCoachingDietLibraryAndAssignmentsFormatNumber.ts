// RESPONSIBILITY: Formats Trainer Library numeric nutrition metrics for locale-aware display.

/**
 * @description Formats nutrition metrics through the active application locale instead of rendering raw API numbers.
 * @dependencies Intl.NumberFormat.
 * @edge-case Preserves zero while applying at most two decimal places.
 */
export function TrainerLibraryFormatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
}
