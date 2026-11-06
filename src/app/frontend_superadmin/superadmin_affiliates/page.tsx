import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliates | Superadmin',
  description: 'Superadmin affiliates management.',
};

/** Canonical business-domain entry; redirects to its default leaf. */
export default function SuperadminDomainRoot() {
  redirect('/frontend_superadmin/superadmin_affiliates/affiliates_management');
}
