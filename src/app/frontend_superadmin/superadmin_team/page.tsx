import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team | Superadmin',
  description: 'Superadmin team workspace.',
};

/** Canonical business-domain entry; forwards all users to its default leaf. */
export default function SuperadminDomainRoot() {
  redirect('/frontend_superadmin/superadmin_team/team_management');
}
