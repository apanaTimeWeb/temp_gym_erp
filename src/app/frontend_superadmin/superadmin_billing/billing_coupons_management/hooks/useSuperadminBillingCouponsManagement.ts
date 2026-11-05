'use client';
// DATA FLOW: Superadmin UI → useSuperadminBillingCouponsManagement → Superadmin module API/state → consuming component
// RESPONSIBILITY: useCouponsPage.ts encapsulates all state and async logic for the Coupons page.
// DATA FLOW: superadminApi → useCouponsPage → CouponsClient


import { useState, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { couponsApi } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.api';
import { SUPERADMIN_BILLING_COUPONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.query_keys';
import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { useSuperadminBillingCouponsManagementMutations } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementMutations';
import { useSuperadminBillingCouponsManagementSearchDebounce } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementSearchDebounce';
import { useSuperadminBillingCouponsManagementUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementUnsavedChangesGuard';
import { useSuperadminBillingCouponsManagementUrlState } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementUrlState';
import { createSuperadminBillingCouponsFormSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/schemas/superadmin_billing_coupons_management_contract.schemas';
import { createSuperadminBillingCouponsFormApiError } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementFormApiErrors';

import type { Coupon, CouponKpiFilter, CouponFormData } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';


/**
 * Purpose: useCouponsPage.ts encapsulates all state and async logic for the Coupons page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages coupons state, queries, and UI interactions for useSuperadminBillingCouponsManagement.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBillingCouponsManagement → consuming feature component.
/**
 * @description Coordinates the use Superadmin coupons concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export const useSuperadminBillingCouponsManagement = () => {
    const t = useTranslations('superadmin_coupons');
    const { getParam, setParam } = useSuperadminBillingCouponsManagementUrlState();
    const committedSearchQuery = getParam('search', '');
    const { searchQuery, setSearchQuery } = useSuperadminBillingCouponsManagementSearchDebounce(committedSearchQuery, setParam);
    const activeKpi = getParam('kpi', SUPERADMIN_COUPON_STATUS_CODES.ALL) as CouponKpiFilter;
    const statusFilter = getParam('status', SUPERADMIN_COUPON_STATUS_CODES.ALL);
    const startDate = getParam('startDate', '');
    const endDate = getParam('endDate', '');
    const range = getParam('range', 'this_month');
    const setActiveKpi = (val: CouponKpiFilter) => { setParam('kpi', val); setParam('page', '1'); };
    const setStatusFilter = (val: string) => { setParam('status', val); setParam('page', '1'); };
    const queryParams = useMemo(() => {
        const params: Record<string, string> = {};
        if (committedSearchQuery)
            params.search = committedSearchQuery;
        if (range) params.range = range;
        if (statusFilter !== SUPERADMIN_COUPON_STATUS_CODES.ALL)
            params.status = statusFilter;
        if (activeKpi !== SUPERADMIN_COUPON_STATUS_CODES.ALL)
            params.kpi = activeKpi;
        if (startDate)
            params.startDate = startDate;
        if (endDate)
            params.endDate = endDate;
        return params;
    }, [committedSearchQuery, statusFilter, activeKpi, startDate, endDate, range]);
    const queryKey = useMemo(() => SUPERADMIN_BILLING_COUPONS_QUERY_KEYS.list(queryParams), [queryParams]);
    const { data: fetchRes, status, error: queryError, refetch } = useQuery({
        queryKey,
        queryFn: async () => {
            const response = await couponsApi.fetchCoupons(queryParams);
            if (!response.success) throw createSuperadminBillingCouponsFormApiError(response);
            return response;
        },
    });
    const coupons = fetchRes?.data ?? [];
    const error = queryError ? t('ui.coupons_load_error') : null;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const form = useForm<CouponFormData>({
        resolver: zodResolver(createSuperadminBillingCouponsFormSchema({
            codeMin: t('validation.code_min'), codeMax: t('validation.code_max'), codeFormat: t('validation.code_format'),
            discountTypeRequired: t('validation.discount_type_required'), discountPositive: t('validation.discount_positive'),
            maxUsesInteger: t('validation.max_uses_integer'), maxUsesMinimum: t('validation.max_uses_minimum'),
            expiryRequired: t('validation.expiry_required'), expiryFuture: t('validation.expiry_future'), percentageMax: t('validation.percentage_max'),
        }, true)),
        defaultValues: {
            code: '',
            discountType: 'PERCENTAGE',
            discountValue: undefined,
            maxUses: undefined,
            expiryDate: '',
        },
    });
    const { isMutating, handleCreateCoupon, handleUpdateCoupon, handleDeleteCoupon, handleToggleRestore, handleToggleStatus, } = useSuperadminBillingCouponsManagementMutations(setIsModalOpen, setIsEditModalOpen, setSelectedCoupon, selectedCoupon, form);
    useSuperadminBillingCouponsManagementUnsavedChangesGuard(form.formState.isDirty && isModalOpen && !isMutating, t('ui.unsaved_coupon_discard_repair'));
    const filteredCoupons = coupons;
    const activeCoupons = useMemo(() => filteredCoupons.filter(c => c.status === SUPERADMIN_COUPON_STATUS_CODES.ACTIVE && !c.isDeleted).length, [filteredCoupons]);
    const totalRedeemed = useMemo(() => filteredCoupons.reduce((sum, c) => sum + c.currentUses, 0), [filteredCoupons]);
    const totalCoupons = useMemo(() => filteredCoupons.length, [filteredCoupons]);
    return {
        status,
        error,
        refetch,
        coupons: filteredCoupons,
        searchQuery,
        setSearchQuery,
        isModalOpen,
        setIsModalOpen,
        form,
        handleCreateCoupon,
        isMutating,
        activeCoupons,
        totalRedeemed,
        isEditModalOpen,
        setIsEditModalOpen,
        selectedCoupon,
        setSelectedCoupon,
        handleUpdateCoupon,
        handleDeleteCoupon,
        handleToggleRestore,
        handleToggleStatus,
        activeKpi,
        setActiveKpi,
        totalCoupons,
        statusFilter,
        setStatusFilter,
    };
};
