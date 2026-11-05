import { redirect } from 'next/navigation';
import { ADMIN_HR_ROUTES } from '@/app/frontend_admin/admin_hr/hr_staff_management/config/admin_hr_staff_management.url_config';

/** Domain entry redirects to the primary autonomous workflow; secondary navigation is defined in the domain layout. */
export default function AdminHrDomainRedirect() { redirect(ADMIN_HR_ROUTES.root); }
