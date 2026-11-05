import { createRef } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureDialogFocusTrap';
describe('TrainerMembersDirectoryAndProfile focus trap', () => {
 it('keeps the latest Escape callback without resetting focus and leaves Escape to the topmost dialog', () => {
  const parent = document.createElement('div'); parent.setAttribute('role','dialog'); parent.setAttribute('aria-modal','true');
  const child = document.createElement('div'); child.setAttribute('role','dialog'); child.setAttribute('aria-modal','true');
  document.body.append(parent, child);
  const ref = createRef<HTMLDivElement>(); Object.defineProperty(ref,'current',{value:parent,configurable:true});
  const first = vi.fn(); const second = vi.fn();
  const {rerender,unmount} = renderHook(({callback}) => useTrainerInfrastructureDialogFocusTrap({isOpen:true,dialogRef:ref,onEscape:callback}), {initialProps:{callback:first}});
  rerender({callback:second});
  act(() => document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true})));
  expect(first).not.toHaveBeenCalled(); expect(second).not.toHaveBeenCalled();
  child.remove();
  act(() => document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true})));
  expect(second).toHaveBeenCalledTimes(1);
  unmount(); parent.remove();
 });
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
});
