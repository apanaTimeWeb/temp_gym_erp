import { createRef } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureDialogFocusTrap';
describe('TrainerCoachingSessions focus trap', () => {
 it('loops Tab and Shift+Tab, closes on Escape and restores trigger focus', () => {
  const trigger = document.createElement('button');
  const dialog = document.createElement('div'); dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-modal', 'true');
  const first = document.createElement('button');
  const last = document.createElement('button');
  dialog.append(first,last); document.body.append(trigger,dialog); trigger.focus();
  const ref = { current: dialog };
  const onEscape = vi.fn();
  const {unmount} = renderHook(() => useTrainerInfrastructureDialogFocusTrap({isOpen:true,dialogRef:ref,onEscape}));
  expect(document.activeElement).toBe(first);
  act(() => {last.focus();document.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true}));});
  expect(document.activeElement).toBe(first);
  act(() => {first.focus();document.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',shiftKey:true,bubbles:true,cancelable:true}));});
  expect(document.activeElement).toBe(last);
  act(() => document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true})));
  expect(onEscape).toHaveBeenCalledTimes(1);
  unmount(); expect(document.activeElement).toBe(trigger); dialog.remove();trigger.remove();
 });

 it('updates Escape callbacks without resetting focus during rerenders', () => {
  const dialog = document.createElement('div'); dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-modal', 'true');
  const first = document.createElement('button'); const last = document.createElement('button'); dialog.append(first, last); document.body.append(dialog);
  const ref = { current: dialog };
  const firstEscape = vi.fn(); const latestEscape = vi.fn();
  const { rerender, unmount } = renderHook(({ onEscape }) => useTrainerInfrastructureDialogFocusTrap({ isOpen: true, dialogRef: ref, onEscape }), { initialProps: { onEscape: firstEscape } });
  last.focus();
  rerender({ onEscape: latestEscape });
  expect(document.activeElement).toBe(last);
  act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
  expect(firstEscape).not.toHaveBeenCalled();
  expect(latestEscape).toHaveBeenCalledTimes(1);
  unmount(); dialog.remove();
 });

 it('does not handle Escape while a nested confirmation dialog is topmost', () => {
  const parent = document.createElement('div'); parent.setAttribute('role', 'dialog'); parent.setAttribute('aria-modal', 'true');
  const parentButton = document.createElement('button'); parent.append(parentButton);
  const child = document.createElement('div'); child.setAttribute('role', 'dialog'); child.setAttribute('aria-modal', 'true');
  const childButton = document.createElement('button'); child.append(childButton);
  document.body.append(parent, child);
  const ref = { current: parent };
  const onEscape = vi.fn();
  const { unmount } = renderHook(() => useTrainerInfrastructureDialogFocusTrap({ isOpen: true, dialogRef: ref, onEscape }));
  act(() => { childButton.focus(); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })); });
  expect(onEscape).not.toHaveBeenCalled();
  child.remove();
  act(() => { parentButton.focus(); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })); });
  expect(onEscape).toHaveBeenCalledTimes(1);
  unmount(); parent.remove(); child.remove();
 });
});
