import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminFinanceSalaryAdvanceManagementAdvanceTable from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/components/advance_table/AdminFinanceSalaryAdvanceManagementAdvanceTable';
vi.mock('next-intl', () => ({ useLocale: () => 'en', useTranslations: () => (key:string) => key }));
vi.mock('@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementAdvanceForm', () => ({
  useAdminFinanceSalaryAdvanceManagementAdvanceForm: () => ({
    staff: [], selectedStaff: null, saving: false, submit: vi.fn((event) => event.preventDefault()),
    form: { register: () => ({}), formState: { errors: { notes: { message: '__i18n:hr.validation.notesMax' } } } },
  }),
}));
describe('salary advance form validation accessibility', () => {
  it('renders a translated notes error associated with the invalid textarea', () => {
    render(<AdminFinanceSalaryAdvanceManagementAdvanceTable />);
    const textarea = screen.getByRole('textbox', { name: /text_69a6dd8283/ });
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
    const error = document.getElementById('admin_hr-advance-notes-error');
    expect(error?.textContent).toContain('hr.validation.notesMax');
    expect(textarea.getAttribute('aria-describedby')).toBe(error?.id);
  });
});
