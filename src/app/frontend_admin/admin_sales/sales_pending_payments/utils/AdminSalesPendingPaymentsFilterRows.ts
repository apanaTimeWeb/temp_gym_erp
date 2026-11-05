// RESPONSIBILITY: Filters the owning pending-Sales-payments rows only.
import type { PendingPaymentMember } from '@/app/frontend_admin/admin_sales/sales_pending_payments/types/AdminSalesPendingPaymentsTypes';

export function filterAdminSalesPendingPaymentsRows(rows: PendingPaymentMember[], search: string): PendingPaymentMember[] {
  const query = search.trim().toLowerCase();
  if (!query) return rows;
  return rows.filter((row) => [row.id, row.name, row.email, row.phone, row.branch, row.plan]
    .some((value) => String(value ?? '').toLowerCase().includes(query)));
}
