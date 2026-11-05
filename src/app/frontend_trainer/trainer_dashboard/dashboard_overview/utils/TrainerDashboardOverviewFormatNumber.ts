// RESPONSIBILITY: Provides Trainer Dashboard feature-local numeric display formatting.

/**
 * @description Formats non-financial dashboard counts using the active application locale with no decimals.
 * @dependencies Intl.NumberFormat.
 * @edge-case Preserves zero and does not invent fallback values.
 */
export function TrainerDashboardFormatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}
