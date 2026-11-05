// RESPONSIBILITY: Type contracts for Trainer-wide confirmation UI and the programmatic confirm() API.
export const TRAINER_INFRASTRUCTURE_CONFIRM_TYPES = ['danger', 'warning', 'info'] as const;
export type TrainerNavigationConfirmType = (typeof TRAINER_INFRASTRUCTURE_CONFIRM_TYPES)[number];

export interface TrainerNavigationConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: TrainerNavigationConfirmType;
  requireTypedConfirmation?: boolean;
  confirmationPhrase?: string;
}

export interface TrainerNavigationConfirmContextValue {
  confirm: (options: TrainerNavigationConfirmOptions) => Promise<boolean>;
}

export interface TrainerNavigationConfirmModalProps extends TrainerNavigationConfirmOptions {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
