import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_members/members_directory/components/searchable_dropdown/AdminMembersDirectorySearchableDropdown';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const options = [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }, { value: 'c', label: 'Charlie' }];

describe('RBG137 member dropdown keyboard selection', () => {
  it('supports End/Enter and returns focus to the trigger', () => {
    const onChange = vi.fn();
    render(<AdminNavigationLayoutSearchableDropdown options={options} value="a" onChange={onChange} ariaLabel="Branch" />);
    const trigger = screen.getByRole('button', { name: 'Branch' });
    fireEvent.click(trigger);
    const search = screen.getByRole('combobox');
    fireEvent.keyDown(search, { key: 'End' });
    fireEvent.keyDown(search, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('c');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });
  it('closes when disabled while open', () => {
    const { rerender } = render(<AdminNavigationLayoutSearchableDropdown options={options} value="a" onChange={() => {}} ariaLabel="Branch" />);
    fireEvent.click(screen.getByRole('button', { name: 'Branch' }));
    rerender(<AdminNavigationLayoutSearchableDropdown options={options} value="a" onChange={() => {}} ariaLabel="Branch" disabled />);
    expect(screen.queryByRole('listbox')).toBeNull();
  });
});
