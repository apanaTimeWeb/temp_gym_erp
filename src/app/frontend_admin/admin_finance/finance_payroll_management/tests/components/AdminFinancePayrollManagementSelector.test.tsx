// RBG124: accessible selector semantics for keyboard users and disabled controls.
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/searchable_dropdown/AdminFinancePayrollManagementSearchableDropdown';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
afterEach(cleanup);
const options = [{ value: 'alpha', label: 'Alpha' }, { value: 'beta', label: 'Beta' }, { value: 'gamma', label: 'Gamma' }];
describe('Finance payroll selector RBG124', () => {
  it('navigates first/last options and restores focus after selection', () => {
    const onChange = vi.fn();
    render(<AdminNavigationLayoutSearchableDropdown value="alpha" options={options} ariaLabel="Staff" onChange={onChange} />);
    const trigger = screen.getByRole('button', { name: 'Staff: Alpha' });
    fireEvent.click(trigger);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'End' });
    expect(input).toHaveAttribute('aria-activedescendant', expect.stringContaining('option-2'));
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('gamma');
    expect(trigger).toHaveFocus();
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Home' });
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', expect.stringContaining('option-0'));
  });
  it('closes an open selector when it becomes disabled', () => {
    const onChange = vi.fn();
    const view = render(<AdminNavigationLayoutSearchableDropdown value="alpha" options={options} ariaLabel="Staff" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Staff: Alpha' }));
    view.rerender(<AdminNavigationLayoutSearchableDropdown value="alpha" options={options} ariaLabel="Staff" disabled onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Staff: Alpha' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});
