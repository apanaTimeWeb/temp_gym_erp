/** Canonical response and selector types for operations_leave_requests mock scenarios. */
export type TrainerOperationsOperationsLeaveRequestsScenarioKey =
  | 'ACTIVE_RECORDS'
  | 'EMPTY_DATA'
  | 'SERVER_500_ERROR'
  | 'NETWORK_TIMEOUT'
  | 'UNAUTHORIZED_401'
  | 'FORBIDDEN_403';

export interface TrainerOperationsOperationsLeaveRequestsSuccessEnvelope<TData> {
  success: true;
  message: string;
  data: TData;
  requestId: string;
}

export interface TrainerOperationsOperationsLeaveRequestsFailureEnvelope {
  success: false;
  message: string;
  data: null;
  errorCode: string;
  statusCode: number;
  requestId: string;
}

export interface TrainerOperationsOperationsLeaveRequestsScenarioSelectorProps {
  value: TrainerOperationsOperationsLeaveRequestsScenarioKey;
  onChange: (scenario: TrainerOperationsOperationsLeaveRequestsScenarioKey) => void;
}

export interface TrainerOperationsOperationsLeaveRequestsHarnessProps<TData> {
  children: import('react').ReactNode;
  baseHandlers: import('msw').RequestHandler[];
  endpoint: string;
  activeData: TData;
  /** Optional host-owned mock session provider; the feature does not invent auth/session semantics. */
  sessionProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
  /** Optional host-owned theme provider; load the role theme stylesheet separately. */
  themeProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
}
