// RESPONSIBILITY: Renders ManagerCommunicationsChurnRecoveryTableRow's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Send, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { CANCELLATIONS_REASON_LABEL } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns_shared.constants';
import { MANAGER_CHURN_RECOVERY_TABLE_HEADERS } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns_table.constants';
import { ManagerInfrastructureTableRowActionMenu } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureTableContextMenu';
import { ManagerCommunicationsCampaignsFormatDate } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/utils/ManagerCommunicationsChurnRecoveryFormatters';
import type { ManagerCommunicationsCampaignsChurnRecoveryTableRowProps } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_campaigns_churn_recovery_table_row.types';

const INTERACTIVE_ROW_TARGETS = 'a, button, input, select, textarea, [role=\"combobox\"], [role=\"listbox\"], [role=\"option\"], [contenteditable=\"true\"]';

function isInteractiveRowTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest(INTERACTIVE_ROW_TARGETS) !== null;
}




/**
 * @description Provides the `getDaysBadge` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function getDaysBadge(days: number): { label: string; bg: string; text: string } {
  if (days <= 7)  return { label: `${days}d ago`, bg: 'bg-danger-bg',  text: 'text-danger-text' };
  if (days <= 30) return { label: `${days}d ago`, bg: 'bg-warning-bg', text: 'text-warning-text' };
  return              { label: `${days}d ago`, bg: 'bg-info-bg',    text: 'text-info-text' };
}

/** @description Renders the ManagerCommunicationsCampaignsChurnRecoveryTableRow component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerCommunicationsCampaignsChurnRecoveryTableRow({
  member,
  onOpenComposer,
  maskPhone }: ManagerCommunicationsCampaignsChurnRecoveryTableRowProps) {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');

  const badge = getDaysBadge(member.daysSinceExit);
  const rowCardClass = 'cardStackRow max-md:mb-3 max-md:rounded-xl max-md:border max-md:border-border max-md:bg-card max-md:p-2 max-md:shadow-card md:table-row md:mb-0 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none';
  const cellBaseClass = 'cardStackCell max-md:flex max-md:items-start max-md:justify-between max-md:gap-4 max-md:border-b max-md:border-border max-md:px-3 max-md:py-2 max-md:text-right max-md:last:border-b-0 md:table-cell md:align-middle md:border-0 md:px-4 md:py-3.5 md:text-left';

  return (
    <tr
      onContextMenu={(event) => {
        const trigger = event.currentTarget.querySelector<HTMLButtonElement>('[data-row-action-menu-trigger="true"]');
        if (trigger) { event.preventDefault(); trigger.click(); }
      }}
      data-testid={`manager_communications-communications-managerchurnrecoverytablerow-row-${member.memberId}`}
      className={`${rowCardClass} motion-safe:transition-all hover:bg-primary-subtle cursor-pointer motion-safe:duration-200 ease-in-out`}
      tabIndex={0}
      role="button"
      aria-label={t("TEXT_OPEN_WINBACK_COMPOSER", { value: member.name })}
      onClick={(event) => { if (!isInteractiveRowTarget(event.target)) onOpenComposer(member.memberId); }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpenComposer(member.memberId);
        }
      }}
    >
      {/* Name + Plan */}
      <td className={`px-4 py-3 ${cellBaseClass}`} data-label={MANAGER_CHURN_RECOVERY_TABLE_HEADERS[0]} data-mobile-primary="true"><span className="sr-only md:hidden">{MANAGER_CHURN_RECOVERY_TABLE_HEADERS[0]}</span>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-text-primary truncate max-w-40">{member.name}</span>
          <span className="text-xs text-text-secondary truncate max-w-40">{member.plan}</span>
        </div>
      </td>

      {/* Phone */}
      <td className={`px-4 py-3 text-sm text-text-primary font-mono ${cellBaseClass}`} data-label={MANAGER_CHURN_RECOVERY_TABLE_HEADERS[1]}><span className="sr-only md:hidden">{MANAGER_CHURN_RECOVERY_TABLE_HEADERS[1]}</span>
        {maskPhone(member.phone)}
      </td>

      {/* Exit Date */}
      <td className={`px-4 py-3 text-sm text-text-secondary whitespace-nowrap ${cellBaseClass}`} data-label={MANAGER_CHURN_RECOVERY_TABLE_HEADERS[2]}><span className="sr-only md:hidden">{MANAGER_CHURN_RECOVERY_TABLE_HEADERS[2]}</span>
        {ManagerCommunicationsCampaignsFormatDate(member.exitDate)}
      </td>

      {/* Days Since Exit */}
      <td className={`px-4 py-3 ${cellBaseClass}`} data-label={MANAGER_CHURN_RECOVERY_TABLE_HEADERS[3]}><span className="sr-only md:hidden">{MANAGER_CHURN_RECOVERY_TABLE_HEADERS[3]}</span>
        <span data-testid={`manager_communications-managerchurnrecoverytablerow-age-badge-${member.memberId}`} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </td>

      {/* Reason */}
      <td className={`px-4 py-3 text-sm text-text-secondary ${cellBaseClass}`} data-label={MANAGER_CHURN_RECOVERY_TABLE_HEADERS[4]}><span className="sr-only md:hidden">{MANAGER_CHURN_RECOVERY_TABLE_HEADERS[4]}</span>
        {CANCELLATIONS_REASON_LABEL[member.reason]}
      </td>

      {/* Recovery status */}
      <td className={`px-4 py-3 ${cellBaseClass}`} data-label={MANAGER_CHURN_RECOVERY_TABLE_HEADERS[5]} data-mobile-status="true"><span className="sr-only md:hidden">{MANAGER_CHURN_RECOVERY_TABLE_HEADERS[5]}</span>
        {(() => { if (member.recovered) return (<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success text-on-success" data-testid={`manager_communications-managerchurnrecoverytablerow-status-badge-${member.memberId}`}>
            <CheckCircle size={18} strokeWidth={2}/>{t("COPY_RECOVERED")}</span>); return (() => { if (member.lastContactedAt) return (<span className="text-xs text-text-secondary">{t("COPY_CONTACTED")}{ManagerCommunicationsCampaignsFormatDate(member.lastContactedAt)}
          </span>); return (<span className="text-xs text-text-disabled">{t("COPY_NOT_CONTACTED")}</span>); })(); })()}
      </td>

      {/* Action */}
      <td className={`px-4 py-3 text-right ${cellBaseClass}`} data-testid="manager_communications-managercommunicationschurnrecoverytablerow-interactive" data-label={MANAGER_CHURN_RECOVERY_TABLE_HEADERS[6]} data-mobile-actions="true"><span className="sr-only md:hidden">{MANAGER_CHURN_RECOVERY_TABLE_HEADERS[6]}</span>
        <ManagerInfrastructureTableRowActionMenu label={MANAGER_CHURN_RECOVERY_TABLE_HEADERS[6]} testId={`manager_communications-communications-managerchurnrecoverytablerow-row-${member.memberId}-actions-menu`}>
        {!member.recovered && (
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-subtle text-primary motion-safe:transition-all motion-safe:hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_communications-manager-churn-recovery-button-close"
            type="button"
            aria-label={t("TEXT_SEND_WINBACK_MESSAGE", { value: member.name })}
            onClick={(e) => { e.stopPropagation(); onOpenComposer(member.memberId); }}
            
          >
            <Send size={18} strokeWidth={2}/>{t("COPY_WIN_BACK_1")}</button>
        )}
        </ManagerInfrastructureTableRowActionMenu>
      </td>
    </tr>
  );
}
