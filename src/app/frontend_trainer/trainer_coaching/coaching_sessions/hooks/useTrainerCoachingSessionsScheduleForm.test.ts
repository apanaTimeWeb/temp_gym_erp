import { renderHook, act } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerSessionsScheduleForm } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsScheduleForm';





describe('useTrainerSessionsScheduleForm', () => {
  const valid = { type: 'PT' as const, memberId: 'member-1', date: '2026-10-01', time: '10:00', duration: '60m' };

  it('keeps the draft after a failed submission so the user can retry', async () => {
    const onSubmit = vi.fn().mockResolvedValue(false);
    const { result } = renderHook(() => {
      const hook = useTrainerSessionsScheduleForm(onSubmit);
      // Subscribe to isDirty proxy
      void hook.form.formState.isDirty;
      return hook;
    });
    act(() => {
      for (const [key, value] of Object.entries(valid)) {
        result.current.form.setValue(key as keyof typeof valid, value as never, { shouldDirty: true, shouldValidate: true });
      }
    });
    await act(async () => { await result.current.handleSubmit(); });
    expect(onSubmit).toHaveBeenCalledWith(valid);
    expect(result.current.form.formState.isDirty).toBe(true);
  });

  it('resets the draft only after a successful submission', async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    const { result } = renderHook(() => useTrainerSessionsScheduleForm(onSubmit));
    act(() => {
      for (const [key, value] of Object.entries(valid)) {
        result.current.form.setValue(key as keyof typeof valid, value as never, { shouldDirty: true, shouldValidate: true });
      }
    });
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.form.formState.isDirty).toBe(false);
  });
});
