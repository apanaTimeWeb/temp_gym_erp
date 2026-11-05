// Preserve the historical domain URL by redirecting to the verified canonical leaf route.
import { redirect } from 'next/navigation';

export default function ManagerReportsReferralsDomainRedirectPage() {
  redirect('/frontend_manager/manager_reports_referrals/reports_overview');
}
