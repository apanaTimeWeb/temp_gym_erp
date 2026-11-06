import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const instant = false;

export const metadata: Metadata = {
  title: 'Communication | Superadmin',
  description: 'Superadmin communication workspace.',
};

/** Canonical business-domain entry; forwards all users to its default leaf. */
export default function SuperadminDomainRoot() {
  redirect('/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns');
}
