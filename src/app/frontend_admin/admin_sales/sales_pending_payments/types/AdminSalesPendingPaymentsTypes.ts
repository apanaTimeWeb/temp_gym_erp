// RESPONSIBILITY: Response and UI state types for Sales pending payments only.
import type { QueryStatus } from '@tanstack/react-query';
import { DATE_FILTERS } from '@/app/frontend_admin/admin_sales/sales_pending_payments/constants/AdminSalesPendingPaymentsConstants';
export type DateFilter = (typeof DATE_FILTERS)[number];
export interface PendingPaymentMember { id: string; name: string; email: string; phone: string; gender: string; address?: string; branch: string; planId: string; plan?: string; billingCycle: string; status: string; joinDate: string; expiryDate: string; paidAmount: number; pendingAmount?: number; photo?: string; createdAt: string; daysOverdue?: number; }
export interface AdminSalesPendingPaymentsState { isCustomRangeBlocked: boolean; startDate: string; endDate: string; search: string; setSearch: (search: string) => void; currentPage: number; setCurrentPage: (page: number) => void; pendingPayments: PendingPaymentMember[]; pendingTotal: number; pendingPaymentsStatus: QueryStatus; pendingPaymentsError: string; retryPendingPayments: () => Promise<unknown>; }
