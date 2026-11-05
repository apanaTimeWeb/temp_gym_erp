/** Canonical response and selector types for earnings_overview_and_ledger mock scenarios. */
export type TrainerEarningsEarningsOverviewAndLedgerScenarioKey =
  | 'ACTIVE_RECORDS'
  | 'EMPTY_DATA'
  | 'SERVER_500_ERROR'
  | 'NETWORK_TIMEOUT'
  | 'UNAUTHORIZED_401'
  | 'FORBIDDEN_403';

export interface TrainerEarningsEarningsOverviewAndLedgerSuccessEnvelope<TData> {
  success: true;
  message: string;
  data: TData;
  requestId: string;
}

export interface TrainerEarningsEarningsOverviewAndLedgerFailureEnvelope {
  success: false;
  message: string;
  data: null;
  errorCode: string;
  statusCode: number;
  requestId: string;
}

export interface TrainerEarningsEarningsOverviewAndLedgerScenarioSelectorProps {
  value: TrainerEarningsEarningsOverviewAndLedgerScenarioKey;
  onChange: (scenario: TrainerEarningsEarningsOverviewAndLedgerScenarioKey) => void;
}

export interface TrainerEarningsEarningsOverviewAndLedgerHarnessProps<TData> {
  children: import('react').ReactNode;
  baseHandlers: import('msw').RequestHandler[];
  endpoint: string;
  activeData: TData;
  /** Optional host-owned mock session provider; the feature does not invent auth/session semantics. */
  sessionProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
  /** Optional host-owned theme provider; load the role theme stylesheet separately. */
  themeProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
}
