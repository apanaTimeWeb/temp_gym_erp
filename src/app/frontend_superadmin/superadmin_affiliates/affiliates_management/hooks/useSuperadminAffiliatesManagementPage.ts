'use client';
// DATA FLOW: Superadmin UI → useSuperadminAffiliatesManagementPage → Superadmin module API/state → consuming component
// RESPONSIBILITY: useSuperadminAffiliatesManagementPage.ts encapsulates all state and async logic for the Affiliates page.
// DATA FLOW: superadminApi → useSuperadminAffiliatesManagementPage → SuperadminAffiliatesMain
import { useState, useMemo, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useUrlState } from '@/hooks/useUrlState';

import { SUPERADMIN_AFFILIATE_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management.constants';
import { useSuperadminAffiliatesManagementMutations } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/hooks/useSuperadminAffiliatesManagementMutations';
import { useSuperadminAffiliatesManagementPageQueries } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/hooks/useSuperadminAffiliatesManagementPageQueries';
import { AffiliateSchema } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/schemas/superadmin_affiliates_management_types.schemas';
import { normalizeSuperadminAffiliatesUrlState } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementQueryUtils';

import type { Affiliate, AffiliateStatusFilter, AffiliateFormData } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';



/**
 * Purpose: useSuperadminAffiliatesManagementPage.ts encapsulates all state and async logic for the Affiliates page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description useSuperadminAffiliatesManagementPage.ts encapsulates all state and async logic for the Affiliates page.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminAffiliatesManagementPage responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export const useSuperadminAffiliatesManagementPage = () => {
    const t = useTranslations('superadmin_affiliates');
    const { getParam, setParam } = useUrlState();
    const searchQuery = getParam('search', '');
    const { statusFilter, startDate, endDate, currentPage, pageLimit } = normalizeSuperadminAffiliatesUrlState({
        status: getParam('status', SUPERADMIN_AFFILIATE_ALL_FILTER),
        startDate: getParam('startDate', ''),
        endDate: getParam('endDate', ''),
        page: getParam('page', '1'),
        limit: getParam('limit', '10'),
    });
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
    const setSearchQuery = (val: string) => { setParam('search', val); setParam('page', '1'); };
    const setStatusFilter = (val: AffiliateStatusFilter) => { setParam('status', val); setParam('page', '1'); };
    const setStartDate = (val: string) => { setParam('startDate', val); setParam('page', '1'); };
    const setEndDate = (val: string) => { setParam('endDate', val); setParam('page', '1'); };
    const setPage = (page: number) => setParam('page', String(page));
    const { affiliates, total, totalPages, status, isError, retryAffiliates } = useSuperadminAffiliatesManagementPageQueries({
        searchQuery: debouncedSearchQuery, statusFilter, startDate, endDate, currentPage, pageLimit,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);
    const form = useForm<AffiliateFormData>({
        resolver: zodResolver(AffiliateSchema),
        defaultValues: { name: '', email: '', referralCode: '' },
    });
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingAffiliate(null);
        form.reset({ name: '', email: '', referralCode: '' });
    }, [form]);
    const { isMutating, handleAddAffiliate, handleEditAffiliate, handleToggleAffiliateStatus, handleDeleteAffiliate, handlePayCommission, } = useSuperadminAffiliatesManagementMutations(setIsModalOpen, setEditingAffiliate, form, editingAffiliate);
    const openEditModal = useCallback((affiliate: Affiliate) => {
        setEditingAffiliate(affiliate);
        form.reset({
            name: affiliate.name,
            email: affiliate.email,
            referralCode: affiliate.referralCode,
        });
        setIsModalOpen(true);
    }, [form]);
    const totalAffiliates = total;
    const totalCommission = useMemo(() => affiliates.reduce((sum, a) => sum + a.commissionEarned, 0), [affiliates]);
    const filteredAffiliates = affiliates;
    return {
        status,
        isError,
        retryAffiliates: () => void retryAffiliates(),
        affiliates: filteredAffiliates,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        isModalOpen,
        setIsModalOpen,
        handleCloseModal,
        form,
        handleAddAffiliate,
        handleEditAffiliate,
        handleToggleAffiliateStatus,
        handleDeleteAffiliate,
        handlePayCommission,
        openEditModal,
        editingAffiliate,
        setEditingAffiliate,
        isMutating,
        totalAffiliates,
        totalCommission,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        currentPage,
        totalPages,
        setPage,
    };
};
