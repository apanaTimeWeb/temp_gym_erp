import { createRef } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureDialogFocusTrap';

describe('Exercise modal focus trap', () => {
 it('cycles focus and restores prior trigger on cleanup', () => {
  const trigger = document.createElement('button');
  const dialog = document.createElement('div');
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  const first = document.createElement('button');
  const last = document.createElement('button');
  dialog.append(first, last); document.body.append(trigger, dialog); trigger.focus();
  const onEscape = vi.fn();
  const ref = { current: dialog };
  const { unmount, rerender } = renderHook(({ escape }) => useTrainerInfrastructureDialogFocusTrap({isOpen:true, dialogRef:ref, onEscape:escape}), { initialProps: { escape: onEscape } });
  expect(document.activeElement).toBe(first);
  const triggerFocus = vi.spyOn(trigger, 'focus');
  const nextEscape = vi.fn();
  rerender({ escape: nextEscape });
  expect(triggerFocus).not.toHaveBeenCalled();
  expect(document.activeElement).toBe(first);
  act(() => {last.focus(); document.dispatchEvent(new KeyboardEvent('keydown', {key:'Tab', bubbles:true, cancelable:true}));});
  expect(document.activeElement).toBe(first);
  act(() => {first.focus(); document.dispatchEvent(new KeyboardEvent('keydown', {key:'Tab',shiftKey:true,bubbles:true,cancelable:true}));});
  expect(document.activeElement).toBe(last);
  act(() => document.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape',bubbles:true,cancelable:true})));
  expect(nextEscape).toHaveBeenCalledTimes(1);
  unmount();expect(document.activeElement).toBe(trigger);dialog.remove();trigger.remove();
 });
});
