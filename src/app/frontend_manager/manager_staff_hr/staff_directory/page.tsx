import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_staff_hr/staff_directory/components/ManagerStaffDirectoryMain';
import Loading from '@/app/frontend_manager/manager_staff_hr/staff_directory/loading';

export default function StaffDirectoryMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
