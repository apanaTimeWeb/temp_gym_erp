import { Suspense } from 'react';

import SuperadminCommunicationNotificationsMain from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/components/SuperadminCommunicationNotificationsMain';
import SuperadminCommunicationNotificationsPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/components/SuperadminCommunicationNotificationsPageSuspenseSkeleton';

import type { Metadata } from 'next';


export const metadata: Metadata = { title: 'Notifications | Superadmin', description: 'Review and acknowledge platform notifications.' };
export default function NotificationsPage() { return <Suspense fallback={<SuperadminCommunicationNotificationsPageSuspenseSkeleton />}><SuperadminCommunicationNotificationsMain/></Suspense>; }
