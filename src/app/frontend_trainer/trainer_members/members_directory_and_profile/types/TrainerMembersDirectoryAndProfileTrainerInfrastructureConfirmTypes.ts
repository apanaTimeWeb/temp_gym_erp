// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Type contracts for Trainer-wide confirmation UI and the programmatic confirm() API.
export const TRAINER_INFRASTRUCTURE_CONFIRM_TYPES = ['danger', 'warning', 'info'] as const;
export type TrainerInfrastructureConfirmType = (typeof TRAINER_INFRASTRUCTURE_CONFIRM_TYPES)[number];

export interface TrainerInfrastructureConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: TrainerInfrastructureConfirmType;
  requireTypedConfirmation?: boolean;
  confirmationPhrase?: string;
}

export interface TrainerInfrastructureConfirmContextValue {
  confirm: (options: TrainerInfrastructureConfirmOptions) => Promise<boolean>;
}

export interface TrainerInfrastructureConfirmModalProps extends TrainerInfrastructureConfirmOptions {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
