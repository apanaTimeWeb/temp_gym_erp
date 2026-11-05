// RESPONSIBILITY: Provides the module-owned en-dash fallback for optional display-only values.
export function ManagerBusinessSettingsDisplayValue(value: string | number | boolean | null | undefined): string {
  return value === null || value === undefined || value === '' ? '—' : String(value);
}
