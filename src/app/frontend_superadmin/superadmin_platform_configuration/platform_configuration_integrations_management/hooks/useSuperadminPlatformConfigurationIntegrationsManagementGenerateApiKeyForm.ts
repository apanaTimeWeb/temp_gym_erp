'use client';

import { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKey } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKey';
import { SuperadminGenerateApiKeyFormSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/schemas/superadmin_platform_configuration_integrations_management_generate_api_key.schemas';
import { applySuperadminPlatformConfigurationIntegrationsManagementFormApiErrors } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/utils/SuperadminPlatformConfigurationIntegrationsManagementFormApiErrors';

import type { SuperadminGenerateApiKeyFormValues } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management_generate_api_key.types';
import type { SubmitHandler } from 'react-hook-form';


// DATA FLOW: Form fields → React Hook Form/Zod → mutation hook → feature API/MSW → TanStack Query cache → generated-secret UI.
// RESPONSIBILITY: Owns API-key generation form setup, submit orchestration, one-time secret state, and idempotency lifecycle. No JSX.
/**
 * @description Owns validated API-key generation form state and mutation orchestration for the integrations feature.
 * @dependencies Uses the feature Zod schema and the dedicated API-key mutation hook; no direct API transport.
 * @edge-case Reuses the same idempotency key across retry attempts for one user intent and clears it only after a successful mutation or explicit form reset.
 */
export function useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyForm() {
  const mutation = useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKey();
  const idempotencyKeyRef = useRef<string | null>(null);
  const payloadFingerprintRef = useRef<string | null>(null);
  const [generatedSecret, setGeneratedSecret] = useState<string | null>(null);
  const form = useForm<SuperadminGenerateApiKeyFormValues>({
    resolver: zodResolver(SuperadminGenerateApiKeyFormSchema),
    defaultValues: { label: '', tenantId: '', scopes: ['READ'] },
  });

  const resetForm = (values?: SuperadminGenerateApiKeyFormValues) => {
    setGeneratedSecret(null);
    idempotencyKeyRef.current = null;
    payloadFingerprintRef.current = null;
    form.reset(values);
  };

  const handleSubmit: SubmitHandler<SuperadminGenerateApiKeyFormValues> = async (data) => {
    try {
      const fingerprint = JSON.stringify(data);
      if (idempotencyKeyRef.current === null || payloadFingerprintRef.current !== fingerprint) {
        idempotencyKeyRef.current = crypto.randomUUID();
        payloadFingerprintRef.current = fingerprint;
      }
      const response = await mutation.mutateAsync({ payload: data, idempotencyKey: idempotencyKeyRef.current });
      setGeneratedSecret(response.data?.secretKey ?? null);
      idempotencyKeyRef.current = null;
      payloadFingerprintRef.current = null;
      form.reset(data);
    } catch (error: unknown) {
      applySuperadminPlatformConfigurationIntegrationsManagementFormApiErrors(error, form.setError, ['label', 'tenantId', 'scopes']);
      // The intent key remains reusable for retry; no secret is cleared on a failed mutation.
    }
  };

  return {
    form,
    mutation,
    generatedSecret,
    idempotencyKeyRef,
    resetForm,
    handleSubmit,
  };
}

