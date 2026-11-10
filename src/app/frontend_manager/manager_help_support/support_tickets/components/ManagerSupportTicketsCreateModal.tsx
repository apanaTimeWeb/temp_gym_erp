// RESPONSIBILITY: Renders the Raise Support Ticket modal with React Hook Form + Zod validation.
'use client';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Send, Loader2, LifeBuoy } from 'lucide-react';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { createSupportTicketSchema, type CreateSupportTicketFormValues } from '@/app/frontend_manager/manager_help_support/support_tickets/schemas/manager_support_tickets.schemas';
import { TICKET_CATEGORIES, TICKET_PRIORITIES } from '@/app/frontend_manager/manager_help_support/support_tickets/constants/manager_support_tickets.constants';

interface Props {
  open: boolean;
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: CreateSupportTicketFormValues) => Promise<void>;
}

export default function ManagerSupportTicketsCreateModal({ open, saving, onClose, onSubmit }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: open, onClose });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSupportTicketFormValues>({
    resolver: zodResolver(createSupportTicketSchema),
    defaultValues: {
      subject: '',
      category: 'General Inquiry',
      priority: 'MEDIUM',
      description: '',
    },
  });

  if (!open) return null;

  const handleFormSubmit = async (data: CreateSupportTicketFormValues) => {
    await onSubmit(data);
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-backdrop p-4 backdrop-blur-xs" role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="raise-support-ticket-title"
        data-testid="manager_support-create-modal"
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary-subtle text-primary">
              <LifeBuoy size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <h2 id="raise-support-ticket-title" className="text-lg font-bold text-text-primary">Raise Ticket to Admin</h2>
              <p className="text-xs text-text-secondary">Send an operational, policy, or technical request to Head Admin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-5 space-y-4">
          <div>
            <label htmlFor="ticket-subject" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
              Ticket Subject *
            </label>
            <input
              id="ticket-subject"
              type="text"
              placeholder="e.g. Need budget approval for replacement dumbbells"
              {...register('subject')}
              data-testid="manager_support-input-subject"
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
            {errors.subject && <p className="mt-1 text-xs text-danger-text">{errors.subject.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ticket-category" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                id="ticket-category"
                {...register('category')}
                data-testid="manager_support-select-create-category"
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {TICKET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-danger-text">{errors.category.message}</p>}
            </div>

            <div>
              <label htmlFor="ticket-priority" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Priority *
              </label>
              <select
                id="ticket-priority"
                {...register('priority')}
                data-testid="manager_support-select-create-priority"
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {TICKET_PRIORITIES.map((pri) => (
                  <option key={pri} value={pri}>
                    {pri}
                  </option>
                ))}
              </select>
              {errors.priority && <p className="mt-1 text-xs text-danger-text">{errors.priority.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="ticket-description" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
              Detailed Description & Justification *
            </label>
            <textarea
              id="ticket-description"
              rows={4}
              placeholder="Provide complete context, affected equipment or staff, and required action..."
              {...register('description')}
              data-testid="manager_support-input-description"
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
            {errors.description && <p className="mt-1 text-xs text-danger-text">{errors.description.message}</p>}
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border text-sm font-semibold text-text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              data-testid="manager_support-button-submit-ticket"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-sm font-bold text-on-primary hover:bg-primary-hover active:scale-95 transition-all disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {saving ? <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
              Submit to Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

