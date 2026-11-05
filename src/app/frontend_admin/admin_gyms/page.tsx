import { redirect } from 'next/navigation';
import { ADMIN_BRANCHES_ROUTES } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/config/admin_gyms_branches_directory.url_config';

/** Gyms domain entry redirects to the branch directory autonomous leaf. */
export default function AdminGymsDomainRedirect() {
  redirect(ADMIN_BRANCHES_ROUTES.root);
}
