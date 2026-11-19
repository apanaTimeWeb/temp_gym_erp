import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { AdminNavigationLayoutSearchableDropdown } from '../../components/searchable_dropdown/AdminAttendanceDashboardSearchableDropdown';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const options = [{ label: 'Alpha', value: 'a' }, { label: 'Beta', value: 'b' }, { label: 'Charlie', value: 'c' }];

describe('RBG139 attendance selector keyboard', () => {
  it('supports End, Enter and returns focus to the trigger', () => {
    const onChange = vi.fn();
    render(<AdminNavigationLayoutSearchableDropdown options={options} value="a" onChange={onChange} ariaLabel="Branch" />);
    const trigger = screen.getByRole('button', { name: 'Branch' });
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'End' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('c');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });
  it('does not retain a visible list when disabled while open', () => {
    const { rerender } = render(<AdminNavigationLayoutSearchableDropdown options={options} value="a" onChange={() => {}} ariaLabel="Branch" />);
    fireEvent.click(screen.getByRole('button', { name: 'Branch' }));
    rerender(<AdminNavigationLayoutSearchableDropdown options={options} value="a" onChange={() => {}} ariaLabel="Branch" disabled />);
    expect(screen.queryByRole('listbox')).toBeNull();
  });
});
