/** Canonical module-level constant registry for manager_attendance; child constant files remain the source of individual entries. */
export const ManagerAttendanceTrackingConstants = {} as const;

export const MANAGER_ATTENDANCE_TRACKING_QR_STATUS_ACTIVE = 'ACTIVE' as const;
export const MANAGER_ATTENDANCE_TRACKING_QR_STATUS_EXPIRED = 'EXPIRED' as const;

export const MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES = {
  ALL_FILTER: 'All',
  ACTIVE_FILTER: 'active',
  LEAVE: 'LEAVE',
  PRESENT: 'PRESENT',
  PRESENT_DISPLAY: 'Present',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  FROZEN: 'FROZEN',
  SUSPENDED: 'SUSPENDED',
  PENDING: 'PENDING',
  ON_LEAVE: 'ON_LEAVE',
  LATE: 'Late',
  ABSENT: 'ABSENT',
  ABSENT_DISPLAY: 'Absent',
  NONE: 'NONE',
  IDLE: 'IDLE',
  SCANNING: 'SCANNING',
} as const;
