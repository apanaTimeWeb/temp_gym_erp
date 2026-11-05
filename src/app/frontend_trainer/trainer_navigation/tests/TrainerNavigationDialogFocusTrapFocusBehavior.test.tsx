import { createRef } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTrainerNavigationDialogFocusTrap } from '@/app/frontend_trainer/trainer_navigation/hooks/useTrainerNavigationDialogFocusTrap';

describe('trainer_navigation dialog focus trap', () => {
  it('wraps Tab/Shift+Tab, cancels on Escape and restores prior focus', () => {
    const trigger = document.createElement('button');
    const dialog = document.createElement('div');
    const first = document.createElement('button');
    const last = document.createElement('button');
    dialog.append(first, last);
    document.body.append(trigger, dialog);
    trigger.focus();
    const onEscape = vi.fn();
    const dialogRef = createRef<HTMLDivElement>();
    Object.defineProperty(dialogRef, 'current', { value: dialog, configurable: true });
    const { unmount } = renderHook(() => useTrainerNavigationDialogFocusTrap({ isOpen: true, dialogRef, onEscape }));
    expect(document.activeElement).toBe(first);
    act(() => { last.focus(); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })); });
    expect(document.activeElement).toBe(first);
    act(() => { first.focus(); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true })); });
    expect(document.activeElement).toBe(last);
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
    expect(onEscape).toHaveBeenCalledTimes(1);
    unmount();
    expect(document.activeElement).toBe(trigger);
    trigger.remove(); dialog.remove();
  });
});


describe('trainer_navigation dialog focus trap lifecycle', () => {
  it('uses the latest Escape callback and only the topmost dialog handles Escape', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    document.body.append(parent, child);
    const parentRef = createRef<HTMLDivElement>();
    const childRef = createRef<HTMLDivElement>();
    Object.defineProperty(parentRef, 'current', { value: parent, configurable: true });
    Object.defineProperty(childRef, 'current', { value: child, configurable: true });
    const firstEscape = vi.fn();
    const latestEscape = vi.fn();
    const parentHook = renderHook(({ onEscape }) => useTrainerNavigationDialogFocusTrap({ isOpen: true, dialogRef: parentRef, onEscape }), { initialProps: { onEscape: firstEscape } });
    parentHook.rerender({ onEscape: latestEscape });
    const childEscape = vi.fn();
    const childHook = renderHook(() => useTrainerNavigationDialogFocusTrap({ isOpen: true, dialogRef: childRef, onEscape: childEscape }));
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
    expect(childEscape).toHaveBeenCalledTimes(1);
    expect(latestEscape).not.toHaveBeenCalled();
    childHook.unmount();
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
    expect(latestEscape).toHaveBeenCalledTimes(1);
    expect(firstEscape).not.toHaveBeenCalled();
    parentHook.unmount();
    parent.remove(); child.remove();
  });
});
