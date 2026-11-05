import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_staff_hr/staff_attendance/components/ManagerStaffAttendanceMain';
import Loading from '@/app/frontend_manager/manager_staff_hr/staff_attendance/loading';

export default function StaffAttendanceMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
