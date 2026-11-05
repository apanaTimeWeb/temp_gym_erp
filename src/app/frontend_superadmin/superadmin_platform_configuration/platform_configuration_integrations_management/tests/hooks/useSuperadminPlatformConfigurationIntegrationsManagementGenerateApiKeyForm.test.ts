import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyForm } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyForm';
import type { SuperadminGenerateApiKeyFormValues } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management_generate_api_key.types';



const mutateAsync = vi.fn();
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKey', () => ({
  useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKey: () => ({ mutateAsync, isPending: false, error: null }),
}));

describe('useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyForm', () => {
  beforeEach(() => { mutateAsync.mockReset(); });

  it('initializes the required API-key fields and clears generated secret on reset', async () => {
    mutateAsync.mockResolvedValue({ success: true, message: 'Generated', data: { secretKey: 'secret-1' } });
    const { result } = renderHook(() => useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyForm());
    expect(result.current.form.getValues()).toEqual({ label: '', tenantId: '', scopes: ['READ'] });

    await act(async () => {
      await result.current.handleSubmit({ label: 'Read key', tenantId: 'tenant-1', scopes: ['READ'] } satisfies SuperadminGenerateApiKeyFormValues);
    });
    await waitFor(() => expect(result.current.generatedSecret).toBe('secret-1'));

    act(() => result.current.resetForm());
    expect(result.current.generatedSecret).toBeNull();
    expect(result.current.idempotencyKeyRef.current).toBeNull();
  });

  it('reuses an idempotency key for the same failed intent but creates a new key when the payload changes', async () => {
    mutateAsync.mockRejectedValueOnce(new Error('temporary failure')).mockResolvedValueOnce({ success: true, message: 'Generated', data: { secretKey: 'secret-2' } });
    const { result } = renderHook(() => useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyForm());
    const initialPayload: SuperadminGenerateApiKeyFormValues = { label: 'Read key', tenantId: 'tenant-1', scopes: ['READ'] };
    await act(async () => { await result.current.handleSubmit(initialPayload); });
    const firstKey = mutateAsync.mock.calls[0]?.[0].idempotencyKey;
    await act(async () => { await result.current.handleSubmit(initialPayload); });
    const retryKey = mutateAsync.mock.calls[1]?.[0].idempotencyKey;
    expect(firstKey).toBeTruthy();
    expect(retryKey).toBe(firstKey);

    mutateAsync.mockRejectedValueOnce(new Error('temporary failure'));
    await act(async () => { await result.current.handleSubmit({ ...initialPayload, label: 'Updated Read key' }); });
    const changedIntentKey = mutateAsync.mock.calls[2]?.[0].idempotencyKey;
    expect(changedIntentKey).toBeTruthy();
    expect(changedIntentKey).not.toBe(firstKey);
  });
});
