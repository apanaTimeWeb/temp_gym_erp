// Autonomous leaf route for manager_notifications.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_communications/notifications_inbox/components/ManagerNotificationsInboxMain';
import Loading from '@/app/frontend_manager/manager_communications/notifications_inbox/loading';


export default function ManagerNotificationsInboxPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
