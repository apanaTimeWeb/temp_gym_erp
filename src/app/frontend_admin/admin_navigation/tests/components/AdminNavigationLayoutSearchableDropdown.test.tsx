// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutSearchableDropdown.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/components/AdminNavigationLayoutSearchableDropdown.test.tsx)

import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_navigation/components/searchable_dropdown/AdminNavigationLayoutSearchableDropdown';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('AdminNavigationLayoutSearchableDropdown', () => {
  it('provides a localized accessible name when options and optional labels are empty', () => {
    render(<AdminNavigationLayoutSearchableDropdown options={[]} value="" onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'admin_layout.components/searchable_dropdown.text_5616c87222' })).toBeTruthy();
  });
  it('supports keyboard option navigation and selection', () => {
    const onChange = vi.fn();
    render(<AdminNavigationLayoutSearchableDropdown options={[{ label: 'Members', value: 'members' }, { label: 'Finance', value: 'finance' }]} value="members" onChange={onChange} ariaLabel="Choose section" />);
    fireEvent.click(screen.getByRole('button', { name: 'Choose section' }));
    const search = screen.getByRole('combobox', { name: 'Choose section' });
    search.focus();
    fireEvent.keyDown(search, { key: 'ArrowDown' });
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options.every((option) => option.tagName !== 'BUTTON' && option.getAttribute('tabindex') === null)).toBe(true);
    expect(document.activeElement).toBe(search);
    fireEvent.keyDown(search, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('finance');
  });
  it('closes the listbox on Escape and restores focus to the trigger', () => {
    render(<AdminNavigationLayoutSearchableDropdown options={[{ label: 'Members', value: 'members' }]} value="members" onChange={vi.fn()} ariaLabel="Choose section" />);
    const trigger = screen.getByRole('button', { name: 'Choose section' });
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeTruthy();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

});
