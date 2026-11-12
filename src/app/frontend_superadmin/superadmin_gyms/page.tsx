import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gyms & Tenants | Superadmin',
  description: 'Superadmin gyms & tenants workspace.',
};

/** Canonical business-domain entry; forwards all users to its default leaf. */
export default async function SuperadminDomainRoot({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = searchParams ? await searchParams : {};
  const id = typeof params.id === 'string' ? params.id : undefined;
  if (id) {
    redirect(`/frontend_superadmin/superadmin_gyms/gyms_detail/${encodeURIComponent(id)}`);
  }
  redirect('/frontend_superadmin/superadmin_gyms/gyms_directory');
}
