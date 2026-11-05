import type { ReleaseNoteFormValues } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_ui.types';
import type { ReleaseNote } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';


export interface SuperadminPlatformConfigurationFeaturesReleaseNotesPanelProps {
  notes: ReleaseNote[];
  isPublishing: boolean;
  register: UseFormRegister<ReleaseNoteFormValues>;
  handleSubmit: UseFormHandleSubmit<ReleaseNoteFormValues>;
  errors: FieldErrors<ReleaseNoteFormValues>;
  onPublishNote: (formData: ReleaseNoteFormValues) => Promise<void>;
  onDeleteNote: (note: ReleaseNote) => Promise<void>;
  deletingNoteId: string | null;
}
