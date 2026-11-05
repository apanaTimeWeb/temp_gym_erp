import type { RefObject } from 'react';

export interface ManagerInfrastructureDialogFocusTrapOptions {
  dialogRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
}
