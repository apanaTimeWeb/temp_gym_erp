// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Defines the configuration contract for the generic Trainer dialog focus-management hook.
import type { RefObject } from 'react';

export interface TrainerInfrastructureDialogFocusTrapOptions {
  isOpen: boolean;
  dialogRef: RefObject<HTMLElement | null>;
  onEscape?: () => void;
}
