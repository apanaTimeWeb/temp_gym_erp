import { Activity, Clock, IndianRupee, Minus, Target } from 'lucide-react';

// RESPONSIBILITY: Owns Trainer Earnings static UI configuration for statuses and server-backed table sorting.
// DATA FLOW: Earnings controls -> URL parameters -> TrainerEarnings API/query -> rendered ledger.

export const TRAINER_EARNINGS_EARNINGS_ITEMS_PER_PAGE = 10;
export const TRAINER_EARNINGS_PAYOUT_STATUS_VALUES = ['pending', 'processing', 'settled'] as const;
export const TRAINER_EARNINGS_LEDGER_ENTRY_TYPES = ['Session', 'Bonus', 'Commission'] as const;

export const TRAINER_EARNINGS_PAYOUT_STATUS_STYLES: Record<string, { bg: string; text: string; labelKey: string }> = {
  pending: { bg: 'bg-warning-bg', text: 'text-warning', labelKey: 'TEXT_STATUS_PENDING' },
  processing: { bg: 'bg-info-bg', text: 'text-info', labelKey: 'TEXT_STATUS_PROCESSING' },
  settled: { bg: 'bg-success-bg', text: 'text-success', labelKey: 'TEXT_STATUS_SETTLED' },
};

export const TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS = [
  { labelKey: 'TEXT_SORT_DATE', value: 'date' },
  { labelKey: 'TEXT_SORT_DESCRIPTION', value: 'description' },
  { labelKey: 'TEXT_SORT_AMOUNT', value: 'amount' },
  { labelKey: 'TEXT_SORT_STATUS', value: 'status' },
] as const;
export const TRAINER_EARNINGS_EARNINGS_SORT_DIRECTIONS = ['asc', 'desc'] as const;

export const TRAINER_EARNINGS_KPI_CARD_CONFIG = [
  { key: 'total', labelKey: 'TEXT_TOTAL_EARNINGS', icon: IndianRupee, color: 'text-success', bg: 'bg-success-bg' },
  { key: 'pending', labelKey: 'TEXT_PENDING_PAYOUTS', icon: Clock, color: 'text-warning', bg: 'bg-warning-bg' },
  { key: 'sessions', labelKey: 'TEXT_SESSIONS_COMPLETED', icon: Activity, color: 'text-info', bg: 'bg-info-bg' },
  { key: 'commission', labelKey: 'TEXT_COMMISSION_RATE', icon: Target, color: 'text-primary', bg: 'bg-primary-subtle' },
  { key: 'tax', labelKey: 'TEXT_TAX_DEDUCTED', icon: Minus, color: 'text-danger', bg: 'bg-danger-bg' },
] as const;
export const TRAINER_EARNINGS_KPI_CARD_KEYS = TRAINER_EARNINGS_KPI_CARD_CONFIG.map((card) => card.key);
