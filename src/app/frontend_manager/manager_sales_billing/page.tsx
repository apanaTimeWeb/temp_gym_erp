// Preserve the historical domain URL by redirecting to the verified canonical leaf route.
import { redirect } from 'next/navigation';

export default function ManagerSalesBillingDomainRedirectPage() {
  redirect('/frontend_manager/manager_sales_billing/sales_overview');
}
