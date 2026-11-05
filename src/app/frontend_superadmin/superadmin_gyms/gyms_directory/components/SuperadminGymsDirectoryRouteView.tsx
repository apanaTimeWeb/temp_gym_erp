// RESPONSIBILITY: Keeps the legacy query route, but transfers detail ownership to the canonical [id] route.
'use client';

import { Suspense, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import SuperadminGymsAddGymForm from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryAddGymForm';
import SuperadminGymsMain from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryMain';
import SuperadminPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryPageSuspenseSkeleton';
import { SUPERADMIN_GYMS_DIRECTORY_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';


const GYMS_VIEWS = ['list', 'add', 'detail'] as const;
type GymsView = (typeof GYMS_VIEWS)[number];

/** Keeps the legacy query route, but transfers detail ownership to the canonical [id] route. */
export default function SuperadminGymsDirectoryRouteView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestedView = searchParams.get('view');
  const view: GymsView = GYMS_VIEWS.includes(requestedView as GymsView) ? (requestedView as GymsView) : 'list';
  const gymId = searchParams.get('gymId')?.trim() || null;

  useEffect(() => {
    if (view === 'detail' && gymId) {
      router.replace(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.DETAIL_LEAF(gymId));
    }
  }, [gymId, router, view]);

  if (view === 'detail' && gymId) return <Suspense fallback={<SuperadminPageSuspenseSkeleton />}><SuperadminPageSuspenseSkeleton /></Suspense>;
  if (view === 'add') return <Suspense fallback={<SuperadminPageSuspenseSkeleton />}><SuperadminGymsAddGymForm /></Suspense>;
  return <SuperadminGymsMain />;
}
