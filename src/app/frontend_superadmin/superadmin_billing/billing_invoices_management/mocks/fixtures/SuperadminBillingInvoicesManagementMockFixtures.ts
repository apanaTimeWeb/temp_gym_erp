/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingInvoicesMockFixtures owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import { SUPERADMIN_INVOICE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';

import type { SaaSInvoice } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types';


export const MOCK_INVOICE_TENANTS = [
    { id: 't1', name: 'Iron Paradise', plan: 'Pro' },
    { id: 't2', name: 'Fit Life Studio', plan: 'Basic' },
    { id: 't3', name: 'CrossFit Box', plan: 'Enterprise' },
    { id: 't4', name: 'Powerhouse Gym', plan: 'Pro' },
    { id: 't5', name: 'Pulse Fitness', plan: 'Pro' },
    { id: 't6', name: 'Urban Strength', plan: 'Enterprise' },
    { id: 't7', name: 'Core Studio', plan: 'Basic' },
    { id: 't8', name: 'Zen Athletics', plan: 'Basic' },
];

export const MOCK_SUPERADMIN_BILLING_INVOICES: SaaSInvoice[] = [
    { id: 'inv1', tenantId: 't1', tenantName: 'Iron Paradise', amount: 199900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.PAID, issuedAt: '2026-09-01', dueDate: '2026-09-07', paidAt: '2026-09-05', paymentMethod: 'Credit Card', invoiceType: 'RECURRING', planName: 'Pro' },
    { id: 'inv2', tenantId: 't2', tenantName: 'Fit Life Studio', amount: 499900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.OVERDUE, issuedAt: '2026-08-01', dueDate: '2026-08-07', invoiceType: 'RECURRING', planName: 'Enterprise' },
    { id: 'inv3', tenantId: 't3', tenantName: 'CrossFit Box', amount: 999900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.PENDING, issuedAt: '2026-09-15', dueDate: '2026-09-22', invoiceType: 'SETUP_FEE', planName: 'Enterprise' },
    { id: 'inv4', tenantId: 't4', tenantName: 'Powerhouse Gym', amount: 299900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.FAILED, issuedAt: '2026-09-13', dueDate: '2026-09-20', invoiceType: 'RECURRING', planName: 'Pro' },
    { id: 'inv5', tenantId: 't5', tenantName: 'Pulse Fitness', amount: 399900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.PAID, issuedAt: '2026-09-10', dueDate: '2026-09-17', paidAt: '2026-09-11', paymentMethod: 'UPI', invoiceType: 'RECURRING', planName: 'Pro' },
    { id: 'inv6', tenantId: 't6', tenantName: 'Urban Strength', amount: 799900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.OVERDUE, issuedAt: '2026-08-20', dueDate: '2026-08-27', invoiceType: 'RECURRING', planName: 'Enterprise' },
    { id: 'inv7', tenantId: 't7', tenantName: 'Core Studio', amount: 149900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.PENDING, issuedAt: '2026-09-08', dueDate: '2026-09-15', invoiceType: 'ONE_TIME', planName: 'Basic' },
    { id: 'inv8', tenantId: 't8', tenantName: 'Zen Athletics', amount: 249900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.FAILED, issuedAt: '2026-08-28', dueDate: '2026-09-04', invoiceType: 'RECURRING', planName: 'Basic' },
    { id: 'inv9', tenantId: 't1', tenantName: 'Iron Paradise', amount: 219900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.PAID, issuedAt: '2026-08-15', dueDate: '2026-08-22', paidAt: '2026-08-20', paymentMethod: 'Credit Card', invoiceType: 'RECURRING', planName: 'Pro' },
    { id: 'inv10', tenantId: 't2', tenantName: 'Fit Life Studio', amount: 509900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.PENDING, issuedAt: '2026-08-12', dueDate: '2026-08-19', invoiceType: 'RECURRING', planName: 'Basic' },
    { id: 'inv13', tenantId: 't3', tenantName: 'CrossFit Box', amount: 1049900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.PAID, issuedAt: '2026-08-10', dueDate: '2026-08-17', paidAt: '2026-08-12', paymentMethod: 'Bank Transfer', invoiceType: 'RECURRING', planName: 'Enterprise' },
    { id: 'inv11', tenantId: 't4', tenantName: 'Powerhouse Gym', amount: 319900, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.OVERDUE, issuedAt: '2026-08-05', dueDate: '2026-08-12', invoiceType: 'RECURRING', planName: 'Pro' },
];
