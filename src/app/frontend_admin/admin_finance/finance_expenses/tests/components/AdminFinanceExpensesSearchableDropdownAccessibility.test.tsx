// RESPONSIBILITY: Regression test for selected-label announcement, keyboard navigation and focus restoration in Expenses selector.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_expenses/components/searchable_dropdown/AdminFinanceExpensesSearchableDropdown';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
afterEach(cleanup);
const options = [{ value: 'one', label: 'Alpha' }, { value: 'two', label: 'Beta' }, { value: 'three', label: 'Gamma' }];
describe('Expenses searchable dropdown a11y', () => {
  it('announces the selected option and returns focus after a pointer selection', () => {
    const onChange = vi.fn();
    render(<AdminNavigationLayoutSearchableDropdown options={options} value="one" onChange={onChange} ariaLabel="Select branch" placeholder="Choose" />);
    const trigger = screen.getByRole('button', { name: 'Select branch: Alpha' });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('option', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalledWith('two');
    expect(trigger).toHaveFocus();
  });

  it('supports End and Enter while returning focus to the trigger', () => {
    const onChange = vi.fn();
    render(<AdminNavigationLayoutSearchableDropdown options={options} value="one" onChange={onChange} ariaLabel="Select branch" />);
    const trigger = screen.getByRole('button', { name: 'Select branch: Alpha' });
    fireEvent.click(trigger);
    const search = screen.getByRole('combobox');
    fireEvent.keyDown(search, { key: 'End' });
    expect(search).toHaveAttribute('aria-activedescendant', expect.stringMatching(/option-2$/));
    fireEvent.keyDown(search, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('three');
    expect(trigger).toHaveFocus();
  });
});
