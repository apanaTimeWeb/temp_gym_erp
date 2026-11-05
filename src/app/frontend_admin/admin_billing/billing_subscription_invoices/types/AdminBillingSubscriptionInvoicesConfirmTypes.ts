// RESPONSIBILITY: Defines the reusable confirmation-dialog contract for Admin actions.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutConfirmTypes.ts)

export type AdminConfirmType = 'danger' | 'warning' | 'info';
export interface AdminConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: AdminConfirmType;
  requireTyping?: boolean;
  confirmationPhrase?: string;
}
export interface AdminConfirmContextType {
  confirm: (options: AdminConfirmOptions) => Promise<boolean>;
}
