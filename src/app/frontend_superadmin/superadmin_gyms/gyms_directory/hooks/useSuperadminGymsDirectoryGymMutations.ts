'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.query_keys';
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';
import { useSuperadminGymsDirectoryGhostLoginWorkflow } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGhostLoginWorkflow';
import { resolveSuperadminGymsDirectoryFeedback } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFeedback';

import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types';
import type { MouseEvent } from 'react';

// DATA FLOW: Superadmin UI → useSuperadminGymsDirectoryGymMutations → Superadmin module API/state → consuming component


// RESPONSIBILITY: Manage Superadmin gym tenant impersonation and suspension mutations, confirmations, cache invalidation, and feedback.
// DATA FLOW: feature API/schema → hook/context → useSuperadminGymsDirectoryGymMutations consumers.


/**
 * Purpose: Manage Superadmin gym tenant impersonation and suspension mutations, confirmations, cache invalidation, and feedback.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsDirectoryGymMutations.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsDirectoryGymMutations → consuming feature component.
/**
 * @description Coordinates the use Superadmin gyms gym mutations concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminGymsDirectoryGymMutations(gyms: Tenant[]) {
    const { confirm } = useConfirm();
    const t = useTranslations('superadmin_gyms');
    const suspendKeysRef = useRef(new Map<string, string>());
    const { startGhostLogin, isStartingGhostLogin, activeGymId } = useSuperadminGymsDirectoryGhostLoginWorkflow();
    const queryClient = useQueryClient();
    const suspendMutation = useMutation({
        mutationFn: ({ id, status, idempotencyKey }: { id: string; status: Tenant['status']; idempotencyKey: string }) => gymsApi.updateGymStatus(id, status, idempotencyKey),
        onSuccess: (res, variables) => {
            suspendKeysRef.current.delete(`${variables.id}:${variables.status}`);
            toast.success(res.message, { id: `superadmin-gym-status-success-${variables.id}-${variables.status}` });
            queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
        },
        onError: (err: unknown, variables) => {
            toast.error(resolveSuperadminGymsDirectoryFeedback(err, t('ui.action_failed_retry')), { id: `superadmin-gym-status-error-${variables.id}-${variables.status}` });
        },
    });
    const onGhostLoginClick = (e: MouseEvent, gymId: string, _gymName: string) => {
        e.stopPropagation();
        const gym = gyms.find((item) => item.id === gymId);
        if (!gym) { toast.error(t('ui.action_failed_retry'), { id: 'superadmin-gym-ghost-login-missing' }); return; }
        startGhostLogin({ id: gym.id, name: gym.name, plan: gym.plan, adminEmail: gym.adminEmail });
    };
    const onSuspendClick = async (e: MouseEvent, gymId: string, gymName: string, currentStatus: string) => {
        e.stopPropagation();
        const newStatus = currentStatus === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED ? SUPERADMIN_GYM_STATUS_CODES.ACTIVE : SUPERADMIN_GYM_STATUS_CODES.SUSPENDED;
        const isSuspended = currentStatus === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED;
        const confirmed = await confirm({
            title: t(isSuspended ? 'ui.unsuspend_gym_title_repair' : 'ui.suspend_gym_title_repair'),
            message: t(isSuspended ? 'ui.unsuspend_gym_message_repair' : 'ui.suspend_gym_message_repair', { name: gymName }),
            type: isSuspended ? 'info' : 'danger',
            confirmText: t(isSuspended ? 'ui.unsuspend_action_repair' : 'ui.suspend_action_repair')
        });
        if (!confirmed) { suspendKeysRef.current.delete(`${gymId}:${newStatus}`); return; }
        if (confirmed) {
            const intentKey = `${gymId}:${newStatus}`;
            const key = suspendKeysRef.current.get(intentKey) ?? crypto.randomUUID();
            suspendKeysRef.current.set(intentKey, key);
            suspendMutation.mutate({ id: gymId, status: newStatus, idempotencyKey: key });
        }
    };
    const actionLoadingId = (() => { if (isStartingGhostLogin) { return (activeGymId); } if (suspendMutation.isPending) { return (suspendMutation.variables?.id); } return (null); })();
    return {
        suspendMutation,
        actionLoadingId,
        onGhostLoginClick,
        onSuspendClick,
    };
}
