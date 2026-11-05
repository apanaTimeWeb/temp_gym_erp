// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { useManagerProfileAndSecurityLogic } from '@/app/frontend_manager/manager_dashboard/profile_and_security/hooks/useManagerProfileAndSecurityLogic';
import { managerPasswordFormSchema, managerProfileFormSchema } from '@/app/frontend_manager/manager_dashboard/profile_and_security/schemas/manager_profile_and_security_form_forms.schemas';
import type { ManagerPasswordFormValues, ManagerProfileAndSecurityFormValues } from '@/app/frontend_manager/manager_dashboard/profile_and_security/types/manager_profile_and_security_form.types';


/** Coordinates the two profile forms while keeping presentation free from form lifecycle code. */
/**
 * @description Coordinates profile feature state and its documented UI/API boundary through useManagerProfileAndSecurityForms.
 * @dependencies Uses ManagerIdempotency, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast, ManagerUnsavedChangesGuard, useManagerProfileAndSecurityLogic.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerProfileAndSecurityForms owns the profile feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerProfileAndSecurityForms() {
  const logic = useManagerProfileAndSecurityLogic();
  const profileForm = useForm<ManagerProfileAndSecurityFormValues>({ resolver: zodResolver(managerProfileFormSchema), defaultValues: { name: '', phone: '' } });
  const passwordForm = useForm<ManagerPasswordFormValues>({ resolver: zodResolver(managerPasswordFormSchema), defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' } });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (logic.user && !profileForm.formState.isDirty) profileForm.reset({ name: logic.user.name, phone: logic.user.phone }); }, [logic.user, profileForm.formState.isDirty, profileForm.reset]);
  const isDirty = profileForm.formState.isDirty || passwordForm.formState.isDirty;
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(isDirty);
  const profileKeyRef = useRef<string | null>(null);
  const passwordKeyRef = useRef<string | null>(null);
  const handleTabChange = (next: typeof logic.activeTab) => { if (next === logic.activeTab) return; void confirmAndClose(() => logic.setActiveTab(next)); };
  const submitProfile = profileForm.handleSubmit(async (values) => { try { profileKeyRef.current ??= ManagerInfrastructureIdempotency(); const response = await logic.profileMutation.mutateAsync({ payload: values, idempotencyKey: profileKeyRef.current }); profileForm.reset(response.data ?? values); profileKeyRef.current = null; ManagerInfrastructureShowSuccessToast(response.message, `manager-profile-profile-${logic.user?.id ?? 'current'}-success`); } catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, `manager-profile-profile-${logic.user?.id ?? 'current'}-error`); } });
  const submitPassword = passwordForm.handleSubmit(async (values) => { try { passwordKeyRef.current ??= ManagerInfrastructureIdempotency(); const response = await logic.passwordMutation.mutateAsync({ payload: values, idempotencyKey: passwordKeyRef.current }); passwordKeyRef.current = null; passwordForm.reset(); ManagerInfrastructureShowSuccessToast(response.message, `manager-profile-password-${logic.user?.id ?? 'current'}-success`); } catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, `manager-profile-password-${logic.user?.id ?? 'current'}-error`); } });
  return { ...logic, profileForm, passwordForm, handleTabChange, submitProfile, submitPassword };
}
