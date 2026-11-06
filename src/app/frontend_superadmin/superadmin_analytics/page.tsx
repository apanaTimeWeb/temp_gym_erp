import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics | Superadmin',
  description: 'Superadmin analytics dashboard.',
};

/** Canonical business-domain entry; redirects to its default leaf. */
export default function SuperadminDomainRoot() {
  redirect('/frontend_superadmin/superadmin_analytics/analytics_dashboard');
}
