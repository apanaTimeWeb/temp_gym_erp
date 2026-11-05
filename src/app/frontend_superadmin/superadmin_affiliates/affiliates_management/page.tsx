// RESPONSIBILITY: Pure Server Component for the affiliates page. Renders the interactive client component.
import { Suspense } from 'react';

import SuperadminAffiliatesMain from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_main/SuperadminAffiliatesManagementMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/SuperadminAffiliatesManagementPageSuspenseSkeleton';



/**
 * @description Pure Server Component for the affiliates page. Renders the interactive client component.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function Page() {
    return (<Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
      <SuperadminAffiliatesMain />
    </Suspense>);
}
