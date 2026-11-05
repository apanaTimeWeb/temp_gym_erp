"use client";
// RESPONSIBILITY: Exposes the shared Admin confirmation-dialog service.
// DATA FLOW: Admin feature → useAdminNavigationLayoutConfirm → AdminConfirmContext → AdminNavigationLayoutConfirmModal.

import { useContext } from 'react';
import { ConfirmContext } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/components/feedback/AdminFinanceStaffLedgerManagementConfirmProvider';
/** Coordinates Confirm state, data flow, and feature behavior. */
export const useAdminNavigationLayoutConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error('Admin confirmation provider is required.');
  return context;
};
