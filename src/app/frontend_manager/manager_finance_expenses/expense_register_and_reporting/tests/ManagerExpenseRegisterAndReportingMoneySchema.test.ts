import { describe, expect, it } from 'vitest';

import { managerExpenseSchema, managerExpenseStatsSchema } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/schemas/manager_expense_register_and_reporting.schemas';

describe('Expenses API money schemas', () => { it('rejects fractional minor-unit expense amounts', () => { const expense = { id: 'e1', title: 'Repair', category: 'Maintenance', amount: 25000, date: '2026-10-01', status: 'PAID', createdAt: '2026-10-01T10:00:00Z' }; expect(managerExpenseSchema.safeParse(expense).success).toBe(true); expect(managerExpenseSchema.safeParse({ ...expense, amount: 25000.5 }).success).toBe(false); expect(managerExpenseStatsSchema.safeParse({ totalAmount: 25000.5, paidAmount: 0, pendingAmount: 0, thisMonthAmount: 0 }).success).toBe(false); }); });
