// RESPONSIBILITY: Renders the optional Bank, Tax, Emergency Contact, and Login Access fieldsets for the Staff Directory modal.
'use client';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { StaffFormInput } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_payroll_and_attendance_form.types';

export interface ManagerStaffDirectoryStaffModalExtendedFieldsProps {
  register: UseFormRegister<StaffFormInput>;
  errors: FieldErrors<StaffFormInput>;
  t: (key: string) => string;
}

export default function ManagerStaffDirectoryStaffModalExtendedFields({
  register,
  errors,
  t,
}: ManagerStaffDirectoryStaffModalExtendedFieldsProps) {
  return (
    <>
      {/* Bank & Tax Details (Optional) */}
      <div className="sm:col-span-2 pt-2 border-t border-border">
        <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
          Bank &amp; Tax Details (Optional)
        </h4>
      </div>

      <div>
        <label htmlFor="manager-staff-directory-bank-name" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Bank Name
        </label>
        <input
          id="manager-staff-directory-bank-name"
          data-testid="manager_hr-staff-modal-input-bank-name"
          type="text"
          placeholder="e.g. HDFC Bank"
          {...register('bankName')}
          className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        />
      </div>

      <div>
        <label htmlFor="manager-staff-directory-account-number" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Account Number
        </label>
        <input
          id="manager-staff-directory-account-number"
          data-testid="manager_hr-staff-modal-input-account-number"
          type="text"
          placeholder="9-18 digits"
          {...register('bankAccountNumber')}
          className={`w-full rounded-xl border bg-input px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${errors.bankAccountNumber ? 'border-danger' : 'border-border'}`}
          aria-invalid={errors.bankAccountNumber ? 'true' : undefined}
          aria-describedby={errors.bankAccountNumber ? 'manager-staff-directory-account-number-error' : undefined}
        />
        {errors.bankAccountNumber && (
          <p id="manager-staff-directory-account-number-error" className="mt-1.5 text-xs text-danger-text">
            {String(errors.bankAccountNumber.message ?? '')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="manager-staff-directory-ifsc-code" className="mb-1.5 block text-sm font-medium text-text-secondary">
          IFSC Code
        </label>
        <input
          id="manager-staff-directory-ifsc-code"
          data-testid="manager_hr-staff-modal-input-ifsc-code"
          type="text"
          placeholder="e.g. HDFC0001234"
          {...register('ifscCode')}
          className={`w-full rounded-xl border bg-input px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${errors.ifscCode ? 'border-danger' : 'border-border'}`}
          aria-invalid={errors.ifscCode ? 'true' : undefined}
          aria-describedby={errors.ifscCode ? 'manager-staff-directory-ifsc-code-error' : undefined}
        />
        {errors.ifscCode && (
          <p id="manager-staff-directory-ifsc-code-error" className="mt-1.5 text-xs text-danger-text">
            {String(errors.ifscCode.message ?? '')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="manager-staff-directory-pan-number" className="mb-1.5 block text-sm font-medium text-text-secondary">
          PAN Number
        </label>
        <input
          id="manager-staff-directory-pan-number"
          data-testid="manager_hr-staff-modal-input-pan-number"
          type="text"
          placeholder="e.g. ABCDE1234F"
          maxLength={10}
          {...register('panNumber')}
          className={`w-full rounded-xl border bg-input px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${errors.panNumber ? 'border-danger' : 'border-border'}`}
          aria-invalid={errors.panNumber ? 'true' : undefined}
          aria-describedby={errors.panNumber ? 'manager-staff-directory-pan-number-error' : undefined}
        />
        {errors.panNumber && (
          <p id="manager-staff-directory-pan-number-error" className="mt-1.5 text-xs text-danger-text">
            {String(errors.panNumber.message ?? '')}
          </p>
        )}
      </div>

      {/* Emergency Contact (Optional) */}
      <div className="sm:col-span-2 pt-2 border-t border-border">
        <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
          Emergency Contact (Optional)
        </h4>
      </div>

      <div>
        <label htmlFor="manager-staff-directory-emergency-name" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Emergency Contact Name
        </label>
        <input
          id="manager-staff-directory-emergency-name"
          data-testid="manager_hr-staff-modal-input-emergency-name"
          type="text"
          placeholder="Contact Person Name"
          {...register('emergencyContactName')}
          className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        />
      </div>

      <div>
        <label htmlFor="manager-staff-directory-emergency-phone" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Emergency Contact Phone
        </label>
        <input
          id="manager-staff-directory-emergency-phone"
          data-testid="manager_hr-staff-modal-input-emergency-phone"
          type="tel"
          placeholder="10-digit number"
          maxLength={10}
          {...register('emergencyContactPhone')}
          className={`w-full rounded-xl border bg-input px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${errors.emergencyContactPhone ? 'border-danger' : 'border-border'}`}
          aria-invalid={errors.emergencyContactPhone ? 'true' : undefined}
          aria-describedby={errors.emergencyContactPhone ? 'manager-staff-directory-emergency-phone-error' : undefined}
        />
        {errors.emergencyContactPhone && (
          <p id="manager-staff-directory-emergency-phone-error" className="mt-1.5 text-xs text-danger-text">
            {String(errors.emergencyContactPhone.message ?? '')}
          </p>
        )}
      </div>

      <div className="sm:col-span-2 flex items-center justify-between rounded-xl border border-border bg-input p-4">
        <div>
          <label htmlFor="manager-staff-directory-is-active" className="block text-sm font-medium text-text-primary">
            {t('COPY_LOGIN_ACCESS')}
          </label>
          <p className="mt-0.5 text-xs text-text-secondary">{t('COPY_ALLOW_STAFF_MEMBER_LOG_PORTAL')}</p>
        </div>
        <input
          id="manager-staff-directory-is-active"
          data-testid="manager_hr-manager-hr-staff-modal-input-checkbox-toggle"
          type="checkbox"
          {...register('isActive')}
          aria-label={t('COPY_LOGIN_ACCESS_ENABLED')}
          className="h-5 w-5 rounded border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        />
      </div>
    </>
  );
}
