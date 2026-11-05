// RESPONSIBILITY: Renders/orchestrates SuperadminSupportTicketsEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the SuperadminSupportTicketsEmptyState component.
import { MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';



/**
 * @description Renders the SuperadminSupportTicketsEmptyState component.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSupportTicketsManagementEmptyState() {
  const t = useTranslations('superadmin_support_tickets');
    return (<div data-testid="superadmin_support_tickets-superadmin-tickets-empty-state-tickets-empty-state-empty" className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-primary-subtle p-4 rounded-full mb-4" data-testid="superadmin_support_tickets-superadmin-tickets-empty-state-tickets-empty-state-empty-2">
        <MessageSquare size={18} className="text-primary opacity-80" data-testid="superadmin_support_tickets-ticketsemptystate-state"/>
      </div>
      <h3 className="text-lg font-bold text-primary mb-1">{t('ui.no_support_tickets_found_b7a9656')}</h3>
      <p className="text-sm text-secondary max-w-sm">
        
        {t('ui.there_are_currently_no_support_tickets_from_gym__1cbe83d')}
      </p>
    </div>);
}
