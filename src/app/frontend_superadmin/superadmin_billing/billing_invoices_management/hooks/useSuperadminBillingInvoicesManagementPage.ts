'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminBillingInvoicesManagementPage → consuming feature component.


import { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useUrlState } from '@/hooks/useUrlState';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.api';
import { SUPERADMIN_BILLING_INVOICES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.query_keys';
import { useSuperadminBillingInvoicesManagementManualPayment } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementManualPayment';
import { createSuperadminBillingInvoicesManagementFormApiError } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormApiErrors';
import { calculateSuperadminInvoiceMetrics } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementMetrics';
import { normalizePositiveSafeInteger } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementQueryUtils';

/**
 * @description Owns URL filter state, invoice and tenant queries, derived metrics, and the UI-facing action contract.
 * @dependencies Uses only the Invoices module query registry, API clients, URL-state infrastructure, and dedicated mutation hook.
 * @edge-case Server-side filtering/pagination stays authoritative; local tenant search is only for narrowing the dropdown options.
 */
export function useSuperadminBillingInvoicesManagementPage() {
  const { getParam, setParam } = useUrlState();
  const startDate = getParam('startDate', '');
  const endDate = getParam('endDate', '');
  const range = getParam('range', 'this_month');
  const search = getParam('search', '');
  const statusFilter = getParam('statusFilter', '');
  const currentPage = normalizePositiveSafeInteger(getParam('page', '1'), 1);
  const pageLimit = normalizePositiveSafeInteger(getParam('limit', '10'), 10);

  const setSearch = (value: string) => {
    setParam('search', value);
    setParam('page', '1');
  };
  const setStatusFilter = (value: string | null) => {
    setParam('statusFilter', value ?? '');
    setParam('page', '1');
  };
  const setPage = (page: number) => setParam('page', String(page));

  const [showAddModal, setShowAddModal] = useState(false);
  const [gymSearchTerm, setGymSearchTerm] = useState('');
  const [isGymDropdownOpen, setIsGymDropdownOpen] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState('');

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    params.range = range;
    params.page = String(currentPage);
    params.limit = String(pageLimit);
    return params;
  }, [search, statusFilter, startDate, endDate, range, currentPage, pageLimit]);

  const { data: invoicesRes, isPending, isError, error: queryError, refetch: retryInvoices } = useQuery({
    queryKey: SUPERADMIN_BILLING_INVOICES_QUERY_KEYS.list(queryParams),
    queryFn: async () => {
      const response = await invoicesApi.fetchInvoices(queryParams);
      if (!response.success) throw createSuperadminBillingInvoicesManagementFormApiError(response);
      return response;
    },
  });
  const { data: tenantsRes } = useQuery({
    queryKey: SUPERADMIN_BILLING_INVOICES_QUERY_KEYS.tenants,
    queryFn: async () => {
      const response = await invoicesApi.fetchTenants();
      if (!response.success) throw createSuperadminBillingInvoicesManagementFormApiError(response);
      return response;
    },
  });

  const invoices = invoicesRes?.data ?? [];
  const tenants = tenantsRes?.data ?? [];
  const filteredInvoices = invoices;
  const total = invoicesRes?.meta?.total ?? invoices.length;
  const error = (() => { if (queryError) { if (queryError instanceof Error) { return (queryError.message); } return (String(queryError)); } return (null); })();
  const filteredTenantsForDropdown = useMemo(
    () => tenants.filter((tenant) => (tenant.name ?? '').toLowerCase().includes(gymSearchTerm.toLowerCase())),
    [tenants, gymSearchTerm],
  );
  const selectedGym = tenants.find((tenant) => tenant.id === selectedGymId);
  const { totalsByCurrency, overdueCount } = useMemo(
    () => calculateSuperadminInvoiceMetrics(invoices),
    [invoices],
  );
  const { isLoggingPayment, handleLogManualPayment } = useSuperadminBillingInvoicesManagementManualPayment();

  const handleLogManualPaymentAndResetSelection = async (gymId: string, amount: number, planName: string) => {
    const completed = await handleLogManualPayment(gymId, amount, planName);
    if (completed) setSelectedGymId('');
    return completed;
  };

  const handleSelectGym = (id: string) => {
    setSelectedGymId(id);
    setIsGymDropdownOpen(false);
    setGymSearchTerm('');
  };

  return {
    isPending,
    isError,
    error,
    retryInvoices,
    invoices,
    filteredInvoices,
    filteredTenantsForDropdown,
    selectedGym,
    totalsByCurrency,
    search,
    setSearch,
    showAddModal,
    setShowAddModal,
    gymSearchTerm,
    setGymSearchTerm,
    isGymDropdownOpen,
    setIsGymDropdownOpen,
    isLoggingPayment,
    handleSelectGym,
    statusFilter,
    setStatusFilter,
    startDate,
    endDate,
    overdueCount,
    handleLogManualPayment: handleLogManualPaymentAndResetSelection,
    currentPage,
    pageLimit,
    setPage,
    total,
  };
}
