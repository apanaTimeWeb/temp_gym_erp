import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ confirm: vi.fn(async () => true), push: vi.fn(), setSourceDirty: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock('@/app/frontend_trainer/trainer_account/account_personal_profile/hooks/TrainerAccountPersonalProfileuseTrainerInfrastructureConfirm', () => ({ useTrainerInfrastructureConfirm: () => ({ confirm: mocks.confirm }) }));
vi.mock('@/app/frontend_trainer/trainer_account/account_personal_profile/state/TrainerAccountPersonalProfileuseTrainerInfrastructureNavigationGuardStore', () => ({ useTrainerInfrastructureNavigationGuardStore: (selector: (state: { setSourceDirty: typeof mocks.setSourceDirty }) => unknown) => selector({ setSourceDirty: mocks.setSourceDirty }) }));

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_account/account_personal_profile/hooks/TrainerAccountPersonalProfileuseTrainerInfrastructureUnsavedChangesGuard';

describe('profile unsaved navigation guard', () => {
 it('defers confirmed navigation and registers dirty state', async () => {
   mocks.confirm.mockClear(); mocks.setSourceDirty.mockClear();
   const { result, unmount } = renderHook(() => useTrainerInfrastructureUnsavedChangesGuard(true));
   const navigate = vi.fn();
   await act(async () => { await result.current(navigate); });
   expect(mocks.confirm).toHaveBeenCalledTimes(1);
   expect(navigate).toHaveBeenCalledTimes(1);
   expect(mocks.setSourceDirty).toHaveBeenCalledWith(expect.any(String), true);
   unmount();
   expect(mocks.setSourceDirty).toHaveBeenCalledWith(expect.any(String), false);
 });
 it('never navigates after explicit cancellation', async () => {
   mocks.confirm.mockResolvedValueOnce(false);
   const { result, unmount } = renderHook(() => useTrainerInfrastructureUnsavedChangesGuard(true));
   const navigate = vi.fn();
   await act(async () => { await result.current(navigate); });
   expect(navigate).not.toHaveBeenCalled();
   unmount();
 });
});

describe('Navigation API route interception', () => {
 it('cancels an unapproved programmatic same-origin transition', async () => {
   const navigation = new EventTarget();
   Object.defineProperty(window, 'navigation', { configurable: true, value: navigation });
   mocks.confirm.mockReset(); mocks.confirm.mockResolvedValue(false); mocks.push.mockClear();
   const { unmount } = renderHook(() => useTrainerInfrastructureUnsavedChangesGuard(true));
   const destination = new URL('/frontend_trainer/trainer_account/account_security', window.location.href).href;
   const attempt = Object.assign(new Event('navigate', { cancelable: true }), {
     canIntercept: true, destination: { url: destination }, navigationType: 'push',
   });
   await act(async () => { navigation.dispatchEvent(attempt); });
   await waitFor(() => expect(mocks.confirm).toHaveBeenCalledTimes(1));
   expect(attempt.defaultPrevented).toBe(true);
   expect(mocks.push).not.toHaveBeenCalled();
   unmount(); delete (window as Window & { navigation?: EventTarget }).navigation;
 });
 it('permits an explicitly approved programmatic transition exactly once', async () => {
   const navigation = new EventTarget();
   Object.defineProperty(window, 'navigation', { configurable: true, value: navigation });
   mocks.confirm.mockReset(); mocks.confirm.mockResolvedValue(true); mocks.push.mockClear();
   const { unmount } = renderHook(() => useTrainerInfrastructureUnsavedChangesGuard(true));
   const destination = new URL('/frontend_trainer/trainer_account/account_security', window.location.href).href;
   const attempt = Object.assign(new Event('navigate', { cancelable: true }), {
     canIntercept: true, destination: { url: destination }, navigationType: 'push',
   });
   await act(async () => { navigation.dispatchEvent(attempt); });
   await waitFor(() => expect(mocks.push).toHaveBeenCalledWith('/frontend_trainer/trainer_account/account_security'));
   expect(attempt.defaultPrevented).toBe(true);
   const retry = Object.assign(new Event('navigate', { cancelable: true }), {
     canIntercept: true, destination: { url: destination }, navigationType: 'push',
   });
   act(() => { navigation.dispatchEvent(retry); });
   expect(retry.defaultPrevented).toBe(false);
   unmount(); delete (window as Window & { navigation?: EventTarget }).navigation;
 });
});
