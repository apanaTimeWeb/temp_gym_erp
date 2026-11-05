import { createRef } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureDialogFocusTrap';
describe('TrainerOperationsMemberAttendance focus trap', () => {
 it('loops Tab and Shift+Tab, closes on Escape and restores trigger focus', () => {
  const trigger = document.createElement('button');
  const dialog = document.createElement('div');
  const first = document.createElement('button');
  const last = document.createElement('button');
  dialog.append(first,last); document.body.append(trigger,dialog); trigger.focus();
  const ref = createRef<HTMLDivElement>(); Object.defineProperty(ref,'current',{value:dialog,configurable:true});
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

  it('does not reset focus when the Escape callback changes and only the topmost dialog handles Escape', () => {
    const trigger = document.createElement('button');
    const dialog = document.createElement('div');
    const childDialog = document.createElement('div');
    dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-modal', 'true');
    childDialog.setAttribute('role', 'dialog'); childDialog.setAttribute('aria-modal', 'true');
    const first = document.createElement('button'); dialog.append(first);
    const childButton = document.createElement('button'); childDialog.append(childButton);
    document.body.append(trigger, dialog, childDialog); trigger.focus();
    const ref = createRef<HTMLDivElement>(); Object.defineProperty(ref, 'current', { value: dialog, configurable: true });
    const firstEscape = vi.fn(); const latestEscape = vi.fn();
    const { rerender, unmount } = renderHook(({ onEscape }) => useTrainerInfrastructureDialogFocusTrap({ isOpen: true, dialogRef: ref, onEscape }), { initialProps: { onEscape: firstEscape } });
    first.focus();
    rerender({ onEscape: latestEscape });
    expect(document.activeElement).toBe(first);
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
    expect(firstEscape).not.toHaveBeenCalled();
    expect(latestEscape).not.toHaveBeenCalled();
    childButton.focus();
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
    expect(latestEscape).toHaveBeenCalledOnce();
    unmount(); childDialog.remove(); dialog.remove(); trigger.remove();
  });

});
