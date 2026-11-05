// RESPONSIBILITY: Validates dashboard custom date windows before they reach the query layer.
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
export function TrainerDashboardIsRealISODate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}
export function TrainerDashboardIsValidDateRange(startDate: string, endDate: string): boolean {
  return TrainerDashboardIsRealISODate(startDate) && TrainerDashboardIsRealISODate(endDate) && startDate <= endDate;
}
