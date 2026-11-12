// RESPONSIBILITY: Renders ManagerInquiriesPipelineConvertLeadSuccess's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { MANAGER_INQUIRIES_PIPELINE_API } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/config/manager_inquiries_pipeline.url_config';
import { CheckCircle2, Phone } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';



import { ManagerInquiriesPipelineFormatCurrency, ManagerInquiriesPipelineFormatDate } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineFormatters';
import type { ManagerInquiriesPipelineConvertLeadSuccessProps } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_convert_lead_success.types';




/** @description Renders the ManagerInquiriesPipelineConvertLeadSuccess component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerInquiriesPipelineConvertLeadSuccess({ successData, closeConvert }: ManagerInquiriesPipelineConvertLeadSuccessProps) {
  const t = useTranslations('MANAGER_INQUIRIES_PIPELINE');
  const locale = useLocale();

  const handleSendWhatsApp = () => {
    if (!successData || !successData.phone) return;
    const rawPhone = successData.phone.replace(/\D/g, '');
    const cleanPhone = rawPhone.startsWith('91') && rawPhone.length === 12
      ? rawPhone
      : rawPhone.length === 10
      ? `91${rawPhone}`
      : rawPhone;
    const target = cleanPhone ? `/${cleanPhone}` : '';
    // Aadhaar is sensitive identity data and must never be included in an external messaging URL.
    const aadhaarLine = '';
    const message = t('TEXT_WHATSAPP_ADMISSION_MESSAGE', {
      name: successData.name,
      gymName: ManagerEnvConfig.gymName,
      gymId: successData.gymId,
      planName: successData.planName,
      aadhaarLine,
      joinDate: ManagerInquiriesPipelineFormatDate(successData.joinDate),
      expiryDate: ManagerInquiriesPipelineFormatDate(successData.expiryDate),
      paidAmount: ManagerInquiriesPipelineFormatCurrency(successData.paidAmount, ManagerEnvConfig.currencyCode, locale),
      pendingAmount: ManagerInquiriesPipelineFormatCurrency(successData.pendingAmount, ManagerEnvConfig.currencyCode, locale),
    });
    
    const popup = window.open(`${MANAGER_INQUIRIES_PIPELINE_API.INTEGRATIONS.WHATSAPP_WEB_BASE}${target}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    if (popup) popup.opener = null;
  };

  return (
    <div className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4 overflow-y-auto">
      <div role="dialog" aria-modal="true" aria-labelledby="manager-inquiries-convert-lead-success-title" className="my-auto bg-card rounded-2xl shadow-card w-full max-w-md overflow-hidden border-2 border-success motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <div className="px-8 py-8 flex flex-col items-center text-center">
          <div data-testid="manager_inquiries-convert-lead-modal-status-success" className="w-20 h-20 bg-success-bg text-success-text rounded-full flex items-center justify-center mb-5 border border-success">
            <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" />
          </div>
          <h3 id="manager-inquiries-convert-lead-success-title" className="text-2xl font-black text-text-primary mb-2 tracking-tight">{t("COPY_ADMISSION_SUCCESSFUL")}</h3>
          <p className="text-text-secondary mb-8 text-sm">
            <span className="font-semibold text-text-primary">{successData.name}</span>{t("COPY_NOW_MEMBER_GYM_ID")}<strong className="text-success-text">{successData.gymId}</strong>
          </p>
          
          <div className="w-full space-y-3 mb-8 text-left">
            <div className="bg-input p-4 rounded-xl border border-border">
              <p className="text-sm font-semibold text-text-primary mb-3 text-center">{t("COPY_SHARE_ADMISSION_DETAILS_MEMBER")}</p>
              <button data-testid="manager_inquiries-convert-lead-modal-send-whats-app"
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-success hover:bg-success text-on-success py-3 rounded-xl font-bold motion-safe:transition-all hover:shadow-card hover:shadow-card motion-safe:active:scale-95 motion-safe:duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
               type="button">
                <Phone size={18} strokeWidth={2} aria-hidden="true" />{t("COPY_SEND_WELCOME_WHATSAPP")}</button>
            </div>
          </div>

          <button data-testid="manager_inquiries-convert-lead-modal-convert"
            onClick={closeConvert}
            className="px-8 py-2.5 text-sm font-bold rounded-xl border border-border text-text-secondary hover:bg-primary-subtle hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
           type="button">{t("COPY_DONE_CLOSE")}</button>
        </div>
      </div>
    </div>
  );
}
