import { Suspense } from 'react';

import { redirect } from 'next/navigation';

import { SuperadminGymsDetailErrorBoundary } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailErrorBoundary';
import SuperadminGymsGymDetailView from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailPageSuspenseSkeleton';

import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Gym Details | Superadmin',
  description: 'View and manage a gym tenant.',
};

type GymDetailPageProps = { params: Promise<{ id: string }> };

/** Canonical route for the existing gym-detail leaf; no obsolete gyms_management redirect. */
export default async function SuperadminGymsDetailRoute({ params }: GymDetailPageProps) {
  const { id } = await params;
  if (!id?.trim()) redirect('/frontend_superadmin/superadmin_gyms/gyms_directory');
  return (
    <SuperadminGymsDetailErrorBoundary>
      <Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
        <SuperadminGymsGymDetailView gymId={id} />
      </Suspense>
    </SuperadminGymsDetailErrorBoundary>
  );
}
