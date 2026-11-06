import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit & Compliance | Superadmin',
  description: 'Superadmin audit and compliance.',
};

/** Canonical business-domain entry; redirects to its default leaf. */
export default function SuperadminDomainRoot() {
  redirect('/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard');
}
