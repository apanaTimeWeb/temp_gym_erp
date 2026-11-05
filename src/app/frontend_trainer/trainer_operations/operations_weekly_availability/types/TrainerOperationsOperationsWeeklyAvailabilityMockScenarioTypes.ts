/** Canonical response and selector types for operations_weekly_availability mock scenarios. */
export type TrainerOperationsOperationsWeeklyAvailabilityScenarioKey =
  | 'ACTIVE_RECORDS'
  | 'EMPTY_DATA'
  | 'SERVER_500_ERROR'
  | 'NETWORK_TIMEOUT'
  | 'UNAUTHORIZED_401'
  | 'FORBIDDEN_403';

export interface TrainerOperationsOperationsWeeklyAvailabilitySuccessEnvelope<TData> {
  success: true;
  message: string;
  data: TData;
  requestId: string;
}

export interface TrainerOperationsOperationsWeeklyAvailabilityFailureEnvelope {
  success: false;
  message: string;
  data: null;
  errorCode: string;
  statusCode: number;
  requestId: string;
}

export interface TrainerOperationsOperationsWeeklyAvailabilityScenarioSelectorProps {
  value: TrainerOperationsOperationsWeeklyAvailabilityScenarioKey;
  onChange: (scenario: TrainerOperationsOperationsWeeklyAvailabilityScenarioKey) => void;
}

export interface TrainerOperationsOperationsWeeklyAvailabilityHarnessProps<TData> {
  children: import('react').ReactNode;
  baseHandlers: import('msw').RequestHandler[];
  endpoint: string;
  activeData: TData;
  /** Optional host-owned mock session provider; the feature does not invent auth/session semantics. */
  sessionProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
  /** Optional host-owned theme provider; load the role theme stylesheet separately. */
  themeProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
}
