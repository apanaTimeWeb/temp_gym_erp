import { redirect } from 'next/navigation';
import { ADMIN_PLANS_ROUTES } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/config/admin_billing_plans_catalog.url_config';

/** Billing domain entry redirects to its plan catalog autonomous leaf. */
export default function AdminBillingDomainRedirect() {
  redirect(ADMIN_PLANS_ROUTES.root);
}
