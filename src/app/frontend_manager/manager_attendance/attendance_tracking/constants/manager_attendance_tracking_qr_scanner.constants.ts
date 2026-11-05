// RESPONSIBILITY: Owns QR scanner state constants and translation-key mappings for the Attendance feature.
/**
 * @description Provides stable QR scanner constants only. Scanner side effects and API orchestration live in the owning QR hook.
 * @dependencies ManagerAttendanceTracking status constants for resource-state alignment.
 * @edge-case Keeps demo-only values deterministic and keeps user-facing labels as locale keys instead of hardcoded JSX text.
 */
import { MANAGER_ATTENDANCE_TRACKING_QR_STATUS_ACTIVE, MANAGER_ATTENDANCE_TRACKING_QR_STATUS_EXPIRED } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';

export const MANAGER_QR_STATUS_IDLE = 'IDLE' as const;
export const MANAGER_QR_STATUS_SCANNING = 'SCANNING' as const;
export const MANAGER_QR_DEMO_ACTIVE_TOKEN = 'demo-active' as const;
export const MANAGER_QR_DEMO_EXPIRED_TOKEN = 'demo-expired' as const;
export const MANAGER_QR_SCAN_DELAY_MS = 300 as const;
export const MANAGER_QR_MOCK_ID_PREFIX = 'qr-scan-' as const;
export const MANAGER_QR_INITIAL_HISTORY = [] as const;

export const ATTENDANCE_QR_SCAN_STATUS_VALUES = [
  MANAGER_QR_STATUS_IDLE,
  MANAGER_QR_STATUS_SCANNING,
  MANAGER_ATTENDANCE_TRACKING_QR_STATUS_ACTIVE,
  MANAGER_ATTENDANCE_TRACKING_QR_STATUS_EXPIRED,
] as const;

export const MANAGER_QR_STATUS_LABELS = {
  [MANAGER_QR_STATUS_IDLE]: 'COPY_WAITING_SCAN',
  [MANAGER_QR_STATUS_SCANNING]: 'COPY_VERIFYING',
  [MANAGER_ATTENDANCE_TRACKING_QR_STATUS_ACTIVE]: 'TEXT_QR_STATUS_ACTIVE',
  [MANAGER_ATTENDANCE_TRACKING_QR_STATUS_EXPIRED]: 'TEXT_QR_STATUS_EXPIRED',
} as const;
