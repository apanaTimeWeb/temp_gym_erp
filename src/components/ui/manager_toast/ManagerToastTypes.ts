export type ManagerToastType = 'success' | 'error' | 'warning' | 'info';

export interface ManagerToastProps {
  message: string;
  type: ManagerToastType;
  onClose: () => void;
  'data-testid'?: string;
  className?: string;
}

