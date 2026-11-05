// DATA FLOW: Owning module inputs → this hook state/derived result → consuming module-owned components.
'use client';
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/hooks/useManagerReferralsRewardsLocalUnsavedChangesGuard';

import { EMPTY_REFERRAL_FORM } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards_form_defaults.constants';
import { useManagerReferralsRewardsLogic } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/hooks/useManagerReferralsRewardsLogic';
import { managerReferralFormSchema } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/schemas/manager_referrals_rewards_form.schemas';
import type { ManagerReferralFormValues } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/types/manager_referrals_rewards_form.types';

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates referrals feature state and its documented UI/API boundary through useManagerReferralsRewardsForm.
 * @dependencies Uses ManagerUnsavedChangesGuard, useManagerReferralsRewardsLogic, ManagerReferralsRewardsFormSchema, ManagerReferralsRewardsFormTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerReferralsRewardsForm owns the referrals feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerReferralsRewardsForm() {
  const logic = useManagerReferralsRewardsLogic();
  const form = useForm<ManagerReferralFormValues>({ resolver: zodResolver(managerReferralFormSchema), defaultValues: EMPTY_REFERRAL_FORM });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (!logic.isAddModalOpen) form.reset(EMPTY_REFERRAL_FORM); }, [form, logic.isAddModalOpen]);
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(logic.isAddModalOpen && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => logic.setIsAddModalOpen(false)); };
  const submit = form.handleSubmit(async (values) => { try { await logic.createReferral(values); form.reset(EMPTY_REFERRAL_FORM); logic.setIsAddModalOpen(false); } catch { /* Mutation hook owns error feedback; keep the modal and draft available for correction/retry. */ } });
  return { ...logic, form, handleClose, submit };
}
