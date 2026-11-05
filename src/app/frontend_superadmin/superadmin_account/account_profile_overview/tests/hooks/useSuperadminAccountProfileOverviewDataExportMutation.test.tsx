import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { superadminProfileDataExportApi } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview_data_export.api';
import { useSuperadminAccountProfileOverviewDataExportMutation } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewDataExportMutation';
import { SuperadminAccountProfileOverviewApiResponseSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_api_response.schema';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_account/account_profile_overview/api/superadmin_account_profile_overview_data_export.api', () => ({ superadminProfileDataExportApi: { requestFullDataExport: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_account/account_profile_overview/hooks/useSuperadminAccountProfileOverviewSocketEvent', () => ({ useSuperadminAccountProfileOverviewSocketEvent: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminAccountProfileOverviewDataExportMutation', () => {
  it('starts an export with the provided idempotency key and exposes started completion state', async () => {
    vi.mocked(superadminProfileDataExportApi.requestFullDataExport).mockResolvedValue({ success: true, message: 'Started', data: null, requestId: 'req-1' } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminAccountProfileOverviewDataExportMutation(), { wrapper });
    await act(async () => { await result.current.requestExport(); });
    expect(superadminProfileDataExportApi.requestFullDataExport).toHaveBeenCalledWith(expect.any(String));
    await waitFor(() => expect(result.current.completionState).toBe('started'));
  });
});
describe('Account Profile API response envelope', () => {
  const schema = SuperadminAccountProfileOverviewApiResponseSchema(z.null());
  it('accepts success with nullable data and failure without data', () => {
    expect(schema.safeParse({ success: true, message: 'started', data: null, requestId: 'req-1' }).success).toBe(true);
    expect(schema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'UNAVAILABLE', statusCode: 503, requestId: 'req-2' }).success).toBe(true);
  });
  it('rejects invalid success and failure data combinations', () => {
    expect(schema.safeParse({ success: true, message: 'missing data' }).success).toBe(false);
    expect(schema.safeParse({ success: false, message: 'failure', data: { unexpected: true } }).success).toBe(false);
  });
});
