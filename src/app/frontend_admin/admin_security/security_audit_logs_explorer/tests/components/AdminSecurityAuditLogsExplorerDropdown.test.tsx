import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/searchable_dropdown/AdminSecurityAuditLogsExplorerSearchableDropdown';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('RBG125 audit filter selector', () => {
  const options = [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Bravo' }, { value: 'c', label: 'Charlie' }];
  it('supports Home/End selection, restores trigger focus and clears expanded state', () => {
    const onChange = vi.fn();
    render(<AdminNavigationLayoutSearchableDropdown options={options} value="a" onChange={onChange} placeholder="Actor" testId="audit-actor" />);
    const trigger = screen.getByTestId('audit-actor');
    fireEvent.click(trigger);
    const input = screen.getByTestId('audit-actor-search');
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('c');
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
  it('closes the list when disabled while open', () => {
    const onChange = vi.fn();
    const { rerender } = render(<AdminNavigationLayoutSearchableDropdown options={options} value="a" onChange={onChange} placeholder="Actor" testId="audit-actor" />);
    fireEvent.click(screen.getByTestId('audit-actor'));
    rerender(<AdminNavigationLayoutSearchableDropdown options={options} value="a" onChange={onChange} placeholder="Actor" disabled testId="audit-actor" />);
    expect(screen.getByTestId('audit-actor')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
