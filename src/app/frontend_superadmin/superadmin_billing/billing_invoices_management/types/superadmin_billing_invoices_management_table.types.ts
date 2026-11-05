// RESPONSIBILITY: Type contract extracted from SuperadminBillingInvoicesTable.tsx; no business behavior.
import type { SaaSInvoice } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types';

export interface SuperadminBillingInvoicesTableProps {
    invoices: SaaSInvoice[];
    onLogPaymentClick: () => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
