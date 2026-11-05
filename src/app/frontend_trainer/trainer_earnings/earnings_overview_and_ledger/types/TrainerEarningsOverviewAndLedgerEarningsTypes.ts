import { z } from 'zod';

import { TrainerEarningsKPIsDataSchema, TrainerEarningsPayoutStatusSchema, TrainerEarningsTrainerPendingPayoutSchema, TrainerEarningsHistoryRowSchema, TrainerEarningsDataSchema } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/schemas/TrainerEarningsOverviewAndLedgerEarningsDomainSchemas';



// RESPONSIBILITY: Exposes Trainer Earnings TypeScript types without owning runtime validation.

export type TrainerEarningsKPIsData = z.infer<typeof TrainerEarningsKPIsDataSchema>;
export type TrainerEarningsPayoutStatus = z.infer<typeof TrainerEarningsPayoutStatusSchema>;
export type TrainerEarningsTrainerPendingPayout = z.infer<typeof TrainerEarningsTrainerPendingPayoutSchema>;
export type TrainerEarningsHistoryRow = z.infer<typeof TrainerEarningsHistoryRowSchema>;
export type TrainerEarningsData = z.infer<typeof TrainerEarningsDataSchema>;