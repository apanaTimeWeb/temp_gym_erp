import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics | Superadmin',
  description: 'Superadmin analytics workspace.',
};

/** Canonical business-domain entry; forwards all users to its default leaf. */
export default function SuperadminDomainRoot() {
  redirect('/frontend_superadmin/superadmin_analytics/analytics_dashboard');
}
