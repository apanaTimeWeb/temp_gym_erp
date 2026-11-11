// RESPONSIBILITY: Route entry page for Manager Support Tickets.
import { Suspense } from 'react';
import ManagerSupportTicketsMain from '@/app/frontend_manager/manager_help_support/support_tickets/components/ManagerSupportTicketsMain';
import Loading from '@/app/frontend_manager/manager_help_support/support_tickets/loading';

export default function ManagerSupportTicketsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ManagerSupportTicketsMain />
    </Suspense>
  );
}

