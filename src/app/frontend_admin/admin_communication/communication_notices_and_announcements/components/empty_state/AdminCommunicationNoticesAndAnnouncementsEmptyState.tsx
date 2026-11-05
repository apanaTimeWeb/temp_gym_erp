"use client";
// RESPONSIBILITY: Renders the empty state for the Admin announcements list and starts announcement creation.
// DATA FLOW: feature data/state and user input → AdminCommunicationNoticesAndAnnouncementsEmptyState → accessible UI/events routed to owning hooks (admin_communication/communication_notices_and_announcements/components/empty_state/AdminCommunicationNoticesAndAnnouncementsEmptyState.tsx)

import { useTranslations } from 'next-intl';

import { Megaphone, RotateCcw } from 'lucide-react';
import { useAdminAnnouncementsLogic } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsLogic';

/**
 * AdminCommunicationNoticesAndAnnouncementsEmptyState renders the admin announcements empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationNoticesAndAnnouncementsEmptyState: Renders the empty state for the Admin announcements list and starts announcement creation.
 * @dependencies Consumes useAdminAnnouncementsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationNoticesAndAnnouncementsEmptyState({ hasFilters = false, onResetFilters }: { hasFilters?: boolean; onResetFilters?: () => void }) {
  const t = useTranslations();

  const { openCreate } = useAdminAnnouncementsLogic();
  return <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
    <Megaphone size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
    <h3 className="text-base font-semibold text-primary">{hasFilters ? t('announcements.admin_announcements_empty_state.filteredTitle') : t('announcements.admin_announcements_empty_state.text_4242d274f9')}</h3>
    <p className="text-sm text-secondary">{hasFilters ? t('announcements.admin_announcements_empty_state.filteredDescription') : t('announcements.admin_announcements_empty_state.text_2683f14609')}</p>
    {hasFilters ? <button type="button" onClick={onResetFilters} className="mt-1 flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="admin_announcements-admin_announcements-empty-state-reset"><RotateCcw size={18} aria-hidden="true" />{t('announcements.admin_announcements_empty_state.resetFilters')}</button> : <button type="button" onClick={openCreate} className="motion-safe:transition-all motion-safe:duration-base ease-in-out mt-1 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_announcements-admin_announcements-empty-state-state">{t('announcements.admin_announcements_empty_state.text_9a45c17c89')}</button>}
  </div>;
}
