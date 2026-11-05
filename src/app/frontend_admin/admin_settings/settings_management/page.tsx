import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_settings/settings_management/components/feedback/AdminSettingsManagementConfirmProvider';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Settings module entry point.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_settings/settings_management/page.tsx)

import AdminSettingsMain from '@/app/frontend_admin/admin_settings/settings_management/components/main_view/AdminSettingsManagementMain';

/**
 * SettingsPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function SettingsPage() {
 return (
      <AdminNavigationLayoutConfirmProvider><AdminSettingsMain /></AdminNavigationLayoutConfirmProvider>
  );
}
