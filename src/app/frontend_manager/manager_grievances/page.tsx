// Preserve the historical domain URL by redirecting to the verified canonical leaf route.
import { redirect } from 'next/navigation';

export default function ManagerGrievancesDomainRedirectPage() {
  redirect('/frontend_manager/manager_grievances/grievance_resolution');
}
