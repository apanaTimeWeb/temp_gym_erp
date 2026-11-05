// Preserve the historical domain URL by redirecting to the verified canonical leaf route.
import { redirect } from 'next/navigation';

export default function ManagerMembershipPlansDomainRedirectPage() {
  redirect('/frontend_manager/manager_membership_plans/membership_lifecycle');
}
