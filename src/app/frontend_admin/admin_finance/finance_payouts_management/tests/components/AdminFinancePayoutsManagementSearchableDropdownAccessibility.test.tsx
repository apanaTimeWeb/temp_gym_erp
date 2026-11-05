// RESPONSIBILITY: Regression coverage for selected-value announcements and focus restoration in this isolated finance leaf.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/searchable_dropdown/AdminFinancePayoutsManagementSearchableDropdown';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
afterEach(() => cleanup());

describe('finance_payouts_management dropdown accessibility', () => {
  it('announces the selected label and restores focus after selecting', () => {
    const onChange = vi.fn();
    render(<AdminNavigationLayoutSearchableDropdown
      options={[{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }]}
      value="a" onChange={onChange} placeholder="Choose" ariaLabel="Select record"
    />);
    const trigger = screen.getByRole('button', { name: 'Select record: Alpha' });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('option', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalledWith('b');
    expect(trigger).toHaveFocus();
  });
});
