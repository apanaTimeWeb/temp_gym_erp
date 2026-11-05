// Preserve the historical domain URL by redirecting to the verified canonical leaf route.
import { redirect } from 'next/navigation';

export default function ManagerStaffHrDomainRedirectPage() {
  redirect('/frontend_manager/manager_staff_hr/staff_directory');
}
