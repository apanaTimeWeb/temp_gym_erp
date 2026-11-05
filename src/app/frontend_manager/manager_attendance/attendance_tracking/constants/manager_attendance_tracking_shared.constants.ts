// RESPONSIBILITY: Centralized constants, schema, and shared utilities for the Attendance module.

/**
 * @description Provides the ManagerAttendanceTrackingSharedConstants implementation for the attendance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

export const ATTENDANCE_TABLE_HEADERS = [
  'Name', 'Type', 'Status', 'Date', 'Check In', 'Check Out', 'Duration', 'Method', 'Actions'
];

export const ATTENDANCE_TABS = ['Member Attendance', 'Trainer Attendance', 'Staff Attendance', 'Daily Attendance Report'] as const;





export const ATTENDANCE_MEMBER_STATUS_VALUES = ['ACTIVE', 'PENDING', 'EXPIRED', 'FROZEN', 'SUSPENDED', 'BANNED'] as const;

export const ATTENDANCE_STAFF_STATUS_VALUES = ['ACTIVE', 'INACTIVE', 'ON_LEAVE'] as const;

export const MANAGER_ATTENDANCE_TRACKING_RECORD_TYPE_VALUES = ['MEMBER', 'STAFF'] as const;
export const MANAGER_ATTENDANCE_TRACKING_RECORD_STATUS_VALUES = ['PRESENT', 'LEAVE', 'ABSENT'] as const;

export const MANAGER_ATTENDANCE_TRACKING_CHECK_IN_METHOD_VALUES = ['QR', 'Manual', 'Biometric'] as const;
