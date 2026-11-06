import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing | Superadmin',
  description: 'Superadmin billing workspace.',
};

/** Canonical business-domain entry; forwards all users to its default leaf. */
export default function SuperadminDomainRoot() {
  redirect('/frontend_superadmin/superadmin_billing/billing_plans_management');
}
