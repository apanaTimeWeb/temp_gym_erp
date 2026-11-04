/**
 * Neutral presentation fallback primitive.
 * Renders an en-dash (–) for nullish/empty values while preserving 0 and false.
 */
export function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "–";
  }
  if (typeof value === "boolean") {
    return value ? "True" : "False";
  }
  if (typeof value === "number") {
    if (Number.isNaN(value)) {
      return "–";
    }
    return String(value);
  }
  return String(value);
}

