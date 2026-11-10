// RESPONSIBILITY: Not found state for Manager Support Tickets route.
import Link from 'next/link';
import { LifeBuoy } from 'lucide-react';

export default function ManagerSupportTicketsNotFound() {
  return (
    <div className="p-12 text-center space-y-4 max-w-md mx-auto">
      <div className="w-12 h-12 rounded-full bg-input text-text-secondary flex items-center justify-center mx-auto">
        <LifeBuoy size={24} aria-hidden="true" />
      </div>
      <h2 className="text-lg font-bold text-text-primary">Support Ticket Not Found</h2>
      <p className="text-xs text-text-secondary">The requested ticket or resource could not be found or has been archived.</p>
      <Link
        href="/frontend_manager/manager_help_support/support_tickets"
        className="inline-block px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover transition-all"
      >
        Back to Support Tickets
      </Link>
    </div>
  );
}

