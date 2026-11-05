// RESPONSIBILITY: Defines the configuration contract for the generic Trainer dialog focus-management hook.
import type { RefObject } from 'react';

export interface TrainerNavigationDialogFocusTrapOptions {
  isOpen: boolean;
  dialogRef: RefObject<HTMLElement | null>;
  onEscape?: () => void;
}
