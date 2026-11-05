"use client";
// RESPONSIBILITY: Main orchestrator for the Admin Announcements module.
// DATA FLOW: feature data/state and user input → AdminCommunicationNoticesAndAnnouncementsMain → accessible UI/events routed to owning hooks (admin_communication/communication_notices_and_announcements/components/main_view/AdminCommunicationNoticesAndAnnouncementsMain.tsx)

import { useTranslations } from 'next-intl';
// Renders the compose CTA banner, KPIs, and the announcement table with full CRUD.

import { Megaphone, Send } from 'lucide-react';
import AdminAnnouncementsKPIs from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/kpis/AdminCommunicationNoticesAndAnnouncementsKPIs';
import AdminAnnouncementsTable from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/table/AdminCommunicationNoticesAndAnnouncementsTable';
import AdminAnnouncementsModal from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/modal/AdminCommunicationNoticesAndAnnouncementsModal';
import { useAdminAnnouncementsLogic } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsLogic';

/**
 * AdminCommunicationNoticesAndAnnouncementsMain renders the admin announcements main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationNoticesAndAnnouncementsMain: Main orchestrator for the Admin Announcements module.
 * @dependencies Consumes AdminAnnouncementsKPIs, AdminAnnouncementsTable, AdminAnnouncementsModal, useAdminAnnouncementsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationNoticesAndAnnouncementsMain() {
  const t = useTranslations();

  const { openCreate } = useAdminAnnouncementsLogic();

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">

        {/* Branch Broadcast CTA — the primary send capability for admin role */}
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary-subtle flex items-center justify-center shrink-0">
              <Megaphone size={18} className="text-primary"  strokeWidth={2}/>
            </div>
            <div>
              <p className="font-semibold text-primary text-sm">{t('announcements.admin_announcements_main.text_ad3057e65c')}</p>
              <p className="text-xs text-secondary mt-0.5">
                {t('announcements.admin_announcements_main.text_71ccab9dbd')}</p>
            </div>
          </div>
          <button type="button"
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-xl text-sm motion-safe:transition-colors shrink-0 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_announcements-admin_announcements-main-click">
            <Send size={18}  strokeWidth={2}/>
            {t('announcements.admin_announcements_main.text_30642945b5')}</button>
        </div>

        <AdminAnnouncementsKPIs />
        <AdminAnnouncementsTable />
      </div>
      <AdminAnnouncementsModal />
    </div>
  );
}
