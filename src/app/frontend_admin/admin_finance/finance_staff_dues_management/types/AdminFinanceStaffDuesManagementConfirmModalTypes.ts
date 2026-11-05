// RESPONSIBILITY: Defines props for the reusable Admin confirmation modal.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutConfirmModalTypes.ts)

import type { AdminConfirmType } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementConfirmTypes';
export interface AdminConfirmModalProps {
  isOpen: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void; confirmText?: string; cancelText?: string; type?: AdminConfirmType; requireTyping?: boolean; confirmationPhrase?: string;
}
