// RESPONSIBILITY: Provides branded Admin not-found handling for an invalid Data Export route.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_data_export/data_export_requests/not-found.tsx)

import AdminNavigationLayoutNotFound from '@/app/frontend_admin/admin_data_export/data_export_requests/components/shell/AdminDataExportRequestsNotFound';

/**
 * AdminDataExportNotFound renders the admin data export not found UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminDataExportNotFound() {
  return <AdminNavigationLayoutNotFound />;
}
