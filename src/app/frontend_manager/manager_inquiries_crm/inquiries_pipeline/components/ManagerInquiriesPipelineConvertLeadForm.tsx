// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Controller } from 'react-hook-form';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { INQUIRIES_CYCLE_OPTIONS_CUSTOM } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_convert.constants';
import { INQUIRIES_CYCLE_LABELS, INQUIRIES_GENDER_OPTIONS, MANAGER_INQUIRY_MAX_AMOUNT_MAJOR_UNITS, MANAGER_INQUIRY_MAX_CUSTOM_DAYS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_convert.constants';
import { ManagerInquiriesPipelineCalculatePriceForCycle as getPriceForCycleSnapshot } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineCalculatePriceForCycle';
import { ManagerInquiriesPipelineFormatCurrency } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineFormatters';
import type { ManagerInquiriesPipelineConvertLeadFormProps } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_convert_lead_form.types';
import type { ConvertLeadFormValues } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_form.types';




/** @description Renders the ManagerInquiriesPipelineConvertLeadForm component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (6 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerInquiriesPipelineConvertLeadForm({
  useFormReturn,
  plans,
  watchPlanId,
  watchBillingCycle,
  watchCustomDays
}: ManagerInquiriesPipelineConvertLeadFormProps) {
  const t = useTranslations('MANAGER_INQUIRIES_PIPELINE');
  const locale = useLocale();

  const { register, formState: { errors }, control } = useFormReturn;
  const selectedPlan = plans.find(p => p.id.toString() === watchPlanId?.toString());
  const todayDateInput = new Date().toISOString().split('T')[0] || '';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
      {[
        { label: t("COPY_FULL_NAME"), key: 'name', type: 'text', placeholder: t("TEXT_PLACEHOLDER_FULL_NAME"), fullWidth: true },
        { label: t("COPY_EMAIL_2"), key: 'email', type: 'email', placeholder: t("TEXT_PLACEHOLDER_EMAIL") },
        { label: t("COPY_PHONE"), key: 'phone', type: 'tel', placeholder: t("TEXT_PLACEHOLDER_PHONE") },
        { label: t("COPY_ADDRESS"), key: 'address', type: 'text', placeholder: t("TEXT_PLACEHOLDER_ADDRESS") },
        { label: t("COPY_AADHAAR_CARD"), key: 'aadhaar', type: 'text', placeholder: t("TEXT_PLACEHOLDER_AADHAAR_OPTIONAL") },
      ].map((f, mapIndex) => (
        <div key={f.key} className={f.fullWidth ? 'sm:col-span-2' : ''}>
          <label htmlFor={`manager-managerinquiriesconvertleadform-field-${f.key}`} className="block text-sm font-medium text-text-secondary mb-0.5">{f.label}</label>
          <input id={`manager-managerinquiriesconvertleadform-field-${f.key}`} className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200 ${
              errors[f.key as keyof ConvertLeadFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
            }`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerconvertleadform-input-primary-${mapIndex}`}
            type={f.type}
            placeholder={f.placeholder}
            maxLength={(() => { if (f.key === 'phone') return 10; return (() => { if (f.key === 'aadhaar') return 12; return undefined; })(); })()}
            onKeyDown={(e) => {
              if (f.key === 'phone' || f.key === 'aadhaar') {
                if (['e', 'E', '-', '+', '.'].includes(e.key)) e.preventDefault();
                if (e.key.length === 1 && !/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
              }
            }}
            {...register(f.key as keyof ConvertLeadFormValues)}
            
          />
          {errors[f.key as keyof ConvertLeadFormValues] && (
            <p className="text-danger-text text-xs mt-0.5">{errors[f.key as keyof ConvertLeadFormValues]?.message as string}</p>
          )}
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_GENDER")}</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <ManagerSearchableDropdown ariaLabel={t("COPY_GENDER")} ariaInvalid={Boolean(errors.gender)} ariaDescribedBy={errors.gender ? 'managerinquiriesconvertleadform-gender-error' : undefined} dataTestId="manager_inquiries-managerinquiriesconvertleadform-managersearchabledropdown-1" value={field.value || ''} onChange={field.onChange} options={INQUIRIES_GENDER_OPTIONS}  data-testid="manager_inquiries-managerinquiriesconvertleadform-searchable-dropdown-1"/>
          )}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_PLAN")}</label>
        <Controller
          name="planId"
          control={control}
          render={({ field }) => (
            <ManagerSearchableDropdown ariaLabel={t("COPY_PLAN")} ariaInvalid={Boolean(errors.planId)} ariaDescribedBy={errors.planId ? 'managerinquiriesconvertleadform-planId-error' : undefined} dataTestId="manager_inquiries-managerinquiriesconvertleadform-managersearchabledropdown-2"
              options={plans.map((p) => ({ value: String(p.id), label: String(p.name) }))}
              value={field.value}
              onChange={field.onChange}
              placeholder={t("COPY_SELECT_PLAN_1")}
             data-testid="manager_inquiries-managerinquiriesconvertleadform-searchable-dropdown-2"/>
          )}
        />
        {errors.planId && <p id="managerinquiriesconvertleadform-planId-error" className="text-danger-text text-xs mt-0.5">{errors.planId?.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_BILLING_CYCLE")}</label>
        <Controller
          name="billingCycle"
          control={control}
          render={({ field }) => (
            <ManagerSearchableDropdown ariaLabel={t("COPY_BILLING_CYCLE")} ariaInvalid={Boolean(errors.billingCycle)} ariaDescribedBy={errors.billingCycle ? 'managerinquiriesconvertleadform-billingCycle-error' : undefined} dataTestId="manager_inquiries-managerinquiriesconvertleadform-managersearchabledropdown-3"
              value={field.value || ''}
              onChange={field.onChange}
              options={Object.entries(INQUIRIES_CYCLE_LABELS).map(([val, label]) => ({ label: String(label), value: val }))}
             data-testid="manager_inquiries-managerinquiriesconvertleadform-searchable-dropdown-3"/>
          )}
        />
      </div>
      {watchBillingCycle === INQUIRIES_CYCLE_OPTIONS_CUSTOM && (
        <div>
          <label htmlFor="manager-managerinquiriesconvertleadform-field-2" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_CUSTOM_DAYS")}</label>
          <input id="manager-managerinquiriesconvertleadform-field-2" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200 ${
              errors.customDays ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
            }`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-convert-lead-modal-input-number-1"
            type="number"
            min="1"
            max={MANAGER_INQUIRY_MAX_CUSTOM_DAYS}
            step="1"
            onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
            {...register('customDays', { valueAsNumber: true })}
            placeholder={t("COPY_E_G_15")}
            
          />
          {errors.customDays && <p id="managerinquiriesconvertleadform-customDays-error" className="text-danger-text text-xs mt-0.5">{errors.customDays?.message as string}</p>}
        </div>
      )}

      {watchPlanId && (
        <div data-testid="manager_inquiries-convert-lead-modal-status-billing-summary" className="sm:col-span-2 bg-warning-bg rounded-xl p-3 text-sm border border-warning flex justify-between items-center">
          <div>
            <span className="font-semibold text-warning-text">{t("COPY_CALCULATED_PRICE")}</span>
            <span className="text-warning-text ml-1 font-bold">
              {ManagerInquiriesPipelineFormatCurrency(getPriceForCycleSnapshot(selectedPlan, watchBillingCycle || '', Number(watchCustomDays) || 0), ManagerEnvConfig.currencyCode, locale)}
            </span>
          </div>
          {watchBillingCycle === INQUIRIES_CYCLE_OPTIONS_CUSTOM && (
            <div className="text-warning-text text-xs opacity-80">{t("COPY_PER_DAY")}{ManagerInquiriesPipelineFormatCurrency(selectedPlan?.priceCustom || 0, ManagerEnvConfig.currencyCode, locale)} × {watchCustomDays || 0}{t("COPY_DAYS")}</div>
          )}
        </div>
      )}

      <div>
        <label htmlFor="manager-managerinquiriesconvertleadform-field-3" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_JOIN_DATE")}</label>
        <input id="manager-managerinquiriesconvertleadform-field-3" data-testid="manager_inquiries-convert-lead-modal-input-date-1" type="date" min={todayDateInput} {...register('joinDate')} className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200" />
      </div>
      <div>
        <label htmlFor="manager-managerinquiriesconvertleadform-field-4" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_EXPIRY_DATE")}<span className="text-danger-text">*</span></label>
        <input id="manager-managerinquiriesconvertleadform-field-4" data-testid="manager_inquiries-convert-lead-modal-input-date-2" type="date" readOnly min={todayDateInput} {...register('expiryDate')} className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none bg-input text-text-primary opacity-50 cursor-not-allowed motion-safe:transition-all motion-safe:duration-200" />
      </div>

      <div>
        <label htmlFor="manager-managerinquiriesconvertleadform-field-5" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_TOTAL_PLAN_AMOUNT")}</label>
        <input id="manager-managerinquiriesconvertleadform-field-5" data-testid="manager_inquiries-convert-lead-modal-input-number-2" type="number" min="0" max={MANAGER_INQUIRY_MAX_AMOUNT_MAJOR_UNITS} step="0.01" readOnly {...register('totalAmount', { valueAsNumber: true })} className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none bg-input opacity-50 cursor-not-allowed text-text-primary" />
      </div>
      <div>
        <label htmlFor="manager-managerinquiriesconvertleadform-field-6" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_AMOUNT_PAID")}</label>
        <input id="manager-managerinquiriesconvertleadform-field-6" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-convert-lead-modal-input-number-3" type="number" min="0" max={MANAGER_INQUIRY_MAX_AMOUNT_MAJOR_UNITS} step="0.01" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }} {...register('paidAmount', { valueAsNumber: true })}  />
      </div>
    </div>
  );
}
