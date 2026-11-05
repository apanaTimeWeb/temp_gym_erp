vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en' }));
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { useSuperadminGymsDirectoryToolbar } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryToolbar';

vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUrlState', () => ({ useSuperadminGymsDirectoryUrlState: () => ({ getParam: (key: string, fallback: string) => ({ search: 'alpha', statusFilter: 'ACTIVE', planFilter: 'All' } as Record<string, string>)[key] ?? fallback, setParam: vi.fn() }) }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore', () => ({ useSuperadminGymsDirectoryStore: (selector: (state: { viewMode: string; setViewMode: (value: string) => void }) => unknown) => selector({ viewMode: 'list', setViewMode: vi.fn() }) }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api', () => ({ gymsApi: { exportGymsReport: vi.fn().mockResolvedValue({ message: 'Export ready', data: { downloadUrl: 'https://example.com/export.csv' } }) } }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

beforeEach(() => vi.clearAllMocks());

describe('useSuperadminGymsDirectoryToolbar', () => {
  it('exposes URL-backed filters and delegates export with those filters', async () => {
    const { result } = renderHook(() => useSuperadminGymsDirectoryToolbar());
    expect(result.current.search).toBe('alpha');
    expect(result.current.statusFilter).toBe('ACTIVE');
    expect(result.current.planFilter).toBe('All');
    await act(async () => { await result.current.handleExportGyms(); });
    expect(gymsApi.exportGymsReport).toHaveBeenCalledWith({ search: 'alpha', status: 'ACTIVE' });
  });
});
