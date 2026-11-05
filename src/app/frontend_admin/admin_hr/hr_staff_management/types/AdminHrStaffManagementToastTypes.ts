// RESPONSIBILITY: Defines the Admin toast presentation contract shared by the Admin toast store, provider, and adapters.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutToastTypes.ts)

export type AdminToastType = 'whatsapp' | 'email' | 'error' | 'success' | 'info' | 'warning';

export interface AdminToastProps {
  id?: string;
  message: string;
  type: AdminToastType;
  onClose: () => void;
}
