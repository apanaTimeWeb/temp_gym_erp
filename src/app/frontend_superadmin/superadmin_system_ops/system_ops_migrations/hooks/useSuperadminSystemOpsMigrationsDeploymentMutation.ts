'use client';
// RESPONSIBILITY: Owns the schema migration deployment mutation and cache reconciliation.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { migrationsApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations.api';
import { SUPERADMIN_SYSTEM_OPS_MIGRATIONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations.query_keys';



// DATA FLOW: API / URL state / module client state → useTranslations → superadmin_system_ops_migrations view components.
/**
 * Purpose: Dedicated mutation boundary for schema rollout deployment.
 * Inputs: target schema version and idempotency key for the confirmed deployment intent.
 * Output: TanStack mutation state and mutateAsync.
 * Side effects: deployment request, success/error feedback, and targeted list invalidation.
 * Invariant: migration query identity remains scoped to this module.
 */
/**
 * @description Runs the confirmed migration deployment mutation and reconciles migration server state.
 * @dependencies Uses the migrations API facade, idempotency-key lifecycle, and TanStack Query invalidation.
 * @edge-case Reuses the same key for one deployment intent and never marks a failed deployment as successful.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminSystemOpsMigrationsDeploymentMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin system ops migrations deployment mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export class MigrationDomainActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MigrationDomainActionError';
  }
}

/**
 * @description Coordinates the use Superadmin system ops migrations deployment mutation concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminSystemOpsMigrationsDeploymentMutation() {
  const t = useTranslations('superadmin_system_ops_migrations');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ targetVersion, idempotencyKey }: { targetVersion: string; idempotencyKey: string }) => {
      const response = await migrationsApi.startMigration(targetVersion, idempotencyKey);
      if (!response.success) throw new MigrationDomainActionError(response.message?.trim() || t('ui.action_failed_retry'));
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message, { id: 'superadmin-migrations-deploy-success' });
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_SYSTEM_OPS_MIGRATIONS_QUERY_KEYS.list });
    },
    onError: (error: unknown) => {
      const message = error instanceof MigrationDomainActionError ? error.message : t('ui.action_failed_retry');
      toast.error(message, { id: `superadmin-migrations-deploy-error-${message}` });
    },
  });
}
