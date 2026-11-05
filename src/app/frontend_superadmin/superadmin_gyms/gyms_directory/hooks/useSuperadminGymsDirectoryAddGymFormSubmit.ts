'use client';
import { useState, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.query_keys';
import { SUPERADMIN_GYMS_DIRECTORY_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import { resolveSuperadminGymsDirectoryFeedback } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFeedback';
import { applySuperadminGymsDirectoryFormApiErrors, createSuperadminGymsDirectoryFormApiError } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormApiErrors';

import type { OnboardGymFormValues } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_validation.schemas';
import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

// DATA FLOW: Superadmin UI → useSuperadminGymsDirectoryAddGymFormSubmit → Superadmin module API/state → consuming component


// DATA FLOW: Form → provisioning mutation → Query invalidation → visible success/error → gyms list.
// RESPONSIBILITY: Owns the Superadmin tenant-provisioning submission workflow. It never simulates backend infrastructure steps or sends credentials before confirmed success.


/**
 * Purpose: Owns the Superadmin tenant-provisioning submission workflow. It never simulates backend infrastructure steps or sends credentials before confirmed success.
 * Inputs: form values defined by the owning Add Gym form schema.
 * Output: mutation state and provisioning log entries for the view layer.
 * Side effects: calls the module-owned API, updates the gyms query cache, shows backend messages, and navigates after success.
 * Invariant: the same idempotency key is reused until the confirmed provisioning intent succeeds or is abandoned.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsDirectoryAddGymFormSubmit.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsDirectoryAddGymFormSubmit → consuming feature component.
/**
 * @description Coordinates the use Superadmin gyms add gym form submit concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminGymsDirectoryAddGymFormSubmit<T extends FieldValues>(setFormError: UseFormSetError<T>) {
  const router = useRouter();
  const t = useTranslations('superadmin_gyms');
  const queryClient = useQueryClient();
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<{ fingerprint: string; key: string } | null>(null);
  const [provisioningLogs, setProvisioningLogs] = useState<string[]>([]);
  const mutation = useMutation({
    mutationFn: async ({ data, idempotencyKey }: { data: OnboardGymFormValues; idempotencyKey: string }) => {
      const response = await gymsApi.provisionGym({ ...data, planId: data.plan }, idempotencyKey);
      if (!response.success) throw createSuperadminGymsDirectoryFormApiError(response, t('ui.tenant_provisioning_failed_repair'));
      return response;
    },
    onSuccess: async (response) => {
      setProvisioningLogs([t('ui.tenant_provisioning_request_accepted_repair'), t('ui.tenant_ready_repair', { name: response.data?.name ?? 'new tenant' })]);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
      toast.success(response.message, { id: `superadmin-gym-provisioned-${response.data?.id ?? 'new'}` });
      idempotencyKeyRef.current = null;
      router.push(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('list'));
    },
    onError: (error) => {
      const message = resolveSuperadminGymsDirectoryFeedback(error, t('ui.tenant_provisioning_failed_repair'));
      setProvisioningLogs([message]);
      applySuperadminGymsDirectoryFormApiErrors(error, setFormError, ['gymName', 'ownerName', 'adminEmail', 'phone', 'aadharNumber', 'plan', 'temporaryPassword'] as FieldPath<T>[]);
      toast.error(message, { id: 'superadmin-gym-provision-error' });
    },
  });

  const onSubmit = async (data: OnboardGymFormValues) => {
    const confirmed = await confirm({
      title: t('ui.provision_tenant_title_repair'),
      message: t('ui.provision_tenant_message_repair'),
      type: 'warning',
      confirmText: t('ui.provision_tenant_action_repair'),
      cancelText: t('ui.cancel_action_repair'),
    });
    if (!confirmed || mutation.isPending) return;
    const fingerprint = JSON.stringify(data);
    if (!idempotencyKeyRef.current || idempotencyKeyRef.current.fingerprint !== fingerprint) {
      idempotencyKeyRef.current = { fingerprint, key: crypto.randomUUID() };
    }
    setProvisioningLogs([t('ui.submitting_tenant_provisioning_repair')]);
    await mutation.mutateAsync({ data, idempotencyKey: idempotencyKeyRef.current.key });
  };

  return { onSubmit, isProvisioning: mutation.isPending, provisioningLogs };
}
