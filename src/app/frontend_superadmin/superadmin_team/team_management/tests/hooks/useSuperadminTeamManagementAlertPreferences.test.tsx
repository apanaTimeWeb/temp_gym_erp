import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { updateTeamAlertPreferences } from '@/app/frontend_superadmin/superadmin_team/team_management/api/superadmin_team_management.api';
import { useSuperadminTeamManagementAlertPreferences } from '@/app/frontend_superadmin/superadmin_team/team_management/hooks/useSuperadminTeamManagementAlertPreferences';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_team/team_management/api/superadmin_team_management.api', () => ({ updateTeamAlertPreferences: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
}

beforeEach(() => vi.clearAllMocks());

describe('useSuperadminTeamManagementAlertPreferences', () => {
  it('persists the caller-selected preferences through the Team API', async () => {
    vi.mocked(updateTeamAlertPreferences).mockResolvedValue({ success: true, message: 'Updated', data: null } as never);
    const { result } = renderHook(() => useSuperadminTeamManagementAlertPreferences(), { wrapper: createWrapper() });
    const preferences = [{ name: 'critical_alerts', enabled: true }];
    await act(async () => { await result.current.savePreferences(preferences); });
    expect(updateTeamAlertPreferences).toHaveBeenCalledWith(preferences, expect.any(String));
    expect(result.current.isSaving).toBe(false);
  });

  it('reuses a key for an unchanged retry and rotates it when preferences change', async () => {
    vi.mocked(updateTeamAlertPreferences)
      .mockResolvedValueOnce({ success: false, message: 'Temporary failure', data: null } as never)
      .mockResolvedValueOnce({ success: false, message: 'Temporary failure', data: null } as never)
      .mockResolvedValueOnce({ success: true, message: 'Updated', data: null } as never);
    const { result } = renderHook(() => useSuperadminTeamManagementAlertPreferences(), { wrapper: createWrapper() });
    const first = [{ name: 'critical_alerts', enabled: true }];
    const changed = [{ name: 'critical_alerts', enabled: false }];

    await act(async () => { await expect(result.current.savePreferences(first)).rejects.toThrow('Temporary failure'); });
    await act(async () => { await expect(result.current.savePreferences(changed)).rejects.toThrow('Temporary failure'); });
    await act(async () => { await result.current.savePreferences(changed); });

    const calls = vi.mocked(updateTeamAlertPreferences).mock.calls;
    expect(calls[0]?.[1]).not.toBe(calls[1]?.[1]);
    expect(calls[1]?.[1]).toBe(calls[2]?.[1]);
  });
});
