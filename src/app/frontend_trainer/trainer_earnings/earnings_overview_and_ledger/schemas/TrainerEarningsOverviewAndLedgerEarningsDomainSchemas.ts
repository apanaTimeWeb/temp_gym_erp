// RESPONSIBILITY: Owns Trainer Earnings Zod schemas for server data and ledger responses.
import { z } from 'zod';

import { TRAINER_EARNINGS_LEDGER_ENTRY_TYPES, TRAINER_EARNINGS_PAYOUT_STATUS_VALUES } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsConstants';



export const TrainerEarningsKPIsDataSchema = z.object({ totalEarnings: z.number().int().nonnegative(), currency: z.string().length(3), pendingPayouts: z.number().int().nonnegative(), sessionsCompleted: z.number(), commissionRate: z.number(), taxDeduction: z.number().int().nonnegative(), bankAccount: z.string().optional(), commissionTier: z.string().optional() });
export const TrainerEarningsPayoutStatusSchema = z.enum(TRAINER_EARNINGS_PAYOUT_STATUS_VALUES);
export const TrainerEarningsTrainerPendingPayoutSchema = z.object({ id: z.string(), period: z.string(), amount: z.number().int().nonnegative(), currency: z.string().length(3), status: TrainerEarningsPayoutStatusSchema, dueDate: z.string() });
export const TrainerEarningsHistoryRowSchema = z.object({ id: z.string(), date: z.string(), type: z.enum(TRAINER_EARNINGS_LEDGER_ENTRY_TYPES), description: z.string(), amount: z.number().int(), currency: z.string().length(3), status: TrainerEarningsPayoutStatusSchema, sessionId: z.string().optional(), tdsDeducted: z.number().int().nonnegative().optional(), netPayout: z.number().int().nonnegative().optional(), invoiceNumber: z.string().optional() });
export const TrainerEarningsDataSchema = z.object({ kpis: TrainerEarningsKPIsDataSchema, pendingPayouts: z.array(TrainerEarningsTrainerPendingPayoutSchema), history: z.array(TrainerEarningsHistoryRowSchema), historyTotal: z.number().int().nonnegative().optional(), historyPage: z.number().int().positive().optional(), historyLimit: z.number().int().positive().optional() });
