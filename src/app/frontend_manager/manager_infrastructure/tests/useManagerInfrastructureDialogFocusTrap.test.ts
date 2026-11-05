import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';

afterEach(() => { cleanup(); vi.useRealTimers(); document.body.innerHTML = ''; });

describe('useManagerInfrastructureDialogFocusTrap', () => {
  it('recovers focus when it is moved outside the open dialog and restores the opener on close', () => {
    vi.useFakeTimers();
    const opener = document.createElement('button'); opener.textContent = 'Open'; document.body.append(opener); opener.focus();
    const dialog = document.createElement('div');
    const first = document.createElement('button'); first.textContent = 'First';
    const last = document.createElement('button'); last.textContent = 'Last';
    dialog.append(first, last); document.body.append(dialog);
    const dialogRef = { current: dialog };
    const { rerender } = renderHook(({ isOpen }) => useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen, onClose: vi.fn() }), { initialProps: { isOpen: true } });
    act(() => { vi.runOnlyPendingTimers(); });
    expect(document.activeElement).toBe(first);
    const outside = document.createElement('button'); document.body.append(outside);
    act(() => outside.focus());
    expect(document.activeElement).toBe(first);
    rerender({ isOpen: false });
    expect(document.activeElement).toBe(opener);
  });

  it('wraps Shift+Tab from the first control to the last control', () => {
    vi.useFakeTimers();
    const dialog = document.createElement('div');
    const first = document.createElement('button'); const last = document.createElement('button');
    dialog.append(first, last); document.body.append(dialog);
    renderHook(() => useManagerInfrastructureDialogFocusTrap({ dialogRef: { current: dialog }, isOpen: true, onClose: vi.fn() }));
    act(() => { vi.runOnlyPendingTimers(); });
    first.focus();
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }));
    expect(document.activeElement).toBe(last);
  });
});
