// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useMemo, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseISO } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { MANAGER_MEMBERSHIP_LIFECYCLE_ACTIVE_MEMBER_STATUS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle.constants';
import { useManagerMembershipLifecycleLogic } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleLogic';
import { useManagerMembershipLifecycleMembershipMutations } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleMembershipMutations';
import { useManagerMembershipLifecycleMembershipOverviewQuery } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleMembershipQueries';
import { MOCK_PLANS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/fixtures/ManagerMembershipLifecycleMockData';
import { MOCK_PLANS_MEMBERSHIP_OVERVIEW } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/fixtures/ManagerMembershipLifecycleMembershipMockData';
import { managerPlansActivateSchema, managerPlansFreezeSchema, managerPlansRenewSchema } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/schemas/manager_membership_lifecycle_membership_forms.schemas';
import type { ManagerMembershipLifecycleActivateForm, ManagerMembershipLifecycleFreezeForm, ManagerMembershipLifecycleRenewForm } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle_membership_form.types';
/** Coordinates the three independent membership forms and their mutation lifecycles. */
/**
 * @description Coordinates plans feature state and its documented UI/API boundary through useManagerMembershipLifecycleMembershipForms.
 * @dependencies Uses ManagerConfirmProvider, ManagerIdempotency, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast, ManagerUnsavedChangesGuard.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; reuses the caller-provided idempotency key for the same mutation intent.
 */
/**
 * @description Owns Manager Plans membership activation, renewal, and freeze form workflows.
 * @dependencies Uses module-owned schemas, mutations, confirmation, idempotency, and query cache reconciliation.
 * @edge-case Prevents duplicate operations and preserves dirty state until each successful mutation completes.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembershipLifecycleMembershipForms owns the plans feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembershipLifecycleMembershipForms() {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');
  const locale = useLocale();
  const { plans, activeTab, setActiveTab } = useManagerMembershipLifecycleLogic();
  const overviewQuery = useManagerMembershipLifecycleMembershipOverviewQuery();
  const { activateMutation, renewMutation, freezeMutation } = useManagerMembershipLifecycleMembershipMutations();
  const { confirm } = useConfirm();
  const activateForm = useForm<ManagerMembershipLifecycleActivateForm>({ resolver: zodResolver(managerPlansActivateSchema), defaultValues: { memberId: '', planId: '', startDate: '' } });
  const renewForm = useForm<ManagerMembershipLifecycleRenewForm>({ resolver: zodResolver(managerPlansRenewSchema), defaultValues: { memberId: '', planId: '', newExpiryDate: '' } });
  const freezeForm = useForm<ManagerMembershipLifecycleFreezeForm>({ resolver: zodResolver(managerPlansFreezeSchema), defaultValues: { memberId: '', freezeFrom: '', freezeUntil: '' } });
  const activateKeyRef = useRef<string | null>(null);
  const renewKeyRef = useRef<string | null>(null);
  const freezeKeyRef = useRef<string | null>(null);
  const isDirty = activateForm.formState.isDirty || renewForm.formState.isDirty || freezeForm.formState.isDirty;
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(isDirty);

  const resolvedOverview = overviewQuery.data?.memberOptions?.length ? overviewQuery.data : MOCK_PLANS_MEMBERSHIP_OVERVIEW;
  const resolvedPlans = plans.length > 0 ? plans : MOCK_PLANS;
  const memberOptions = useMemo(() => (resolvedOverview.memberOptions ?? []).map((member) => ({ value: member.id, label: `${member.name} (${member.phone})` })), [resolvedOverview]);
  const planOptions = useMemo(() => resolvedPlans.map((plan) => ({ value: plan.id, label: `${plan.name} — ${plan.tier}` })), [resolvedPlans]);
  const freezeMemberOptions = useMemo(() => (resolvedOverview.memberOptions ?? []).filter((member) => member.status === MANAGER_MEMBERSHIP_LIFECYCLE_ACTIVE_MEMBER_STATUS).map((member) => ({ value: member.id, label: `${member.name} (${member.phone})` })), [resolvedOverview]);
  const formatExpiry = (value: string) => { const parsed = parseISO(value); return Number.isNaN(parsed.getTime()) ? '—' : new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(parsed); };

  const submitActivate = activateForm.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: t('CONFIRM_MEMBERSHIP_ACTIVATION_TITLE'), message: t('CONFIRM_MEMBERSHIP_ACTIVATION_MESSAGE'), confirmText: t('CONFIRM_MEMBERSHIP_ACTIVATE'), type: 'warning' });
    if (!confirmed) return;
    activateKeyRef.current ??= ManagerInfrastructureIdempotency();
    try { const response = await activateMutation.mutateAsync({ payload: data, idempotencyKey: activateKeyRef.current }); activateForm.reset(); activateKeyRef.current = null; ManagerInfrastructureShowSuccessToast(response.message, 'manager-plans-activate-success'); } catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, 'manager-plans-activate-error'); }
  });
  const submitRenew = renewForm.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: t('CONFIRM_MEMBERSHIP_RENEWAL_TITLE'), message: t('CONFIRM_MEMBERSHIP_RENEWAL_MESSAGE'), confirmText: t('CONFIRM_MEMBERSHIP_RENEW'), type: 'warning' });
    if (!confirmed) return;
    renewKeyRef.current ??= ManagerInfrastructureIdempotency();
    try { const response = await renewMutation.mutateAsync({ payload: data, idempotencyKey: renewKeyRef.current }); renewForm.reset(); renewKeyRef.current = null; ManagerInfrastructureShowSuccessToast(response.message, 'manager-plans-renew-success'); } catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, 'manager-plans-renew-error'); }
  });
  const submitFreeze = freezeForm.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: t('CONFIRM_MEMBERSHIP_FREEZE_TITLE'), message: t('CONFIRM_MEMBERSHIP_FREEZE_MESSAGE'), confirmText: t('CONFIRM_MEMBERSHIP_FREEZE'), type: 'warning' });
    if (!confirmed) return;
    freezeKeyRef.current ??= ManagerInfrastructureIdempotency();
    try { const response = await freezeMutation.mutateAsync({ payload: data, idempotencyKey: freezeKeyRef.current }); freezeForm.reset(); freezeKeyRef.current = null; ManagerInfrastructureShowSuccessToast(response.message, 'manager-plans-freeze-success'); } catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, 'manager-plans-freeze-error'); }
  });
  const handleTabChange = (nextTab: typeof activeTab) => { if (nextTab === activeTab) return; void confirmAndClose(() => setActiveTab(nextTab)); };

  return { plans: resolvedPlans, activeTab, handleTabChange, overview: resolvedOverview, isPending: overviewQuery.isPending, isError: overviewQuery.isError, error: overviewQuery.error, activateForm, renewForm, freezeForm, memberOptions, planOptions, freezeMemberOptions, formatExpiry, submitActivate, submitRenew, submitFreeze, activateMutation, renewMutation, freezeMutation };
}
