// RESPONSIBILITY: Renders the Lead Profile / Details slide-over drawer for an inquiry; mutation and state remain in module-owned hooks.
'use client';
import { useRef } from 'react';
import { X, Phone, Mail, MessageCircle, Calendar, UserCheck, Edit2, Tag, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { useManagerInquiriesPipelineUiStore } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/state/useManagerInquiriesPipelineUiStore';
import { useManagerInquiriesPipelineLogic } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineLogic';
import { ManagerInquiriesPipelineDisplayValue, ManagerInquiriesPipelineFormatDate, ManagerInquiriesPipelineMaskSensitiveData } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineFormatters';
import { INQUIRIES_STATUS_LABEL_KEYS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_shared.constants';

export default function ManagerInquiriesPipelineLeadDetailsDrawer() {
  const t = useTranslations('MANAGER_INQUIRIES_PIPELINE');
  const selectedLead = useManagerInquiriesPipelineUiStore((state) => state.selectedLead);
  const setSelectedLead = useManagerInquiriesPipelineUiStore((state) => state.setSelectedLead);
  const setConvertLead = useManagerInquiriesPipelineUiStore((state) => state.setConvertLead);
  const { openEdit, openMsg } = useManagerInquiriesPipelineLogic();

  const drawerRef = useRef<HTMLDivElement>(null);
  useManagerInfrastructureDialogFocusTrap({
    dialogRef: drawerRef,
    isOpen: Boolean(selectedLead),
    onClose: () => setSelectedLead(null),
  });

  if (!selectedLead) return null;

  const closeDrawer = () => setSelectedLead(null);

  const statusLabel = INQUIRIES_STATUS_LABEL_KEYS[selectedLead.status as keyof typeof INQUIRIES_STATUS_LABEL_KEYS]
    ? t(INQUIRIES_STATUS_LABEL_KEYS[selectedLead.status as keyof typeof INQUIRIES_STATUS_LABEL_KEYS])
    : selectedLead.status;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-overlay-backdrop backdrop-blur-xs motion-safe:transition-opacity"
      role="presentation"
      onClick={closeDrawer}
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="manager-inquiries-lead-details-title"
        data-testid="manager_inquiries-lead-details-drawer"
        className="w-full max-w-lg bg-card border-l border-border h-full shadow-2xl flex flex-col overflow-hidden motion-safe:animate-in motion-safe:slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 p-6 border-b border-border bg-overlay flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl bg-primary-subtle text-primary shrink-0 ring-2 ring-primary/20">
              {selectedLead.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 id="manager-inquiries-lead-details-title" className="text-xl font-bold text-text-primary truncate">
                {ManagerInquiriesPipelineDisplayValue(selectedLead.name)}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-primary/20">
                  {statusLabel}
                </span>
                {selectedLead.source && (
                  <span className="inline-flex items-center gap-1 text-xs text-text-secondary bg-input px-2 py-0.5 rounded border border-border">
                    <Tag size={12} aria-hidden="true" />
                    {selectedLead.source}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            data-testid="manager_inquiries-lead-details-button-close"
            aria-label={t('COPY_CLOSE')}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {/* Quick Contact Info */}
          <div className="bg-surface rounded-xl p-4 border border-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-text-primary">
                <Phone size={16} className="text-primary shrink-0" aria-hidden="true" />
                <span className="font-mono">{ManagerInquiriesPipelineMaskSensitiveData(selectedLead.phone, 'phone')}</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary">
                <Mail size={16} className="text-info shrink-0" aria-hidden="true" />
                <span className="truncate">{selectedLead.email ? ManagerInquiriesPipelineMaskSensitiveData(selectedLead.email, 'email') : 'No email'}</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary sm:col-span-2">
                <Calendar size={16} className="text-warning-text shrink-0" aria-hidden="true" />
                <span>Next Follow-up: <strong>{selectedLead.followUpDate ? ManagerInquiriesPipelineFormatDate(selectedLead.followUpDate) : 'Not scheduled'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary sm:col-span-2 text-xs">
                <Clock size={14} className="text-text-muted shrink-0" aria-hidden="true" />
                <span>Inquiry Created: {ManagerInquiriesPipelineFormatDate(selectedLead.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Interest & Notes */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Program / Fitness Interest</h3>
              <p className="text-sm font-medium text-text-primary bg-input p-3 rounded-lg border border-border">
                {selectedLead.interest || 'General Fitness & Gym Membership'}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Manager & Counselor Notes</h3>
              <div className="text-sm text-text-primary bg-input p-3 rounded-lg border border-border whitespace-pre-wrap min-h-20">
                {selectedLead.notes || 'No remarks recorded for this inquiry yet.'}
              </div>
            </div>
          </div>

          {/* Follow-up Timeline */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">Interaction History</h3>
            {selectedLead.followUpLogs && selectedLead.followUpLogs.length > 0 ? (
              <div className="relative pl-6 border-l-2 border-primary/30 space-y-4">
                {selectedLead.followUpLogs.map((log, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-card" />
                    <p className="text-xs font-semibold text-text-secondary">{ManagerInquiriesPipelineFormatDate(log.date)}</p>
                    <p className="text-sm text-text-primary mt-0.5">{log.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-muted italic bg-input/50 p-3 rounded-lg border border-border/50">
                No past interactions recorded. Use WhatsApp or Email below to log communications.
              </p>
            )}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="shrink-0 p-4 border-t border-border bg-overlay flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openMsg(selectedLead, 'whatsapp')}
              title={t('COPY_WHATSAPP')}
              className="p-2.5 rounded-lg bg-success text-on-success hover:brightness-110 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => openMsg(selectedLead, 'email')}
              title={t('COPY_EMAIL_1')}
              className="p-2.5 rounded-lg bg-info text-on-info hover:brightness-110 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <Mail size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => { closeDrawer(); openEdit(selectedLead); }}
              title={t('COPY_EDIT')}
              className="p-2.5 rounded-lg bg-input text-text-primary hover:bg-surface-hover active:scale-95 transition-all border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <Edit2 size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => { closeDrawer(); setConvertLead(selectedLead); }}
            data-testid="manager_inquiries-lead-details-button-convert"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:brightness-110 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <UserCheck size={18} strokeWidth={2} aria-hidden="true" />
            {t('COPY_CONVERT_MEMBER_2')}
          </button>
        </div>
      </div>
    </div>
  );
}

