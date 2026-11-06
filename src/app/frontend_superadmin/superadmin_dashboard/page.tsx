import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Superadmin',
  description: 'Superadmin dashboard workspace.',
};

/** Canonical business-domain entry; redirects to its default leaf. */
export default function SuperadminDomainRoot() {
  redirect('/frontend_superadmin/superadmin_dashboard/dashboard_overview');
}
