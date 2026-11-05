import { createElement } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useSuperadminPlatformShellLayoutDialogA11y } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/hooks/useSuperadminPlatformShellLayoutDialogA11y';

function Harness({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useSuperadminPlatformShellLayoutDialogA11y(open, onClose);
  return createElement('div', null,
    createElement('button', { type: 'button', 'data-testid': 'trigger' }, 'Trigger'),
    open ? createElement('div', { ref, role: 'dialog', 'aria-modal': 'true' },
      createElement('button', { type: 'button', 'data-autofocus': 'true', 'data-testid': 'first' }, 'First'),
      createElement('button', { type: 'button', 'data-testid': 'last' }, 'Last')) : null,
  );
}

afterEach(() => { document.body.style.overflow = ''; vi.restoreAllMocks(); });

describe('useSuperadminPlatformShellLayoutDialogA11y', () => {
  it('focuses the first dialog control, traps Tab, and restores focus and scroll state', async () => {
    document.body.style.overflow = 'auto';
    const view = render(createElement(Harness, { open: false, onClose: vi.fn() }));
    const trigger = screen.getByTestId('trigger');
    trigger.focus();
    view.rerender(createElement(Harness, { open: true, onClose: vi.fn() }));
    await waitFor(() => expect(screen.getByTestId('first')).toHaveFocus());
    expect(document.body.style.overflow).toBe('hidden');
    screen.getByTestId('last').focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(screen.getByTestId('first')).toHaveFocus();
    view.rerender(createElement(Harness, { open: false, onClose: vi.fn() }));
    expect(document.body.style.overflow).toBe('auto');
    expect(trigger).toHaveFocus();
  });

  it('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(createElement(Harness, { open: true, onClose }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps focus inside when focus escapes the dialog', async () => {
    render(createElement(Harness, { open: true, onClose: vi.fn() }));
    screen.getByTestId('trigger').focus();
    await waitFor(() => expect(screen.getByTestId('first')).toHaveFocus());
  });
});
