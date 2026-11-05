import { SUPERADMIN_ACCOUNT_PROFILE_DATA_EXPORT_COMPLETION_STATES } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/constants/superadmin_account_profile_overview.constants';

// RESPONSIBILITY: Data export/offboarding view and mutation contracts for the Superadmin Profile settings surface.
export type SuperadminAccountProfileDataExportCompletionState = (typeof SUPERADMIN_ACCOUNT_PROFILE_DATA_EXPORT_COMPLETION_STATES)[number];

export interface SuperadminDataExportCardProps {
  onRequestExport: () => Promise<void>;
  isRequesting: boolean;
  completionState: SuperadminAccountProfileDataExportCompletionState;
}
