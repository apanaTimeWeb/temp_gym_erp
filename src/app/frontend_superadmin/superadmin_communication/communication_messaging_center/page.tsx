// RESPONSIBILITY: Renders the page component and its associated UI logic.
import { Suspense } from 'react';

import SuperadminCommunicationMessagingMain from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/components/messaging_center_main/SuperadminCommunicationMessagingCenterMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/components/SuperadminCommunicationMessagingCenterPageSuspenseSkeleton';


/**
 * @description Renders the page component and its associated UI logic.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function MessagingPage() {
    return (<Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
      <SuperadminCommunicationMessagingMain />
    </Suspense>);
}
