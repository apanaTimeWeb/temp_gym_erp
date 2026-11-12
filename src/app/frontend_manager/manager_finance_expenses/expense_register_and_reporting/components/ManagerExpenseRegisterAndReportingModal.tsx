// RESPONSIBILITY: Renders ManagerExpenseRegisterAndReportingModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useEffect, useRef, useState } from 'react';
import { Loader2, X, Save, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { EXPENSE_CATEGORIES, EXPENSE_STATUS_LABELS, MANAGER_EXPENSE_MAX_AMOUNT_MAJOR_UNITS } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';
import { useManagerExpenseRegisterAndReportingForm } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/hooks/useManagerExpenseRegisterAndReportingForm';


/** @description Renders the ManagerExpenseRegisterAndReportingModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerExpenseRegisterAndReportingModal() {
  const t = useTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');

  const { showModal, editId, form, handleClose, submit } = useManagerExpenseRegisterAndReportingForm();
  const { register, control, formState: { errors, isSubmitting } } = form;
  const [receiptFileName, setReceiptFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const handleCloseRef = useRef(handleClose);
  handleCloseRef.current = handleClose;

  useEffect(() => {
    if (!showModal) {
      setReceiptFileName(null);
      setFileError(null);
    }
  }, [showModal]);

  const handleReceiptFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileError(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setFileError('Invalid file type. Please upload a PDF, PNG, JPG, or WEBP file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds 5MB limit.');
      return;
    }
    setReceiptFileName(file.name);
    const mockStorageUrl = `https://storage.internal/receipts/${encodeURIComponent(file.name)}`;
    form.setValue('receiptUrl', mockStorageUrl, { shouldValidate: true, shouldDirty: true });
  };

  const handleRemoveReceiptFile = () => {
    setReceiptFileName(null);
    setFileError(null);
    form.setValue('receiptUrl', '', { shouldValidate: true, shouldDirty: true });
  };

  useEffect(() => {
    if (!showModal) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const getFocusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter((element) => !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true');
    (getFocusable()[0] ?? dialog).focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); handleCloseRef.current(); return; }
      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      if (!focusable.length) { event.preventDefault(); dialog.focus(); return; }
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    dialog.addEventListener('keydown', onKeyDown);
    return () => { dialog.removeEventListener('keydown', onKeyDown); if (previouslyFocused?.isConnected) previouslyFocused.focus(); };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop overflow-y-auto">
      <div ref={dialogRef} tabIndex={-1} className="my-auto bg-overlay rounded-2xl shadow-dialog w-full max-w-md border border-border max-h-dialog-desktop flex flex-col outline-none overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="managerexpensesmodal-dialog-title">
        <div className="shrink-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between z-20 rounded-t-2xl">
          <h3 className="text-lg font-bold text-text-primary" id="managerexpensesmodal-dialog-title">{editId ? t('COPY_EDIT_EXPENSE') : t('COPY_ADD_EXPENSE')}</h3>
          <button data-testid="manager_expenses-manager-expenses-modal-close-1"
            type="button"
            onClick={handleClose}
            className="p-2 rounded-lg motion-safe:transition-all hover:bg-primary-subtle text-text-secondary motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
            aria-label={t("COPY_CLOSE_MODAL")}
          >
            <X size={18} strokeWidth={2}/>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 min-h-0 custom-scrollbar">
          <form data-testid="manager_expenses-managerexpensesmodal-form-1" onSubmit={submit} className="p-6 space-y-4">
            <div>
              <label htmlFor="manager-managerexpensesmodal-field-1" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_TITLE")}</label>
              <input id="manager-managerexpensesmodal-field-1" data-testid="manager_expenses-manager-expenses-modal-input-text-1"
                type="text"
                placeholder={t("COPY_E_G_OCTOBER_ELECTRICITY_BILL")}
                {...register('title')}
                className={[`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all ${
                  errors.title ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                }`, "motion-safe:duration-200 ease-in-out"].filter(Boolean).join(' ')} aria-invalid={errors.title ? 'true' : undefined} aria-describedby={errors.title ? 'managerexpensesmodal-title-error' : undefined} />
              {errors.title && <p id="managerexpensesmodal-title-error" className="text-danger-text text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_CATEGORY")}</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <ManagerSearchableDropdown ariaLabel={t("COPY_CATEGORY")} ariaInvalid={Boolean(errors.category)} ariaDescribedBy={errors.category ? 'managerexpensesmodal-category-error' : undefined} dataTestId="manager_expenses-managerexpensesmodal-managersearchabledropdown-1"
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={EXPENSE_CATEGORIES.map(c => ({ label: c, value: c }))}
                    placeholder={t("COPY_SELECT_CATEGORY")}
                   data-testid="manager_expenses-managerexpensesmodal-searchable-dropdown-1"/>
                )}
              />
              {errors.category && <p id="managerexpensesmodal-category-error" className="text-danger-text text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="manager-managerexpensesmodal-field-2" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_AMOUNT")}</label>
                <input id="manager-managerexpensesmodal-field-2" data-testid="manager_expenses-manager-expenses-modal-input-number"
                  type="number"
                  min="0"
                  max={MANAGER_EXPENSE_MAX_AMOUNT_MAJOR_UNITS}
                  step="0.01"
                  placeholder={t("TEXT_AMOUNT_EXAMPLE")}
                  {...register('amount', { valueAsNumber: true })}
                  className={[`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all ${
                    errors.amount ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                  }`, "motion-safe:duration-200 ease-in-out"].filter(Boolean).join(' ')} aria-invalid={errors.amount ? 'true' : undefined} aria-describedby={errors.amount ? 'managerexpensesmodal-amount-error' : undefined} />
                {errors.amount && <p id="managerexpensesmodal-amount-error" className="text-danger-text text-xs mt-1">{errors.amount.message}</p>}
              </div>
              <div>
                <label htmlFor="manager-managerexpensesmodal-field-3" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_DATE")}</label>
                <input id="manager-managerexpensesmodal-field-3" data-testid="manager_expenses-manager-expenses-modal-input-date"
                  type="date"
                  {...register('date')}
                  className={[`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all ${
                    errors.date ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                  }`, "motion-safe:duration-200 ease-in-out"].filter(Boolean).join(' ')} aria-invalid={errors.date ? 'true' : undefined} aria-describedby={errors.date ? 'managerexpensesmodal-date-error' : undefined} />
                {errors.date && <p id="managerexpensesmodal-date-error" className="text-danger-text text-xs mt-1">{errors.date.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="manager-managerexpensesmodal-field-4" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_STATUS")}</label>
              <select id="manager-managerexpensesmodal-field-4" data-testid="manager_expenses-manager-expenses-modal-select-option"
                {...register('status')}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all border-border focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out"
              >
                {Object.entries(EXPENSE_STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val} data-testid="manager_expenses-managerexpensesmodal-interactive">{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="manager-managerexpensesmodal-field-5" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_REFERENCE_INVOICE_NO_OPTIONAL")}</label>
              <input id="manager-managerexpensesmodal-field-5" data-testid="manager_expenses-manager-expenses-modal-input-text-2"
                type="text"
                placeholder={t("COPY_E_G_INV_2023_001")}
                {...register('referenceNo')}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all border-border focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="manager-managerexpensesmodal-field-6" className="block text-sm font-medium text-text-secondary">{t("COPY_RECEIPT_URL_OPTIONAL")}</label>
                <label htmlFor="manager-expense-receipt-file" className="text-xs font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1">
                  <Upload size={13} strokeWidth={2} />
                  <span>Upload Receipt</span>
                </label>
                <input
                  id="manager-expense-receipt-file"
                  data-testid="manager_expenses-receipt-file-input"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,application/pdf"
                  className="hidden"
                  onChange={handleReceiptFileUpload}
                />
              </div>
              <input id="manager-managerexpensesmodal-field-6" data-testid="manager_expenses-manager-expenses-modal-input-value"
                type="url"
                placeholder={t("COPY_HTTPS_EXAMPLE_COM_RECEIPT_JPG")}
                {...register('receiptUrl')}
                className={[`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all ${
                  errors.receiptUrl ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                }`, "motion-safe:duration-200 ease-in-out"].filter(Boolean).join(' ')} aria-invalid={errors.receiptUrl ? 'true' : undefined} aria-describedby={errors.receiptUrl ? 'managerexpensesmodal-receiptUrl-error' : undefined} />
              {receiptFileName && (
                <div className="mt-2 flex items-center justify-between px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-text-secondary">
                  <span className="truncate max-w-[240px]">📎 {receiptFileName}</span>
                  <button type="button" onClick={handleRemoveReceiptFile} className="text-danger hover:underline ml-2">Remove</button>
                </div>
              )}
              {fileError && <p className="text-danger-text text-xs mt-1">{fileError}</p>}
              {errors.receiptUrl && (
                <p className="text-danger-text text-xs mt-1">{errors.receiptUrl.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="manager-managerexpensesmodal-field-7" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_NOTES_OPTIONAL")}</label>
              <textarea id="manager-managerexpensesmodal-field-7" data-testid="manager_expenses-manager-expenses-modal-textarea-message-input"
                rows={3}
                placeholder={t("COPY_ANY_ADDITIONAL_DETAILS")}
                {...register('notes')}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all border-border focus-visible:ring-focus-ring resize-none motion-safe:duration-200 ease-in-out"
              />
            </div>

            <div className="sticky bottom-0 bg-overlay pt-3 pb-1 border-t border-border flex gap-3 z-10">
              <button data-testid="manager_expenses-manager-expenses-modal-close-2"
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
              >{t("COPY_CANCEL")}</button>
              <button data-testid="manager_expenses-manager-expenses-modal-button-submit"
                type="submit"
                disabled={isSubmitting}
                className="min-w-32 flex-1 py-2.5 rounded-xl text-sm font-bold bg-primary text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
              >
                {(() => { if (isSubmitting) { return <Loader2 size={18} strokeWidth={2} className="text-on-primary motion-safe:animate-spin" />; } return <><Save size={18} strokeWidth={2}/>{editId ? t('COPY_UPDATE') : t('CONFIRM_EXPENSE_SAVE')}</>; })()
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
