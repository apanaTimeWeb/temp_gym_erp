// RESPONSIBILITY: Renders ManagerCommunicationsCampaignsHistory's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { Search, MessageCircle, Mail, Users, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerCommunicationsHistoryEmptyState from '@/app/frontend_manager/manager_communications/communications_history/components/ManagerCommunicationsHistoryEmptyState';

import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';

import { COMM_STATUS_STYLES } from '@/app/frontend_manager/manager_communications/communications_history/constants/manager_communications_campaigns_shared.constants';
import { MANAGER_COMMUNICATION_HISTORY_HEADERS } from '@/app/frontend_manager/manager_communications/communications_history/constants/manager_communications_campaigns_table.constants';
import { useManagerCommunicationsCampaignsLogic } from '@/app/frontend_manager/manager_communications/communications_history/hooks/useManagerCommunicationsHistoryLogic';
import { ManagerCommunicationsCampaignsFormatDate } from '@/app/frontend_manager/manager_communications/communications_history/utils/ManagerCommunicationsHistoryFormatters';





/** @description Renders the ManagerCommunicationsCampaignsHistory component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerCommunicationsCampaignsHistory() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');

  const {
    paginatedCampaigns, isPending, isError, errorMessage,
    historySearch, setHistorySearch,
    historyChannelFilter, setHistoryChannelFilter,
    currentPage, setCurrentPage, totalPages, reload,
    filteredCampaigns } = useManagerCommunicationsCampaignsLogic();

  if (isPending) return <ManagerTableSkeleton rows={5} />;

  if (isError) {
    return (
      <div data-testid="manager_communications-manager-communications-history-status" role="alert" className="bg-card border border-border rounded-xl p-12 text-center space-y-3">
        <p className="text-sm font-semibold text-danger-text">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <p className="text-sm text-text-secondary">{t("COPY_RETRY_REQUEST_ADJUST_CURRENT_FILTERS")}</p><button type="button" onClick={() => void reload()} className="mx-auto inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary"><RefreshCw size={16} aria-hidden="true" />{t("COPY_RETRY")}</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full min-h-11 pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-communications-history-input-text"
            type="text"
            placeholder={t("COPY_SEARCH_CAMPAIGNS")}
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
            
           aria-label={t("COPY_SEARCH_CAMPAIGNS")}/>
        </div>
        <div className="flex gap-2">
          {(['all', 'whatsapp', 'email'] as const).map((ch, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-h-11 min-w-11 px-3 py-2 rounded-lg text-xs font-semibold border motion-safe:transition-all capitalize ${
                historyChannelFilter === ch
                  ? 'bg-primary-subtle border-primary text-primary'
                  : 'bg-input border-border text-text-secondary hover:text-primary'
              } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationshistory-button-all-channels-${mapIndex}`}
              key={ch}
              onClick={() => setHistoryChannelFilter(ch)} aria-pressed={historyChannelFilter === ch}
              
             type="button">
              {ch === 'all' ? t('COPY_ALL_CHANNELS') : ch === 'whatsapp' ? t('COPY_WHATSAPP_1') : t('COPY_EMAIL_2')}
            </button>
          ))}
        </div>
      </div>

      {(() => { if (paginatedCampaigns.length === 0) { return (
        <ManagerCommunicationsHistoryEmptyState isFiltered={Boolean(historySearch || historyChannelFilter !== 'all')} />
      ); } return (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <ManagerInfrastructureResponsiveTable labels={MANAGER_COMMUNICATION_HISTORY_HEADERS}>
<table className="w-full">
              <thead>
                <tr className="bg-primary-subtle">
                  {MANAGER_COMMUNICATION_HISTORY_HEADERS.map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedCampaigns.map((c) => {
                  const statusStyle = COMM_STATUS_STYLES[c.status] ?? COMM_STATUS_STYLES.sent;
                  const isWA = c.channel === 'whatsapp';
                  return (
                    <tr key={c.id} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-text-primary">{c.title}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${isWA ? 'bg-success text-on-success' : 'bg-info text-on-info'}`}
                         data-testid={`manager_communications-managercommunicationshistory-channel-badge-${c.id}`}>
                          {isWA ? <MessageCircle size={18} strokeWidth={2}/> : <Mail size={18} strokeWidth={2}/>}
                          {isWA ? t('COPY_WHATSAPP_1') : t('COPY_EMAIL_2')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{c.segmentLabel}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-sm text-text-secondary">
                          <Users size={18} strokeWidth={2}/>
                          {new Intl.NumberFormat('en-IN').format(c.recipientCount)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary font-medium">{new Intl.NumberFormat('en-IN').format(c.sentCount)}</td>
                      <td className="px-4 py-3">
                        <span data-testid={`manager_communications-manager-communications-history-status-${c.id}`} className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle?.bg || ''} ${statusStyle?.text || ''}`}>
                          {statusStyle?.label || c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary whitespace-nowrap">
                        {ManagerCommunicationsCampaignsFormatDate(c.sentAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
</ManagerInfrastructureResponsiveTable>
          </div>
          <div className="border-t border-border">
            <ManagerPagination data-testid="manager_communications-managercommunicationshistory-managerpagination-1"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredCampaigns.length}
              itemsPerPage={10}
            />
          </div>
        </div>
      ); })()}
    </div>
  );
}
