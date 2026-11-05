// RESPONSIBILITY: Renders ManagerCommunicationsCampaignsSegmentPicker's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Users, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { COMM_SEGMENT_OPTIONS } from '@/app/frontend_manager/manager_communications/communications_compose/constants/manager_communications_campaigns_shared.constants';
import { useManagerCommunicationsCampaignsLogic } from '@/app/frontend_manager/manager_communications/communications_compose/hooks/useManagerCommunicationsComposeLogic';


/** @description Renders the ManagerCommunicationsCampaignsSegmentPicker component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerCommunicationsCampaignsSegmentPicker() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');

  const { selectedSegment, handleSegmentChange, segmentRecipients, loadingRecipients } = useManagerCommunicationsCampaignsLogic();

  return (
    <div className="space-y-2">
      <div id="manager-communications-compose-segment-label" className="block text-sm font-semibold text-text-secondary uppercase tracking-wider">{t("COPY_1_CHOOSE_AUDIENCE_SEGMENT")}</div>
      <div role="radiogroup" aria-labelledby="manager-communications-compose-segment-label" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {COMM_SEGMENT_OPTIONS.map((opt, mapIndex) => {
          const isActive = selectedSegment === opt.value;
          return (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-w-32 text-left p-4 rounded-xl border motion-safe:transition-all ${
                isActive
                  ? 'bg-primary-subtle border-primary text-primary'
                  : 'bg-card border-border text-text-secondary hover:border-border-focus hover:text-primary'
              } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationssegmentpicker-button-primary-${mapIndex}`}
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(event) => {
                if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
                event.preventDefault();
                const buttons = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]') ?? []);
                const currentIndex = buttons.indexOf(event.currentTarget);
                const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (currentIndex + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
                const nextButton = buttons[nextIndex];
                nextButton?.focus();
                nextButton?.click();
              }}
              onClick={() => handleSegmentChange(opt.value)}
              
            >
              <p className={`text-sm font-semibold ${isActive ? 'text-text-primary' : ''}`}>{opt.label}</p>
              <p className="text-xs mt-0.5 opacity-80">{opt.description}</p>
              {isActive && opt.value !== 'custom' && (
                <div className="flex items-center gap-1.5 mt-2">
                  {loadingRecipients ? (
                    <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin text-primary"/>
                  ) : (
                    <Users size={18} strokeWidth={2} className="text-primary"/>
                  )}
                  <span className="text-xs font-semibold text-text-primary">
                    {loadingRecipients ? t('COPY_LOADING') : `${segmentRecipients.length} recipients`}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
