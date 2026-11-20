// RESPONSIBILITY: Type contract for the documented invoice manual-payment form.
import type { SuperadminBillingInvoicesTenant } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types';

export interface SuperadminBillingInvoicesLogPaymentModalProps {
  onClose: () => void;
  selectedGym: SuperadminBillingInvoicesTenant | undefined;
  isGymDropdownOpen: boolean;
  setIsGymDropdownOpen: (open: boolean) => void;
  gymSearchTerm: string;
  setGymSearchTerm: (term: string) => void;
  filteredTenantsForDropdown: SuperadminBillingInvoicesTenant[];
  handleSelectGym: (id: string) => void;
  onSave: (amount: number, details?: { paymentMethod?: string; referenceNumber?: string; paymentDate?: string; notes?: string }) => Promise<boolean>;
  isSaving: boolean;
}
