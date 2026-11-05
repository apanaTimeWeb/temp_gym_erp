// RESPONSIBILITY: Renders the header for the owner-owned churn-recovery composer drawer.
'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ManagerCommunicationsCampaignsChurnRecoveryComposerProps } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_campaigns_churn_recovery_composer.types';

type Props = Pick<ManagerCommunicationsCampaignsChurnRecoveryComposerProps, 'member'> & { onClose: () => void };

export default function ManagerCommunicationsCampaignsChurnRecoveryComposerHeader({ member, onClose }: Props) {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');
  return (
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-base font-bold text-text-primary">{t("COPY_WIN_BACK_MESSAGE")}</h2>
            {member && (
              <p className="text-xs text-text-secondary mt-0.5">{t("COPY_SENDING_1")}<span className="text-text-primary font-medium">{member.name}</span>
                <span className="ml-2 text-warning-text">({member.daysSinceExit}{t("COPY_DAYS_SINCE_EXIT")}</span>
              </p>
            )}
          </div>
          <button data-testid="manager_communications-manager-churn-recovery-close-1"
            type="button"
            onClick={onClose}
            aria-label={t("COPY_CLOSE_COMPOSER")}
            className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-input motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

  );
}
