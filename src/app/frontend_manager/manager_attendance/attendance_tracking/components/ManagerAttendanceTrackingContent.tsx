// RESPONSIBILITY: Renders ManagerAttendanceTrackingContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import ManagerToast from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingLocalToast';

import ManagerAttendanceTrackingCalendar from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingCalendar';
import ManagerAttendanceTrackingKPIs from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingKPIs';
import ManagerAttendanceTrackingModal from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingModal';
import ManagerAttendanceTrackingTable from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingTable';
import ManagerAttendanceTrackingToolbar from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingToolbar';
import ManagerAttendanceTrackingQrScannerModal from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingQrScannerModal';
import { useManagerAttendanceTrackingLogic } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingLogic';
import { useManagerAttendanceTrackingViewState } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingViewState';


/** @description Renders the ManagerAttendanceTrackingContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerAttendanceTrackingContent() {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');

  const { toast, hideToast } = useManagerAttendanceTrackingLogic();
  const { scannerOpen, closeScanner } = useManagerAttendanceTrackingViewState();

  return (
  <div className="min-h-full pb-10 attendance-module bg-page text-text-primary">
  
  <div className="p-6 space-y-5">
  <ManagerAttendanceTrackingKPIs />
  
  <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
  <ManagerAttendanceTrackingToolbar />
  <ManagerAttendanceTrackingTable />
  </div>
  </div>

  <ManagerAttendanceTrackingModal />
  <ManagerAttendanceTrackingCalendar />
  <ManagerAttendanceTrackingQrScannerModal data-testid="manager_attendance-managerattendancecontent-managerattendanceqrscannermodal-2" open={scannerOpen} onClose={closeScanner} />

  {toast && (
 <ManagerToast data-testid="manager_attendance-managerattendancecontent-managertoast-3" message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}
