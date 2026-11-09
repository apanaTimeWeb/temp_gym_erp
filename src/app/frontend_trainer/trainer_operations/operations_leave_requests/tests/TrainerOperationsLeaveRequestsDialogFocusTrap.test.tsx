import { createRef } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/hooks/TrainerOperationsLeaveRequestsuseTrainerInfrastructureDialogFocusTrap';

describe('Leave Requests dialog focus trap', () => {
  it('keeps focus stable across callback changes and delegates Escape to the topmost dialog', () => {
    const trigger = document.createElement('button');
    const dialog = document.createElement('div');
    const nested = document.createElement('div');
    dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-modal', 'true');
    nested.setAttribute('role', 'dialog'); nested.setAttribute('aria-modal', 'true');
    const first = document.createElement('button'); dialog.append(first);
    const nestedButton = document.createElement('button'); nested.append(nestedButton);
    document.body.append(trigger, dialog, nested); trigger.focus();
    const ref = { current: dialog };
    const initialEscape = vi.fn(); const latestEscape = vi.fn();
    const { rerender, unmount } = renderHook(({ onEscape }) => useTrainerInfrastructureDialogFocusTrap({ isOpen: true, dialogRef: ref, onEscape }), { initialProps: { onEscape: initialEscape } });
    rerender({ onEscape: latestEscape });
    expect(document.activeElement).toBe(first);
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
    expect(initialEscape).not.toHaveBeenCalled(); expect(latestEscape).not.toHaveBeenCalled();
    nested.remove();
    first.focus();
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
    expect(latestEscape).toHaveBeenCalledOnce();
    unmount(); nested.remove(); dialog.remove(); trigger.remove();
  });
});
