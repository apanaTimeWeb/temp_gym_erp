// RESPONSIBILITY: Defines regression tests for useAdminSettingsManagementMutation.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_settings/settings_management/tests/hooks/useAdminSettingsManagementMutation.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
// Hook now uses localized error fallback; keep host-independent tests deterministic.
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAdminSettingsMutation } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementMutation';

const submit = vi.fn().mockResolvedValue({ message: 'ok' });
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminSettingsMutation', () => {
  beforeEach(() => vi.clearAllMocks());
  it('submits through the caller-provided API boundary and returns the mutation result', async () => {
    const { result } = renderHook(() => useAdminSettingsMutation(submit, 'settings-save'), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ enabled: true } as never);
    });
    expect(submit).toHaveBeenCalledWith({ enabled: true }, expect.any(String));
  });
});
