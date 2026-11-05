/** Canonical response and selector types for members_directory_and_profile mock scenarios. */
export type TrainerMembersMembersDirectoryAndProfileScenarioKey =
  | 'ACTIVE_RECORDS'
  | 'EMPTY_DATA'
  | 'SERVER_500_ERROR'
  | 'NETWORK_TIMEOUT'
  | 'UNAUTHORIZED_401'
  | 'FORBIDDEN_403';

export interface TrainerMembersMembersDirectoryAndProfileSuccessEnvelope<TData> {
  success: true;
  message: string;
  data: TData;
  requestId: string;
}

export interface TrainerMembersMembersDirectoryAndProfileFailureEnvelope {
  success: false;
  message: string;
  data: null;
  errorCode: string;
  statusCode: number;
  requestId: string;
}

export interface TrainerMembersMembersDirectoryAndProfileScenarioSelectorProps {
  value: TrainerMembersMembersDirectoryAndProfileScenarioKey;
  onChange: (scenario: TrainerMembersMembersDirectoryAndProfileScenarioKey) => void;
}

export interface TrainerMembersMembersDirectoryAndProfileHarnessProps<TData> {
  children: import('react').ReactNode;
  baseHandlers: import('msw').RequestHandler[];
  endpoint: string;
  activeData: TData;
  /** Optional host-owned mock session provider; the feature does not invent auth/session semantics. */
  sessionProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
  /** Optional host-owned theme provider; load the role theme stylesheet separately. */
  themeProvider?: (children: import('react').ReactNode) => import('react').ReactNode;
}
