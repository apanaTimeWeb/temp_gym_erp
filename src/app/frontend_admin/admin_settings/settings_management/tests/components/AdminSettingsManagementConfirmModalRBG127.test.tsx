// RESPONSIBILITY: Regression coverage for the Settings confirmation dialog focus and keyboard contract.
// DATA FLOW: rendered modal → keyboard interactions → confirm/cancel and focus restoration.
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminSettingsConfirmModal from '@/app/frontend_admin/admin_settings/settings_management/components/feedback/AdminSettingsManagementConfirmModal';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('RBG127 Settings confirmation keyboard behavior', () => {
  it('contains Tab, handles Escape and restores focus on close', () => {
    const cancel = vi.fn();
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();
    const { unmount } = render(<AdminSettingsConfirmModal isOpen title="Save settings" message="Apply changes?" onConfirm={vi.fn()} onCancel={cancel} />);
    const dialog = screen.getByRole('dialog');
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveFocus();
    buttons[1].focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(buttons[0]).toHaveFocus();
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(buttons[1]).toHaveFocus();
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(cancel).toHaveBeenCalledOnce();
    unmount();
    expect(trigger).toHaveFocus();
    trigger.remove();
  });
  it('rejects an empty typed confirmation phrase rather than treating blank input as authorization', () => {
    render(<AdminSettingsConfirmModal isOpen title="Delete" message="Careful" requireTyping confirmationPhrase="   " onConfirm={vi.fn()} onCancel={vi.fn()} />);
    const confirm = screen.getAllByRole('button')[1];
    expect(confirm).toBeDisabled();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '   ' } });
    expect(confirm).toBeDisabled();
  });
});
