import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Communication | Superadmin',
  description: 'Superadmin communication center.',
};

/** Canonical business-domain entry; redirects to its default leaf. */
export default function SuperadminDomainRoot() {
  redirect('/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns');
}
