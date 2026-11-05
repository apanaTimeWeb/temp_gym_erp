import { SUPERADMIN_INVOICE_RECOVERY_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';
/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingInvoicesV1MockFixtures owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants
import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_BILLING_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE = {
    'summary': {
        'failed': 9,
        'inRecovery': 6,
        'recoveredIncome': 124000,
        'unrecoveredIncome': 38000
    },
    'recovery': [
        {
            'gym': 'Prime Motion',
            'invoice': 'INV-2048',
            'amount': 51000,
            'attempts': 2,
            'nextRetry': '2026-09-19T09:00:00Z',
            'daysLate': 3,
            'reason': 'Bank declined'
        },
        {
            'gym': 'Urban Strength',
            'invoice': 'INV-2052',
            'amount': 76000,
            'attempts': 3,
            'nextRetry': '2026-09-18T09:00:00Z',
            'daysLate': 6,
            'reason': 'Insufficient balance'
        },
        {
            'gym': 'FitLab South',
            'invoice': 'INV-2057',
            'amount': 18000,
            'attempts': 1,
            'nextRetry': '2026-09-20T09:00:00Z',
            'daysLate': 1,
            'reason': 'Card expired'
        }
    ],
    'reconciliation': [
        {
            'type': 'Refund',
            'gym': 'Pulse Arena',
            'amount': 12000,
            'status': 'PENDING REVIEW'
        },
        {
            'type': 'Credit note',
            'gym': 'Urban Strength',
            'amount': 8000,
            'status': SUPERADMIN_INVOICE_RECOVERY_STATUS_CODES.APPROVED
        },
        {
            'type': 'Write-off',
            'gym': 'Old Town Gym',
            'amount': 5000,
            'status': 'PENDING REVIEW'
        }
    ],
    'policy': {
        'firstRetry': 'Day 0',
        'secondRetry': 'Day 2',
        'finalRetry': 'Day 5',
        'gracePeriod': '7 days',
        'autoSuspend': 'Day 10'
    }
} as const;
