// RESPONSIBILITY: Provides Trainer TrainerWorkoutWorkout feature-local numeric and nullable display formatting.

/**
 * @description Formats workout numeric metrics using the active application locale.
 * @dependencies Intl.NumberFormat.
 * @edge-case Preserves zero values and does not invent business defaults.
 */
export function TrainerWorkoutFormatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
}
