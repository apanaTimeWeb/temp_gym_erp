// Autonomous leaf route for manager_settings.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_dashboard/business_settings/components/ManagerBusinessSettingsMain';
import Loading from '@/app/frontend_manager/manager_dashboard/business_settings/loading';


export default function ManagerBusinessSettingsPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
