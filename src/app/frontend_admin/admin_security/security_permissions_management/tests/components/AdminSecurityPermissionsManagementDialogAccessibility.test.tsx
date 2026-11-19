import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminNavigationLayoutConfirmModal from '@/app/frontend_admin/admin_security/security_permissions_management/components/feedback/AdminSecurityPermissionsManagementConfirmModal';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('Permissions confirmation dialog — RBG126 security and keyboard behavior', () => {
  it('moves focus into the modal, traps Tab, handles Escape and returns focus to the invoking control', () => {
    const invoker = document.createElement('button');
    document.body.appendChild(invoker);
    invoker.focus();
    const cancel = vi.fn();
    const { unmount } = render(<AdminNavigationLayoutConfirmModal isOpen title="Change access" message="This affects staff access" onConfirm={vi.fn()} onCancel={cancel} />);
    const dialog = screen.getByRole('dialog');
    const cancelButton = screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultCancel' });
    const confirmButton = screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm' });
    expect(dialog.getAttribute('aria-labelledby')).toBeTruthy();
    expect(dialog.getAttribute('aria-describedby')).toBeTruthy();
    expect(document.activeElement).toBe(cancelButton);
    confirmButton.focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(document.activeElement).toBe(cancelButton);
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(confirmButton);
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(cancel).toHaveBeenCalledOnce();
    unmount();
    expect(document.activeElement).toBe(invoker);
    invoker.remove();
  });

  it('focuses a required confirmation phrase input and keeps confirm disabled until typed', () => {
    const confirm = vi.fn();
    render(<AdminNavigationLayoutConfirmModal isOpen title="Reset" message="Confirm" onConfirm={confirm} onCancel={vi.fn()} requireTyping confirmationPhrase="DELETE" />);
    const input = screen.getByRole('textbox');
    const confirmButton = screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm' });
    expect(document.activeElement).toBe(input);
    expect(confirmButton).toBeDisabled();
    fireEvent.change(input, { target: { value: 'delete' } });
    expect(confirmButton).toBeEnabled();
  });
});
