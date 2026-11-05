/** Canonical response and selector types for account_personal_profile mock scenarios. */
export type TrainerAccountAccountPersonalProfileScenarioKey =
  | 'ACTIVE_RECORDS'
  | 'EMPTY_DATA'
  | 'SERVER_500_ERROR'
  | 'NETWORK_TIMEOUT'
  | 'UNAUTHORIZED_401'
  | 'FORBIDDEN_403';

export interface TrainerAccountAccountPersonalProfileSuccessEnvelope<TData> {
  success: true;
  message: string;
  data: TData;
  requestId: string;
}

export interface TrainerAccountAccountPersonalProfileFailureEnvelope {
  success: false;
  message: string;
  data: null;
  errorCode: string;
  statusCode: number;
  requestId: string;
}

export interface TrainerAccountAccountPersonalProfileScenarioSelectorProps {
  value: TrainerAccountAccountPersonalProfileScenarioKey;
  onChange: (scenario: TrainerAccountAccountPersonalProfileScenarioKey) => void;
}

export interface TrainerAccountAccountPersonalProfileHarnessProps<TData> {
  children: import('react').ReactNode;
  baseHandlers: import('msw').RequestHandler[];
  endpoint: string;
  activeData: TData;
  /** Optional host-owned mock session provider; the feature does not invent auth/session semantics. */
  sessionProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
  /** Optional host-owned theme provider; load the role theme stylesheet separately. */
  themeProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
}
