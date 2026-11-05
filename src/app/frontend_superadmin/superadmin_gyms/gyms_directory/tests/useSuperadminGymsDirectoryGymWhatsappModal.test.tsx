import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminGymsDirectoryGymWhatsappModal } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymWhatsappModal';
import { useSuperadminGymsDirectoryStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore';



vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }) }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUnsavedChangesGuard', () => ({ useSuperadminGymsDirectoryUnsavedChangesGuard: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() } }));

describe('useSuperadminGymsDirectoryGymWhatsappModal', () => {
  it('binds the currently selected gym into the outgoing form state and starts clean', () => {
    useSuperadminGymsDirectoryStore.getState().openWhatsappModal?.({ id: 'gym-1', name: 'Gym Alpha', phone: '9876543210', ownerName: 'Owner' } as never);
    const { result } = renderHook(() => useSuperadminGymsDirectoryGymWhatsappModal());
    expect(result.current.selectedGym?.id).toBe('gym-1');
    expect(result.current.isDirty).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
  });
  it('opens a prefilled WhatsApp chat instead of calling the unrelated email endpoint', async () => {
    useSuperadminGymsDirectoryStore.getState().openWhatsappModal?.({ id: 'gym-1', name: 'Gym Alpha', phone: '+91 9876543210', ownerName: 'Owner' } as never);
    const openSpy = vi.spyOn(window, 'open').mockReturnValue({ opener: window } as Window);
    const { result } = renderHook(() => useSuperadminGymsDirectoryGymWhatsappModal());
    await act(async () => { await result.current.onSubmit({ subject: 'Plan update', message: 'Please review your plan' }); });
    expect(openSpy).toHaveBeenCalledWith(expect.stringMatching(/^https:\/\/wa\.me\/919876543210\?text=/), '_blank');
    openSpy.mockRestore();
  });

});
