// RESPONSIBILITY: Defines the page route, lifecycle boundary, or module support artifact for page.tsx; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_data_export/page.tsx)

import { redirect } from 'next/navigation';
import { ADMIN_DATA_EXPORT_ROUTES } from "@/app/frontend_admin/admin_data_export/data_export_requests/config/admin_data_export_requests.url_config";

/** Domain entry redirects to its autonomous feature leaf. Only canonical leaf routes are supported. */
export default function AdminDataExportDomainRedirect() {
  redirect(ADMIN_DATA_EXPORT_ROUTES.root);
}
