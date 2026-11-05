// RESPONSIBILITY: Defines TypeScript types for the Manager QR Scanner feature.

/** Union type representing the Kiosk scanner state machine states. */
import type { ATTENDANCE_QR_SCAN_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_qr_scanner.constants';
export type ManagerQrScanStatus = typeof ATTENDANCE_QR_SCAN_STATUS_VALUES[number];

/** Shape of a single entry in the recent check-in history panel. */
export interface ManagerQrScanHistoryRecord {
  id: string;
  time: string;
  name: string;
}

/** Props for the top-level Kiosk scanner modal component. */
export interface ManagerAttendanceTrackingQrScannerModalProps {
  open: boolean;
  onClose: () => void;
}
