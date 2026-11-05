// RESPONSIBILITY: Renders ManagerCommunicationsCampaignsAutomations's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';

import { Loader2, Zap, Settings, MessageSquare, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerCommunicationsAutomationsEmptyState from '@/app/frontend_manager/manager_communications/communications_automations/components/ManagerCommunicationsAutomationsEmptyState';

import { useManagerCommunicationsCampaignsLogic } from '@/app/frontend_manager/manager_communications/communications_automations/hooks/useManagerCommunicationsAutomationsLogic';
import type { CommAutomation } from '@/app/frontend_manager/manager_communications/communications_automations/types/manager_communications_communications_automations.types';


/** @description Renders the ManagerCommunicationsCampaignsAutomations component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerCommunicationsCampaignsAutomations() {
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');

  const { automations, automationsLoading, updateAutomation, isUpdatingAutomation } = useManagerCommunicationsCampaignsLogic();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftMessage, setDraftMessage] = useState('');
  const [draftTime, setDraftTime] = useState('');

  if (automationsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
        <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin mb-4 text-primary" />
        <p className="text-sm font-medium">{t("COPY_LOADING_AUTOMATIONS")}</p>
      </div>
    );
  }

  const handleToggle = (auto: CommAutomation) => {
    updateAutomation(auto.id, { enabled: !auto.enabled });
  };

  const startEditing = (auto: CommAutomation) => {
    setEditingId(auto.id);
    setDraftMessage(auto.messageTemplate);
    setDraftTime(auto.sendTime);
  };

  const saveEditing = (id: string) => {
    updateAutomation(id, { messageTemplate: draftMessage, sendTime: draftTime });
    // The owning logic hook exposes a fire-and-forget mutation, not an awaitable success result.
    // Keep the editor/draft open instead of discarding it before the request outcome is observable.
  };

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
      
      {/* Header Panel */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <div>
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Zap size={18} strokeWidth={2} className="text-warning-text fill-warning/20"/>{t("COPY_AUTOMATED_TRIGGERS")}</h2>
          <p className="text-sm text-text-secondary mt-1">{t("COPY_SET_UP_AUTOMATED_WHATSAPP_MESSAGES_RECURRING_MEMBER_EVENTS_LIKE")}</p>
        </div>
      </div>

      {/* Grid of Automation Cards */}
      {automations.length === 0 ? <ManagerCommunicationsAutomationsEmptyState /> : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {automations.map((auto, mapIndex) => {
          const isEditing = editingId === auto.id;

          return (
            <div key={auto.id} className={[`bg-card border rounded-xl overflow-hidden motion-safe:transition-all ${auto.enabled ? 'border-border-focus' : 'border-border'}`, "motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1"].filter(Boolean).join(' ')}>
              
              {/* Card Header */}
              <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-input">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${auto.enabled ? 'bg-primary-subtle text-primary' : 'bg-input text-text-secondary'}`}>
                    <Zap size={18} strokeWidth={2}/>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">{auto.title}</h3>
                    <p className="text-xs text-text-secondary mt-0.5">{auto.description}</p>
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`relative inline-flex h-6 w-11 items-center rounded-full motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                    auto.enabled ? 'bg-primary-subtle' : 'bg-input border border-border'
                  } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationsautomations-button-primary-${mapIndex}`}
                  onClick={() => handleToggle(auto)}
                  disabled={isUpdatingAutomation}
                  aria-label={auto.title}
                  aria-pressed={auto.enabled}
                 type="button">
                  <span
                    className={[`inline-block h-4 w-4 motion-safe:transform rounded-full bg-page motion-safe:transition-all ${
                      auto.enabled ? 'motion-safe:translate-x-6 motion-reduce:translate-x-6' : 'motion-safe:translate-x-1 motion-reduce:translate-x-1 bg-input'
                    }`, "motion-safe:duration-200 ease-in-out"].filter(Boolean).join(' ')}
                  />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                
                {(() => { if (isEditing) { return (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="manager-managercommunicationsautomations-field-1" className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                        <Clock size={18} strokeWidth={2}/>{t("COPY_SEND_TIME_2")}</label>
                      <input id="manager-managercommunicationsautomations-field-1" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationsautomations-input-send-time-${mapIndex}`}
                        type="time"
                        value={draftTime}
                        onChange={(e) => setDraftTime(e.target.value)}
                        
                      />
                    </div>
                    <div>
                      <label htmlFor="manager-managercommunicationsautomations-field-2" className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                        <MessageSquare size={18} strokeWidth={2}/>{t("COPY_WHATSAPP_TEMPLATE_2")}</label>
                      <textarea id="manager-managercommunicationsautomations-field-2" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring resize-none"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-communicationsautomations-textarea-whatsapp-template-${mapIndex}`}
                        value={draftMessage}
                        onChange={(e) => setDraftMessage(e.target.value)}
                        rows={4}
                        
                      />
                      <p className="text-xs text-text-secondary mt-1">{t("COPY_USE_1")}<code className="text-text-primary font-mono">{'{name}'}</code>{t("COPY_PERSONALIZE")}</p>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationsautomations-button-cancel-${mapIndex}`}
                        onClick={() => setEditingId(null)}
                        
                       type="button">{t("COPY_CANCEL_2")}</button>
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-w-32 flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold hover:bg-primary-hover motion-safe:transition-all disabled:opacity-50 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationsautomations-button-save-${mapIndex}`}
                        onClick={() => saveEditing(auto.id)}
                        disabled={isUpdatingAutomation}
                        
                       type="button">
                        {isUpdatingAutomation ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" /> : t('COPY_SAVE_CHANGES')}
                      </button>
                    </div>
                  </div>
                ); } return (
                  <div className="space-y-4 opacity-80 hover:opacity-100 motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                        <Clock size={18} strokeWidth={2}/>{t("COPY_SEND_TIME_1")}</label>
                      <p className="text-sm font-medium text-text-primary">{auto.sendTime}</p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                        <MessageSquare size={18} strokeWidth={2}/>{t("COPY_WHATSAPP_TEMPLATE_1")}</label>
                      <div className="bg-input border border-border rounded-lg p-3 text-sm text-text-secondary italic">
                        "{auto.messageTemplate}"
                      </div>
                    </div>
                    <div className="pt-2">
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-hover motion-safe:transition-all focus-visible:outline-none motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_communications-communications-managercommunicationsautomations-button-edit-configuration-${mapIndex}`}
                        onClick={() => startEditing(auto)}
                        
                       type="button">
                        <Settings size={18} strokeWidth={2}/>{t("COPY_EDIT_CONFIGURATION")}</button>
                    </div>
                  </div>
                ); })()}
                
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}
