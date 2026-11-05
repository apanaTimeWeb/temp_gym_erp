// RESPONSIBILITY: Server Component entry point for the Gym Health Alerts page.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_gym_health_alerts/gym_health_alerts_monitoring/page.tsx)

import type { Metadata } from 'next';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/feedback/AdminGymsHealthAlertsMonitoringConfirmProvider';
import { getTranslations } from 'next-intl/server';
import AdminGymHealthAlertsMain from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/main_view/AdminGymsHealthAlertsMonitoringMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('gym-health-alerts.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * GymHealthAlertsPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function GymHealthAlertsPage() {
  return (
      <AdminNavigationLayoutConfirmProvider><AdminGymHealthAlertsMain /></AdminNavigationLayoutConfirmProvider>
  );
}
