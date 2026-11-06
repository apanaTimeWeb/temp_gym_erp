import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Configuration | Superadmin',
  description: 'Superadmin platform features and configuration.',
};

/** Canonical business-domain entry; redirects to its default leaf. */
export default function SuperadminDomainRoot() {
  redirect('/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management');
}
