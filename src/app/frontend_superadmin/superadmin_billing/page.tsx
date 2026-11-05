import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing | Superadmin',
  description: 'Superadmin billing workspace.',
};

type SearchParams = Record<string, string | string[] | undefined>;
type DomainRootProps = { searchParams?: Promise<SearchParams> };

/** Canonical business-domain entry; forwards all query values to its default leaf. */
export default async function SuperadminDomainRoot({ searchParams }: DomainRootProps) {
  const resolved = searchParams ? await searchParams : {};
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(resolved)) {
    if (Array.isArray(value)) value.forEach((entry) => query.append(key, entry));
    else if (typeof value === 'string') query.set(key, value);
  }
  const queryString = query.toString();
  redirect(queryString ? `/frontend_superadmin/superadmin_billing/billing_plans_management?${queryString}` : '/frontend_superadmin/superadmin_billing/billing_plans_management');
}
