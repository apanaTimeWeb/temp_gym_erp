import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminFinancePayrollReportSearchableDropdown } from '../components/searchable_dropdown/AdminFinancePayrollReportSearchableDropdown';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

const choices = Array.from({ length: 25 }, (_, index) => ({ value: `branch-${index}`, label: `Branch ${index}` }));

describe('RBG122 Payroll Report searchable selector', () => {
  it('supports Home/End/Enter and returns focus to the trigger', async () => {
    const onChange = vi.fn();
    render(<AdminFinancePayrollReportSearchableDropdown options={choices} value="branch-2" onChange={onChange} placeholder="Select branch" testId="payroll-branch" />);
    const trigger = screen.getByTestId('payroll-branch');
    fireEvent.click(trigger);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'End' });
    expect(input.getAttribute('aria-activedescendant')).toMatch(/option-24$/);
    fireEvent.keyDown(input, { key: 'Home' });
    expect(input.getAttribute('aria-activedescendant')).toMatch(/option-0$/);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('branch-0');
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it('closes an open popover when its control becomes disabled', async () => {
    const view = render(<AdminFinancePayrollReportSearchableDropdown options={choices} value="branch-2" onChange={vi.fn()} placeholder="Select branch" testId="payroll-branch" />);
    fireEvent.click(screen.getByTestId('payroll-branch'));
    expect(screen.getByRole('listbox')).toBeTruthy();
    view.rerender(<AdminFinancePayrollReportSearchableDropdown options={choices} value="branch-2" onChange={vi.fn()} placeholder="Select branch" testId="payroll-branch" disabled />);
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
    expect(screen.getByTestId('payroll-branch').getAttribute('aria-expanded')).toBe('false');
  });
});
