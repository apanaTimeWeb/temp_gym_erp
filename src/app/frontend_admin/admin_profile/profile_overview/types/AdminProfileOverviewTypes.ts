// RESPONSIBILITY: TypeScript types for the Admin Profile module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_profile/profile_overview/types/AdminProfileOverviewTypes.ts)

import type { UseFormReturn } from 'react-hook-form';

export interface AdminProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  branchName: string;
  joinedAt: string;
  avatarInitial: string;
}

export interface UpdateAdminProfilePayload {
  name: string;
  phone: string;
}

export interface UpdateAdminPasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ProfileTab = 'personal' | 'security';

export type PasswordFieldName = 'currentPassword' | 'newPassword' | 'confirmPassword';

export interface AdminProfilePasswordFieldProps {
  label: string;
  name: PasswordFieldName;
  form: UseFormReturn<UpdateAdminPasswordPayload>;
  visible: boolean;
  onToggle: () => void;
}
