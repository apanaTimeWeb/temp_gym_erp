// RESPONSIBILITY: Presents plan, billing, calculated amount and date fields for the member form.
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';
import { BILLING_CYCLE_CUSTOM } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_billing_cycle.constants';
import { MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS, MANAGER_MEMBER_MAX_CUSTOM_DAYS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_validation.constants';
import { MEMBERS_CYCLE_LABELS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_ui.constants';
import { ManagerMembersDirectoryCalculatePriceForCycle as getPriceForCycle } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCalculatePriceForCycle';
import { ManagerMembersDirectoryFormatCurrency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';
import type { useManagerMembersDirectoryModalForm } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryModalForm';
import type { PlanWithCustom } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';
type FormState = ReturnType<typeof useManagerMembersDirectoryModalForm>;
type Props = { formState: FormState; editId: string | null; plans: PlanWithCustom[] };
export default function ManagerMembersDirectoryModalMembershipFields({ formState, editId, plans }: Props) {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const locale = useLocale();
  const { useFormReturn, register, errors, watchPlanId, watchBillingCycle, watchCustomDays, selectedPlan } = formState;
  return (
    <>
            <div className={editId ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_PLAN_3")}</label>
              <Controller
                name="planId"
                control={useFormReturn.control}
                render={({ field }) => (
                  <ManagerSearchableDropdown ariaLabel={t("COPY_PLAN_3")} dataTestId="manager_members-managermembersmodal-managersearchabledropdown-3"
                    options={plans.map(p => ({ value: p.id, label: p.name }))}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t("COPY_SELECT_PLAN_2")}
                    disabled={!!editId}
                   data-testid="manager_members-managermembersmodal-searchable-dropdown-3"/>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_BILLING_CYCLE_2")}</label>
              <Controller
                name="billingCycle"
                control={useFormReturn.control}
                render={({ field }) => (
                  <ManagerSearchableDropdown ariaLabel={t("COPY_BILLING_CYCLE_2")} dataTestId="manager_members-managermembersmodal-managersearchabledropdown-4"
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={Object.entries(MEMBERS_CYCLE_LABELS).map(([val, labelKey]) => ({ label: t(labelKey), value: val }))}
                    disabled={!!editId}
                   data-testid="manager_members-managermembersmodal-searchable-dropdown-4"/>
                )}
              />
            </div>
            {watchBillingCycle === BILLING_CYCLE_CUSTOM && (
              <div>
                <label htmlFor="manager-managermembersmodal-field-2" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_CUSTOM_DAYS_1")}</label>
                <input id="manager-managermembersmodal-field-2" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200 ${
                    errors.customDays ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                  } ${editId ? 'border-dashed border-border' : ''}`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-manager-members-modal-input-number-1"
                  type="number"
                  min="1"
                  max={MANAGER_MEMBER_MAX_CUSTOM_DAYS}
                  step="1"
                  readOnly={!!editId}
                  onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                  {...register('customDays')}
                  placeholder={t("COPY_E_G_15")} aria-invalid={errors.customDays ? 'true' : undefined} aria-describedby={errors.customDays ? 'managermembersmodal-customDays-error' : undefined} />
                {errors.customDays && (
                  <p className="text-danger-text text-xs mt-0.5">{errors.customDays?.message as string}</p>
                )}
              </div>
            )}

            {watchPlanId && (
              <div data-testid="manager_members-manager-members-modal-status" className="sm:col-span-2 bg-warning-bg rounded-xl p-4 text-sm border border-warning flex justify-between items-center">
                <div>
                  <span className="font-semibold text-warning-text">{t("COPY_CALCULATED_PRICE")}</span>
                  <span className="text-warning-text ml-1 font-bold">
                    {ManagerMembersDirectoryFormatCurrency(getPriceForCycle(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0), ManagerEnvConfig.currencyCode, locale)}
                  </span>
                </div>
                {watchBillingCycle === BILLING_CYCLE_CUSTOM && (
                  <div className="text-warning-text text-xs opacity-80">{t("COPY_PER_DAY")}{ManagerMembersDirectoryFormatCurrency(selectedPlan?.priceCustom || 0, ManagerEnvConfig.currencyCode, locale)} × {watchCustomDays || 0}{t("COPY_DAYS_2")}</div>
                )}
              </div>
            )}

            <div>
              <label htmlFor="manager-managermembersmodal-field-3" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_JOIN_DATE_1")}</label>
              <input id="manager-managermembersmodal-field-3" data-testid="manager_members-manager-members-modal-input-date-1"
                type="date"
                readOnly={!!editId}
                {...register('joinDate')}
                className={`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200 ${editId ? 'border-dashed border-border' : ''}`}
              />
            </div>
            <div>
              <label htmlFor="manager-managermembersmodal-field-4" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_EXPIRY_DATE_4")}</label>
              <input id="manager-managermembersmodal-field-4" data-testid="manager_members-manager-members-modal-input-date-2"
                type="date"
                readOnly
                {...register('expiryDate')}
                className="w-full border border-dashed rounded-xl px-4 py-2 text-sm focus-visible:outline-none bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200 cursor-default"
              />
            </div>

            <div>
              <label htmlFor="manager-managermembersmodal-field-5" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_TOTAL_PLAN_AMOUNT_2")}{ManagerMembersDirectoryFormatCurrency(0, ManagerEnvConfig.currencyCode, locale).replace(/0/g, '').trim()})</label>
              <input id="manager-managermembersmodal-field-5" data-testid="manager_members-manager-members-modal-input-number-2"
                type="number"
                min="0"
                max={MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS}
                step="0.01"
                readOnly
                {...register('totalAmount', { valueAsNumber: true })}
                className="w-full border border-dashed border-border rounded-xl px-4 py-2 text-sm focus-visible:outline-none bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200 cursor-default"
              />
            </div>
            <div>
              <label htmlFor="manager-managermembersmodal-field-6" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_AMOUNT_PAID_2")}{ManagerMembersDirectoryFormatCurrency(0, ManagerEnvConfig.currencyCode, locale).replace(/0/g, '').trim()})</label>
              <input id="manager-managermembersmodal-field-6" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200 ${editId ? 'border-dashed border-border' : ''}`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-manager-members-modal-input-number-3"
                type="number"
                min="0"
                max={MANAGER_MEMBER_MAX_AMOUNT_MAJOR_UNITS}
                step="0.01"
                readOnly={!!editId}
                onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault(); }}
                {...register('paidAmount', { valueAsNumber: true })}
                
              />
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="manager-managermembersmodal-field-7" className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_MEDICAL_HISTORY_NOTES_OPTIONAL")}</label>
              <textarea id="manager-managermembersmodal-field-7" data-testid="manager_members-manager-members-modal-textarea-message-input"
                rows={2}
                placeholder={t("COPY_E_G_ASTHMA_KNEE_INJURY_HIGH_BP")}
                {...register('medicalHistory')}
                className="w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200 border-border focus-visible:ring-focus-ring"
              />
            </div>
    </>
  );
}
