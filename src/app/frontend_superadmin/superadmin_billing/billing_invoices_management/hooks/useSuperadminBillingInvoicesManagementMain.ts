'use client';
// DATA FLOW: Invoices page → local tab state + useSuperadminBillingInvoicesManagementPage → child sections.
// RESPONSIBILITY: Owns page-local tab state and completion behavior for the manual-payment modal.


import { useState } from 'react';

import { SUPERADMIN_BILLING_INVOICES_TAB_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';
import { useSuperadminBillingInvoicesManagementPage } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementPage';

import type { InvoicesTab } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_client.types';

/**
 * @description Coordinates Invoice route tab state and the manual-payment completion/close behavior.
 * @dependencies Composes the Invoice page hook and passes validated amounts into the feature mutation boundary.
 * @edge-case If no gym is selected, the save operation returns false and the modal remains available instead of closing optimistically.
 */
export function useSuperadminBillingInvoicesManagementMain() {
  const [activeTab, setActiveTab] = useState<InvoicesTab>(SUPERADMIN_BILLING_INVOICES_TAB_CODES.ALL);
  const page = useSuperadminBillingInvoicesManagementPage();
  const handleSavePayment = async (amount: number): Promise<boolean> => {
    if (!page.selectedGym) return false;
    const recorded = await page.handleLogManualPayment(page.selectedGym.id, amount, page.selectedGym.plan);
    if (recorded) page.setShowAddModal(false);
    return recorded;
  };
  return { ...page, activeTab, setActiveTab, handleSavePayment };
}
