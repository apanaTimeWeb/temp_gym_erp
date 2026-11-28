// RESPONSIBILITY: Renders ManagerAttendanceTrackingContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import ManagerToast from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingLocalToast';

import ManagerAttendanceTrackingCalendar from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingCalendar';
import ManagerAttendanceTrackingDateFilterDropdown from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingDateFilterDropdown';
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
  <div className="min-h-full pb-10 attendance-module bg-page trainer-aurora-canvas text-text-primary">
  
  <div className="p-4 sm:p-6 space-y-5">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 className="text-page-title font-extrabold text-text-primary">{t('COPY_ATTENDANCE')}</h1>
      <p className="text-sm text-text-secondary mt-1">{t('COPY_TRACK_DAILY_MEMBER_STAFF_CHECK_INS')}</p>
    </div>
    <ManagerAttendanceTrackingDateFilterDropdown />
  </div>

  <ManagerAttendanceTrackingKPIs />
  
  <div className="relative bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] rounded-2xl shadow-card border border-border dark:border-blue-500/30 overflow-hidden">
  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-[#FF5A1F] z-30" />
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
