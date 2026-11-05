// RESPONSIBILITY: Renders ManagerCommunicationsChurnRecoveryEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** @description Empty state shown when no churned members exist — positive framing with a motivational message. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerCommunicationsCampaignsChurnRecoveryEmptyState() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div data-testid="manager_communications-manager-churn-recovery-status" className="w-16 h-16 rounded-full bg-success-bg flex items-center justify-center mb-4">
        <ShieldCheck size={18} strokeWidth={2} className="text-success-text"/>
      </div>
      <h3 className="text-base font-semibold text-text-primary">{t("COPY_NO_LOST_MEMBERS")}</h3>
      <p className="text-sm text-text-secondary mt-1 max-w-xs">{t("COPY_GREAT_RETENTION_NO_EXITED_MEMBERS_FOUND_BRANCH_KEEP_UP")}</p>
    </div>
  );
}
