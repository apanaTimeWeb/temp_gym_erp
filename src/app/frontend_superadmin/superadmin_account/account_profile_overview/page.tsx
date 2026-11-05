// RESPONSIBILITY: Pure Server Component entry point for /superadmin/profile.
import { Suspense } from 'react';

import SuperadminAccountProfileMain from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/components/profile_overview_main/SuperadminAccountProfileOverviewMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/components/SuperadminAccountProfileOverviewPageSuspenseSkeleton';

import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'My Profile | Superadmin | GymSmart',
    description: 'Manage your superadmin account settings and security.',
};
/**
 * @description Pure Server Component entry point for /superadmin/profile.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function SuperadminAccountProfilePage() {
    return (<Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
      <SuperadminAccountProfileMain />
    </Suspense>);
}
