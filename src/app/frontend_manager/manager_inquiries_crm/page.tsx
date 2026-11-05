// Preserve the historical domain URL by redirecting to the verified canonical leaf route.
import { redirect } from 'next/navigation';

export default function ManagerInquiriesCrmDomainRedirectPage() {
  redirect('/frontend_manager/manager_inquiries_crm/inquiries_pipeline');
}
