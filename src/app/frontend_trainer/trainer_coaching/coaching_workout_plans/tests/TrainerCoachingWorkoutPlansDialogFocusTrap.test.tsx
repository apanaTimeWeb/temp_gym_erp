import { createRef } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureDialogFocusTrap';

describe('Workout Plans dialog focus trap', () => {
  it('updates Escape callbacks without resetting focus during rerenders', () => {
    const dialog = document.createElement('div'); dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-modal', 'true');
    const first = document.createElement('button'); const last = document.createElement('button'); dialog.append(first, last); document.body.append(dialog);
    const dialogRef = createRef<HTMLDivElement>(); Object.defineProperty(dialogRef, 'current', { value: dialog, configurable: true });
    const firstEscape = vi.fn(); const latestEscape = vi.fn();
    const { rerender, unmount } = renderHook(({ onEscape }) => useTrainerInfrastructureDialogFocusTrap({ isOpen: true, dialogRef, onEscape }), { initialProps: { onEscape: firstEscape } });
    last.focus();
    rerender({ onEscape: latestEscape });
    expect(document.activeElement).toBe(last);
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
    expect(firstEscape).not.toHaveBeenCalled();
    expect(latestEscape).toHaveBeenCalledTimes(1);
    unmount(); dialog.remove();
  });

  it('leaves Escape to a nested confirmation dialog and handles it when the parent is topmost', () => {
    const parent = document.createElement('div'); parent.setAttribute('role', 'dialog'); parent.setAttribute('aria-modal', 'true');
    const parentButton = document.createElement('button'); parent.append(parentButton);
    const child = document.createElement('div'); child.setAttribute('role', 'dialog'); child.setAttribute('aria-modal', 'true');
    const childButton = document.createElement('button'); child.append(childButton);
    document.body.append(parent, child);
    const dialogRef = createRef<HTMLDivElement>(); Object.defineProperty(dialogRef, 'current', { value: parent, configurable: true });
    const onEscape = vi.fn();
    const { unmount } = renderHook(() => useTrainerInfrastructureDialogFocusTrap({ isOpen: true, dialogRef, onEscape }));
    act(() => { childButton.focus(); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })); });
    expect(onEscape).not.toHaveBeenCalled();
    child.remove();
    act(() => { parentButton.focus(); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })); });
    expect(onEscape).toHaveBeenCalledTimes(1);
    unmount(); parent.remove(); child.remove();
  });
});
