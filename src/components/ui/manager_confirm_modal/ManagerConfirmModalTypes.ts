export type ManagerConfirmType = 'danger' | 'warning' | 'info' | 'default';

export interface ManagerConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: ManagerConfirmType;
}

export interface ManagerConfirmContextValue {
  confirm: (options: ManagerConfirmOptions) => Promise<boolean>;
}

