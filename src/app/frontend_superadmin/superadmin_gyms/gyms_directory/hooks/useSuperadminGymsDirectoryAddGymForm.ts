'use client';
// DATA FLOW: Superadmin UI → useSuperadminGymsDirectoryAddGymForm → Superadmin module API/state → consuming component
// RESPONSIBILITY: Manages form state, validation, and API submission for onboarding a new gym.
// DATA FLOW: SuperadminGymsAddGymForm -> useSuperadminGymsDirectoryAddGymForm -> gymsApi.createGym
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.query_keys';
import { useSuperadminGymsDirectoryAddGymFormSubmit } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryAddGymFormSubmit';
import { useSuperadminGymsDirectoryUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUnsavedChangesGuard';
import { OnboardGymSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_validation.schemas';

import type { OnboardGymFormValues } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_validation.schemas';


/**
 * Custom hook to encapsulate the logic for the SuperadminGymsAddGymForm component.
 * Handles form validation, UI state (provisioning logs), and API submission.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsDirectoryAddGymForm.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsDirectoryAddGymForm → consuming feature component.
/**
 * @description Coordinates the use Superadmin gyms add gym form concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminGymsDirectoryAddGymForm() {
    const t = useTranslations('superadmin_gyms');
    const [showPassword, setShowPassword] = useState(false);
    const plansQuery = useQuery({
        queryKey: SUPERADMIN_GYMS_QUERY_KEYS.subscriptionPlans,
        queryFn: async () => {
            const res = await gymsApi.fetchSubscriptionPlans();
            if (!res.success) throw new Error(res.message || 'Failed to load subscription plans');
            return res.data;
        },
    });
    const plans = plansQuery.data || [];
    const loadingPlans = plansQuery.isPending;
    const form = useForm<OnboardGymFormValues>({
        resolver: zodResolver(OnboardGymSchema),
        defaultValues: { plan: '' },
    });
    const { onSubmit, isProvisioning, provisioningLogs } = useSuperadminGymsDirectoryAddGymFormSubmit(form.setError);
    useSuperadminGymsDirectoryUnsavedChangesGuard(form.formState.isDirty && !isProvisioning, t('ui.unsaved_gym_details_discard_repair'));
    return {
        form,
        register: form.register,
        handleSubmit: form.handleSubmit,
        onSubmit,
        control: form.control,
        errors: form.formState.errors,
        isDirty: form.formState.isDirty,
        isProvisioning,
        provisioningLogs,
        showPassword,
        setShowPassword,
        plans,
        loadingPlans,
        plansError: plansQuery.isError,
        retryPlans: plansQuery.refetch,
    };
}
