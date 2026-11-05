// Autonomous leaf route for manager_reports.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewMain';
import Loading from '@/app/frontend_manager/manager_reports_referrals/reports_overview/loading';

export const dynamic = 'force-dynamic';

export default function ManagerReportsOverviewPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
