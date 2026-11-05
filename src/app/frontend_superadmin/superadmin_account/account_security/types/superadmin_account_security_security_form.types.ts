// RESPONSIBILITY: Form value contract for the Superadmin password-security form.
import type { SuperadminAccountProfileData, Toggle2FAPayload } from '@/app/frontend_superadmin/superadmin_account/account_security/types/superadmin_account_security.types';

export interface SuperadminAccountProfileSecurityFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SuperadminAccountProfileSecurityFormProps {
  profile: SuperadminAccountProfileData;
  isSavingPassword: boolean;
  isTogglingTwoFA: boolean;
  onSavePassword: (values: Pick<SuperadminAccountProfileSecurityFormValues, 'currentPassword' | 'newPassword'>) => Promise<void>;
  onToggle2FA: (payload: Toggle2FAPayload) => Promise<void>;
}
