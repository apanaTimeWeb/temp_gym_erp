/** Canonical response and selector types for operations_trainer_attendance mock scenarios. */
export type TrainerOperationsOperationsTrainerAttendanceScenarioKey =
  | 'ACTIVE_RECORDS'
  | 'EMPTY_DATA'
  | 'SERVER_500_ERROR'
  | 'NETWORK_TIMEOUT'
  | 'UNAUTHORIZED_401'
  | 'FORBIDDEN_403';

export interface TrainerOperationsOperationsTrainerAttendanceSuccessEnvelope<TData> {
  success: true;
  message: string;
  data: TData;
  requestId: string;
}

export interface TrainerOperationsOperationsTrainerAttendanceFailureEnvelope {
  success: false;
  message: string;
  data: null;
  errorCode: string;
  statusCode: number;
  requestId: string;
}

export interface TrainerOperationsOperationsTrainerAttendanceScenarioSelectorProps {
  value: TrainerOperationsOperationsTrainerAttendanceScenarioKey;
  onChange: (scenario: TrainerOperationsOperationsTrainerAttendanceScenarioKey) => void;
}

export interface TrainerOperationsOperationsTrainerAttendanceHarnessProps<TData> {
  children: import('react').ReactNode;
  baseHandlers: import('msw').RequestHandler[];
  endpoint: string;
  activeData: TData;
  /** Optional host-owned mock session provider; the feature does not invent auth/session semantics. */
  sessionProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
  /** Optional host-owned theme provider; load the role theme stylesheet separately. */
  themeProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
}
