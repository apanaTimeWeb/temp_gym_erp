// Autonomous leaf route for manager_attendance.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingMain';
import Loading from '@/app/frontend_manager/manager_attendance/attendance_tracking/loading';


export default function ManagerAttendanceTrackingPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
