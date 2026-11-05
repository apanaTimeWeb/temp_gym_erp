import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ confirm: vi.fn().mockResolvedValue(false) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: mocks.confirm }) }));
vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementManualPaymentForm', () => ({
  useSuperadminBillingInvoicesManagementManualPaymentForm: () => ({
    register: () => ({}),
    handleSubmit: () => (event: Event) => event.preventDefault(),
    errors: {}, isSubmitting: false, isDirty: false,
  }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementDialogA11y', () => ({ useSuperadminBillingInvoicesManagementDialogA11y: () => null }));

import SuperadminBillingInvoicesLogPaymentModal from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/components/invoices_management_log_payment_modal/SuperadminBillingInvoicesManagementLogPaymentModal';

const tenants = [
  { id: 'gym-1', name: 'Alpha Fitness', plan: 'Basic' },
  { id: 'gym-2', name: 'Beta Fitness', plan: 'Pro' },
];

describe('manual payment gym picker keyboard interaction', () => {
  it('supports arrow navigation and Enter selection from the searchable combobox', () => {
    const handleSelectGym = vi.fn();
    render(<SuperadminBillingInvoicesLogPaymentModal
      onClose={vi.fn()} selectedGym={undefined} isGymDropdownOpen setIsGymDropdownOpen={vi.fn()}
      gymSearchTerm="" setGymSearchTerm={vi.fn()} filteredTenantsForDropdown={tenants}
      handleSelectGym={handleSelectGym} onSave={vi.fn().mockResolvedValue(true)} isSaving={false}
    />);

    const search = screen.getByRole('combobox', { name: 'ui.search_gym_by_name_00953b4c' });
    fireEvent.keyDown(search, { key: 'ArrowDown' });
    fireEvent.keyDown(search, { key: 'Enter' });
    expect(handleSelectGym).toHaveBeenCalledWith('gym-2');
  });

  it('supports Home, End, and Escape in the searchable gym list', () => {
    const handleSelectGym = vi.fn();
    const setIsGymDropdownOpen = vi.fn();
    render(<SuperadminBillingInvoicesLogPaymentModal
      onClose={vi.fn()} selectedGym={undefined} isGymDropdownOpen setIsGymDropdownOpen={setIsGymDropdownOpen}
      gymSearchTerm="" setGymSearchTerm={vi.fn()} filteredTenantsForDropdown={tenants}
      handleSelectGym={handleSelectGym} onSave={vi.fn().mockResolvedValue(true)} isSaving={false}
    />);
    const search = screen.getByRole('combobox', { name: 'ui.search_gym_by_name_00953b4c' });
    fireEvent.keyDown(search, { key: 'End' });
    fireEvent.keyDown(search, { key: 'Enter' });
    expect(handleSelectGym).toHaveBeenCalledWith('gym-2');
    fireEvent.keyDown(search, { key: 'Escape' });
    expect(setIsGymDropdownOpen).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'ui.select_gym_e1eeb492' }));
  });
});
