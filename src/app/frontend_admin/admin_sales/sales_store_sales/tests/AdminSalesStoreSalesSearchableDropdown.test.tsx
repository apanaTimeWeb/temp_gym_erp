// RESPONSIBILITY: Regression checks for the leaf-local combobox's keyboard, focus and disabled semantics.
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_sales/sales_store_sales/components/searchable_dropdown/AdminSalesStoreSalesSearchableDropdown';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const options = Array.from({ length: 15 }, (_, index) => ({ value: String(index), label: `Location ${index}` }));
describe('store sales leaf combobox', () => {
  it('supports Home/End and returns focus to the trigger on Enter selection', () => {
    const onChange = vi.fn();
    render(<AdminNavigationLayoutSearchableDropdown options={options} value="3" onChange={onChange} placeholder="Branch" testId="store-branch" />);
    const trigger = screen.getByTestId('store-branch');
    fireEvent.click(trigger);
    const input = screen.getByTestId('store-branch-search');
    fireEvent.keyDown(input, { key: 'End' });
    expect(input).toHaveAttribute('aria-activedescendant', expect.stringContaining('option-14'));
    fireEvent.keyDown(input, { key: 'Home' });
    expect(input).toHaveAttribute('aria-activedescendant', expect.stringContaining('option-0'));
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('0');
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
  it('closes its listbox when the trigger becomes disabled', () => {
    const onChange = vi.fn();
    const view = render(<AdminNavigationLayoutSearchableDropdown options={options} value="3" onChange={onChange} placeholder="Branch" testId="store-branch" />);
    fireEvent.click(screen.getByTestId('store-branch'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    view.rerender(<AdminNavigationLayoutSearchableDropdown options={options} value="3" onChange={onChange} placeholder="Branch" testId="store-branch" disabled />);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByTestId('store-branch')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('store-branch')).not.toHaveAttribute('aria-controls');
  });
});
