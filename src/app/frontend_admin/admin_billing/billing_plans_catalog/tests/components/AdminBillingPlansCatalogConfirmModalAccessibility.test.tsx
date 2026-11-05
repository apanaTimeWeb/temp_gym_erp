// RESPONSIBILITY: Tests keyboard focus, Escape dismissal and focus restoration for the Plans confirmation dialog.
// DATA FLOW: feature-local confirmation UI -> accessibility hook -> DOM keyboard and focus assertions.
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminNavigationLayoutConfirmModal from '@/app/frontend_admin/admin_billing/billing_plans_catalog/components/feedback/AdminBillingPlansCatalogConfirmModal';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('Plans Catalog destructive confirmation accessibility', () => {
  it('focuses the dialog, supports Escape and returns focus to the trigger', async () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Remove';
    document.body.append(trigger);
    trigger.focus();
    const cancel = vi.fn();
    const props = { isOpen: true, title: 'Delete plan', message: 'Confirm deletion', onCancel: cancel, onConfirm: vi.fn() };
    const { rerender, unmount } = render(<AdminNavigationLayoutConfirmModal {...props} />);
    await waitFor(() => expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true));
    const buttons = screen.getByRole('dialog').querySelectorAll('button');
    const last = buttons[buttons.length - 1];
    if (!last) throw new Error('Expected confirmation buttons');
    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(buttons[0]);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(cancel).toHaveBeenCalledTimes(1);
    rerender(<AdminNavigationLayoutConfirmModal {...props} isOpen={false} />);
    expect(document.activeElement).toBe(trigger);
    unmount();
    trigger.remove();
  });
});
