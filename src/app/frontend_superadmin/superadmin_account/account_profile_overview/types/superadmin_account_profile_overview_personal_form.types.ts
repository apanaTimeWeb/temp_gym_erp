// RESPONSIBILITY: Form value contract for the Superadmin profile personal-details form.
import type { SuperadminAccountProfileData } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/types/superadmin_account_profile_overview.types';

export interface SuperadminAccountProfilePersonalFormValues {
  name: string;
  phone: string;
  timezone?: string;
  language?: string;
}

export interface SuperadminAccountProfilePersonalFormProps {
  profile: SuperadminAccountProfileData;
  isSaving: boolean;
  onSave: (values: SuperadminAccountProfilePersonalFormValues) => Promise<void>;
}
