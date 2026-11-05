// RESPONSIBILITY: Defines feature-local TypeScript contracts for profile_overview; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_profile/profile_overview/types/AdminProfileOverviewComponentPropsTypes.ts)

import type { FormEventHandler } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { AdminProfileData, UpdateAdminPasswordPayload, UpdateAdminProfilePayload, ProfileTab } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewTypes';

/** Props for the profile password/security form. */
export interface AdminProfileSecurityFormProps {
  form: UseFormReturn<UpdateAdminPasswordPayload>;
  isSaving: boolean;
  showCurrent: boolean;
  showNew: boolean;
  showConfirm: boolean;
  onToggleCurrent: () => void;
  onToggleNew: () => void;
  onToggleConfirm: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

/** Props for the profile personal-information form. */
export interface AdminProfilePersonalFormProps {
  profile: AdminProfileData | null;
  form: UseFormReturn<UpdateAdminProfilePayload>;
  isSaving: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

/** Props for the profile section selector. */
export interface AdminProfileTabsNavigationProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

/** Props for the profile summary presentation component. */
export interface AdminProfileSummaryCardProps {
  profile: AdminProfileData | null;
  displayInitial: string;
}
