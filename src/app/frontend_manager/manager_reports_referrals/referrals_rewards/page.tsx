// Autonomous leaf route for manager_referrals.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/components/ManagerReferralsRewardsMain';
import Loading from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/loading';


export default function ManagerReferralsRewardsPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
