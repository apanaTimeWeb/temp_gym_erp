"use client";
// RESPONSIBILITY: Renders the useAdminFinanceStaffDuesManagementDueAmountSync UI surface for hr_management; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → useAdminFinanceStaffDuesManagementDueAmountSync → accessible UI/events routed to owning hooks (admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementDueAmountSync.ts)

import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { AdminFinanceStaffDuesManagementFromMinorUnits } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementCurrencyUnits';
import type { Staff } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementTypes';
import type { AdminFinanceStaffDuesManagementDueFormValues } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementDueFormTypes';

/**
 * @description Synchronizes the selected staff member's current due into the RHF amount field.
 * @dependencies React effect, React Hook Form, and module-owned Staff/StaffFormValues types.
 * @edge-case Never overwrites a dirty manually edited amount unless the field is still zero.
 */
export function useAdminFinanceStaffDuesManagementDueAmountSync(form: UseFormReturn<AdminFinanceStaffDuesManagementDueFormValues>, selectedStaff?: Staff) {
  useEffect(() => {
    if (!selectedStaff) return;
    const currentAmount = form.getValues('amount');
    if (!form.formState.dirtyFields.amount || currentAmount === 0) {
      form.setValue('amount', AdminFinanceStaffDuesManagementFromMinorUnits(selectedStaff.currentDue), { shouldDirty: false });
    }
  }, [form, selectedStaff]);
}
