// RESPONSIBILITY: Classifies a verified attendance comparison into decrease, no change, or increase.
// DATA FLOW: typed attendance trend percentage → semantic presentation direction.

export type AdminAttendanceTrendDirection = 'increased' | 'decreased' | 'unchanged';

/** Never mislabel a zero delta as growth. */
export function getAdminAttendanceTrendDirection(value: number): AdminAttendanceTrendDirection {
  if (!Number.isFinite(value) || value === 0) return 'unchanged';
  return value > 0 ? 'increased' : 'decreased';
}
