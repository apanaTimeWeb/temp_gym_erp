import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ConfirmModal from '@/app/frontend_admin/admin_hr/hr_staff_management/components/feedback/AdminHrStaffManagementConfirmModal';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('RBG128 HR staff confirmation accessibility', () => {
 it('focuses type-to-confirm field and blocks blank confirmation phrases', () => {
  const confirm = vi.fn();
  render(<ConfirmModal isOpen title="Remove staff" message="Confirm" requireTyping confirmationPhrase=" " onConfirm={confirm} onCancel={vi.fn()} />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveFocus();
  const confirmButton = screen.getByRole('button', { name: /defaultConfirm/i });
  expect(confirmButton).toBeDisabled();
  fireEvent.change(input, { target: { value: 'CONFIRM' } });
  expect(confirmButton).toBeEnabled();
 });
 it('cancels on Escape and restores focus to opener', () => {
  const opener = document.createElement('button'); document.body.appendChild(opener); opener.focus();
  const cancel = vi.fn();
  const view = render(<ConfirmModal isOpen title="Delete" message="Proceed?" onConfirm={vi.fn()} onCancel={cancel} />);
  expect(screen.getByRole('button', { name: /defaultCancel/i })).toHaveFocus();
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
  expect(cancel).toHaveBeenCalledOnce();
  view.unmount(); expect(opener).toHaveFocus(); opener.remove();
 });
 it('traps Tab from last action back to the first action', () => {
  render(<ConfirmModal isOpen title="Delete" message="Proceed?" onConfirm={vi.fn()} onCancel={vi.fn()} />);
  const buttons = screen.getAllByRole('button'); buttons[buttons.length - 1].focus();
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Tab' });
  expect(buttons[0]).toHaveFocus();
 });
});
