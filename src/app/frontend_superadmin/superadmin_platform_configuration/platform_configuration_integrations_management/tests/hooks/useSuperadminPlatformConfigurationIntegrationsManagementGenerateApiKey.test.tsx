import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { generateSuperadminApiKey } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/api/superadmin_platform_configuration_integrations_management_api_crud.api';
import { useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKey } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKey';

import type { SuperadminGenerateApiKeyResult } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management_generate_api_key.types';
import type { ApiResponse } from '@/lib/api';
import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/api/superadmin_platform_configuration_integrations_management_api_crud.api', () => ({
  generateSuperadminApiKey: vi.fn(),
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKey', () => {
  it('calls the module API with the validated payload and intent idempotency key', async () => {
    const generatedResponse: ApiResponse<SuperadminGenerateApiKeyResult> = { success: true, message: 'Generated', data: { key: { id: 'key-1', tenant: 'Tenant 1', label: 'Test key', status: 'ACTIVE', lastUsed: null, rateLimit: '120/min' }, secretKey: 'secret' } };
    vi.mocked(generateSuperadminApiKey).mockResolvedValue(generatedResponse);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKey(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ payload: { label: 'Test key', tenantId: 't1', scopes: ['READ'] }, idempotencyKey: 'intent-1' });
    });
    await waitFor(() => expect(generateSuperadminApiKey).toHaveBeenCalledWith({ label: 'Test key', tenantId: 't1', scopes: ['READ'] }, 'intent-1'));
  });
});
