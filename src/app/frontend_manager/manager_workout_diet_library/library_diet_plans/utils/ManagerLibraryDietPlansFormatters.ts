/**
 * @description Module-local display formatting for nullable Library values.
 * @dependencies Uses only platform primitives; no cross-feature business dependency.
 * @edge-case Preserves numeric zero while rendering nullish/blank values as an explicit en-dash.
 */
export function ManagerLibraryDietPlansDisplayValue(value: string | number | boolean | null | undefined): string {
  return value === null || value === undefined || value === '' ? '—' : String(value);
}
