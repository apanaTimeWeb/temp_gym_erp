import { toast } from 'sonner';

import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingLocalGenericErrorMessage';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingLocalGetErrorMessage';

/**
 * Shows a deduplicated safe error toast. Unclassified exceptions use the supplied localized
 * fallback (or the safe generic fallback) and never surface raw Error.message values.
 */
export function ManagerInfrastructureShowErrorToast(
  error: unknown,
  toastId: string,
  fallbackMessage: string = MANAGER_GENERIC_ERROR_MESSAGE,
): void {
  const safeMessage = ManagerInfrastructureGetErrorMessage(error, fallbackMessage);
  if (safeMessage.trim().length === 0) return;
  toast.error(safeMessage, { id: toastId });
}
