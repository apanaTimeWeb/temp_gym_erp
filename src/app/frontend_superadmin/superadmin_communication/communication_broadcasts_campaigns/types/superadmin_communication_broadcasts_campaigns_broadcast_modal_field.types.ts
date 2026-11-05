import type { BroadcastFormData, SuperadminCommunicationBroadcastsTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';


export interface SuperadminCommunicationBroadcastsTargetGymSelectorProps {
  gyms: SuperadminCommunicationBroadcastsTenant[];
  isPending: boolean;
  selectedGymIds: string[];
  isAllGymsTarget: boolean;
  errorMessage?: string;
  loadError: boolean;
  onRetry: () => void;
  onToggleAll: () => void;
  onToggleGym: (id: string) => void;
}

export interface SuperadminCommunicationBroadcastsScheduleFieldsProps {
  date: string;
  time: string;
  hasError: boolean;
  errorMessage?: string;
  timezoneHint?: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export interface SuperadminCommunicationBroadcastsSendConfirmationFieldsProps {
  recipientCount: number;
  isRecipientCountLoading: boolean;
  recipientCountError: boolean;
  onRetryRecipientCount: () => void;
  targetGymCount: number;
  phrase: string;
  onPhraseChange: (phrase: string) => void;
}

export interface SuperadminCommunicationBroadcastsMessageFieldsProps {
  register: UseFormRegister<BroadcastFormData>;
  errors: FieldErrors<BroadcastFormData>;
}

export interface SuperadminCommunicationBroadcastsStatusFieldProps {
  control: Control<BroadcastFormData>;
  errors: FieldErrors<BroadcastFormData>;
}
