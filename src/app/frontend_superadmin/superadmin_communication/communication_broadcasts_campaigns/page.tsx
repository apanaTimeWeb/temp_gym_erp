// RESPONSIBILITY: Pure Server Component for the broadcasts page. Renders the interactive client component.
import { Suspense } from 'react';

import SuperadminCommunicationBroadcastsMain from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_main/SuperadminCommunicationBroadcastsCampaignsMain';
import SuperadminPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/SuperadminCommunicationBroadcastsCampaignsPageSuspenseSkeleton';


/**
 * @description Pure Server Component for the broadcasts page. Renders the interactive client component.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminCommunicationBroadcastsMain />
    </Suspense>);
}
