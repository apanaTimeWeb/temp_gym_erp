// RESPONSIBILITY: Pure Server Component for the tickets page. Renders the interactive client component.
import { Suspense } from 'react';

import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/SuperadminSupportTicketsManagementPageSuspenseSkeleton';
import SuperadminSupportTicketsMain from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_main/SuperadminSupportTicketsManagementMain';



/**
 * @description Pure Server Component for the tickets page. Renders the interactive client component.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function Page() {
    return (<Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
      <SuperadminSupportTicketsMain />
    </Suspense>);
}
