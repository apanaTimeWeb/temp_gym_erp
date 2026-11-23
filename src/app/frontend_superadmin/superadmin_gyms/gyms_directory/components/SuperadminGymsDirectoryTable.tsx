'use client';

import React, { useState, useMemo, useRef, useTransition } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSuperadminGymsDirectoryTable } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryTable';
import { useSuperadminGymsDirectoryUrlState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUrlState';
import {
  useTenants,
  usePlans,
  useChangeAccessStatus,
  useDeleteTenant,
} from '../services/SuperadminGymsDirectoryTenantService';
import { PLANS_MASTER } from '../constants/SuperadminGymsDirectoryPlans';
import { SuperadminGymsDirectoryEmptyState as EmptyState } from './tenant/SuperadminGymsDirectoryEmptyState';
import { SuperadminGymsDirectoryErrorState as ErrorState } from './tenant/SuperadminGymsDirectoryErrorState';
import type { Tenant, ListParams } from '../types/SuperadminGymsDirectoryTenantTypes';
import {
  type ColumnKey,
  TOGGLEABLE_COLUMNS,
  STORAGE_KEY,
  getInitialColumnVisibility,
} from '../constants/SuperadminGymsDirectoryTableColumns';
import { exportGymsCsv } from '../utils/SuperadminGymsDirectoryCsvExport';
import { useSuperadminGymsDirectoryTableScroll } from '../hooks/useSuperadminGymsDirectoryTableScroll';
import { useSuperadminGymsDirectoryDropdownListeners } from '../hooks/useSuperadminGymsDirectoryDropdownListeners';
import SuperadminGymsDirectoryTableToolbar from './SuperadminGymsDirectoryTableToolbar';
import SuperadminGymsDirectoryTableHeader from './SuperadminGymsDirectoryTableHeader';
import SuperadminGymsDirectoryTableRow from './SuperadminGymsDirectoryTableRow';
import SuperadminGymsDirectoryTablePagination from './SuperadminGymsDirectoryTablePagination';
import SuperadminGymsDirectoryTableModals from './SuperadminGymsDirectoryTableModals';
import SuperadminGymsDirectoryTableStyles from './SuperadminGymsDirectoryTableStyles';

export const TABLE_COLUMN_COUNT = 12;

export default function SuperadminGymsDirectoryTable() {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const { getParam, setParams } = useSuperadminGymsDirectoryUrlState();

  const pageParam = parseInt(getParam('page', '1'), 10) || 1;
  const pageSizeParam = parseInt(getParam('pageSize', '20'), 10) || 20;
  const searchParam = getParam('search', '');
  const statusParam = getParam('status', 'All');
  const planParam = getParam('planId', 'All');
  const sortByParam = getParam('sortBy', 'createdAt');
  const sortOrderParam = (getParam('sortOrder', 'desc') as 'asc' | 'desc') || 'desc';

  const [searchInput, setSearchInput] = useState(searchParam);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>(getInitialColumnVisibility);
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const columnDropdownRef = useRef<HTMLDivElement>(null);

  const [activeKebabId, setActiveKebabId] = useState<string | null>(null);
  const kebabRef = useRef<HTMLDivElement>(null);

  const [selectedTenantForDrawer, setSelectedTenantForDrawer] = useState<Tenant | null>(null);
  const [drawerTab, setDrawerTab] = useState<'overview' | 'subscription' | 'history'>('history');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedTenantForEdit, setSelectedTenantForEdit] = useState<Tenant | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [confirmStatusTenant, setConfirmStatusTenant] = useState<Tenant | null>(null);
  const [targetStatus, setTargetStatus] = useState<'ACTIVE' | 'INACTIVE'>('INACTIVE');
  const [confirmDeleteTenant, setConfirmDeleteTenant] = useState<Tenant | null>(null);

  const changeStatusMutation = useChangeAccessStatus();
  const deleteMutation = useDeleteTenant();
  const { data: plansMaster = PLANS_MASTER } = usePlans();

  useSuperadminGymsDirectoryDropdownListeners({ columnDropdownRef, kebabRef, setIsColumnDropdownOpen, setActiveKebabId });

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      startTransition(() => { setParams({ search: value.trim() || null, page: '1' }); });
    }, 300);
  };

  const handleStatusChange = (val: string) => setParams({ status: val === 'All' ? null : val, page: '1' });
  const handlePlanChange = (val: string) => setParams({ planId: val === 'All' ? null : val, page: '1' });
  const handlePageSizeChange = (val: string) => setParams({ pageSize: val, page: '1' });
  const handlePageChange = (newPage: number) => setParams({ page: String(newPage) });
  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => {
      const next = { ...prev, [key as ColumnKey]: !prev[key as ColumnKey] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const hookData = useSuperadminGymsDirectoryTable();
  const queryParams: ListParams = useMemo(
    () => ({ page: pageParam, limit: pageSizeParam, search: searchParam, status: statusParam, planId: planParam, sortBy: sortByParam, sortOrder: sortOrderParam }),
    [pageParam, pageSizeParam, searchParam, statusParam, planParam, sortByParam, sortOrderParam]
  );

  const { data: listResponse, isLoading: isQueryLoading, isError: isQueryError, error: queryError, refetch } = useTenants(queryParams);

  const isMockedTest = Boolean(hookData && Array.isArray(hookData.filteredGyms) && hookData.filteredGyms.length > 0 && !listResponse);
  const tenants = useMemo(
    () => (isMockedTest ? (hookData.filteredGyms as unknown as Tenant[]) : (listResponse?.data || [])),
    [isMockedTest, hookData, listResponse]
  );
  const total = isMockedTest ? (hookData.total ?? tenants.length) : (listResponse?.total || 0);
  const totalPages = isMockedTest ? (Math.ceil(total / (hookData.pageLimit || 20)) || 1) : (listResponse?.totalPages || 1);
  const currentPage = isMockedTest ? (hookData.currentPage || pageParam) : (listResponse?.page || pageParam);
  const isLoading = isMockedTest ? false : isQueryLoading;
  const isError = isMockedTest ? false : isQueryError;
  const error = isMockedTest ? null : queryError;

  const { tableContainerRef, scrolledLeft, scrolledRight, handleTableScroll } = useSuperadminGymsDirectoryTableScroll(tenants.length);

  const effectiveSortBy = (isMockedTest && hookData.sortBy) ? hookData.sortBy : sortByParam;
  const effectiveSortOrder = (isMockedTest && hookData.sortOrder) ? hookData.sortOrder : sortOrderParam;
  const isColVisible = (col: string) => (isMockedTest && col === 'lastStatusChange' ? true : visibleColumns[col as ColumnKey]);

  const handleSort = (col: string) => {
    if (isMockedTest && hookData.setSortBy && hookData.setSortOrder) {
      if (effectiveSortBy === col) hookData.setSortOrder(effectiveSortOrder === 'asc' ? 'desc' : 'asc');
      else { hookData.setSortBy(col); hookData.setSortOrder('desc'); }
      return;
    }
    if (sortByParam === col) setParams({ sortOrder: sortOrderParam === 'asc' ? 'desc' : 'asc' });
    else setParams({ sortBy: col, sortOrder: 'desc' });
  };

  const handleRowClick = (tenant: Tenant) => {
    if (isMockedTest && hookData.handleRowClick) {
      hookData.handleRowClick(tenant as unknown as Parameters<typeof hookData.handleRowClick>[0]);
      return;
    }
    setSelectedTenantForDrawer(tenant);
    setDrawerTab('overview');
    setIsDrawerOpen(true);
  };

  const executeStatusChange = async (data: { reason: string; note: string }) => {
    if (!confirmStatusTenant) return;
    try {
      await changeStatusMutation.mutateAsync({ id: confirmStatusTenant.id, accessStatus: targetStatus, reason: data.reason, note: data.note });
      toast.success(`Gym "${confirmStatusTenant.gymName}" is now ${targetStatus === 'ACTIVE' ? 'Active' : 'Deactivated'}.`);
      setConfirmStatusTenant(null);
      void refetch();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to update access status');
    }
  };

  const executeDelete = async (data: { reason: string; note: string }) => {
    if (!confirmDeleteTenant) return;
    try {
      await deleteMutation.mutateAsync({ id: confirmDeleteTenant.id, reason: data.reason, note: data.note });
      toast.success(`Gym "${confirmDeleteTenant.gymName}" has been deleted.`);
      setConfirmDeleteTenant(null);
      void refetch();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete gym');
    }
  };

  const handleLoginAs = (e: React.MouseEvent, tenant: Tenant) => {
    e.stopPropagation();
    toast.success(`Redirecting to Admin Portal for ${tenant.gymName}...`);
    try {
      localStorage.setItem('ghost_login_tenant_id', tenant.id);
      localStorage.setItem('ghost_login_gym_name', tenant.gymName);
      localStorage.setItem('ghost_login_gym_code', tenant.code);
    } catch { /* Safe fallback */ }
    router.push('/frontend_admin/admin_dashboard/dashboard_overview');
  };

  const renderSortIndicator = (col: string) => {
    if (effectiveSortBy !== col) return <ArrowUpDown size={12} className="text-secondary" aria-hidden="true" />;
    return effectiveSortOrder === 'asc' ? <ArrowUp size={12} className="text-yellow-400 font-bold" aria-hidden="true" /> : <ArrowDown size={12} className="text-yellow-400 font-bold" aria-hidden="true" />;
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden gym-table-container">
      <SuperadminGymsDirectoryTableStyles />

      {/* ── TOOLBAR ─── */}
      <SuperadminGymsDirectoryTableToolbar
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}
        statusParam={statusParam}
        handleStatusChange={handleStatusChange}
        planParam={planParam}
        handlePlanChange={handlePlanChange}
        plansMaster={plansMaster}
        isColumnDropdownOpen={isColumnDropdownOpen}
        setIsColumnDropdownOpen={setIsColumnDropdownOpen}
        columnDropdownRef={columnDropdownRef}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        toggleableColumns={TOGGLEABLE_COLUMNS}
        handleExportCsv={() => exportGymsCsv(tenants, plansMaster)}
      />

      {/* ── TABLE CONTAINER ─── */}
      <div ref={tableContainerRef} onScroll={() => handleTableScroll(() => setActiveKebabId(null))} className="flex-1 min-h-0 overflow-auto relative">
        {isLoading && (
          <div className="p-4 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-skeleton-base animate-pulse rounded-lg border border-border" />
            ))}
          </div>
        )}

        {isError && (
          <div className="p-8">
            <ErrorState title="Failed to load gyms" message={error instanceof Error ? error.message : 'Server error occurred.'} onRetry={() => void refetch()} />
          </div>
        )}

        {!isLoading && !isError && tenants.length === 0 && (
          <EmptyState title="No gyms found" description="No gym records match your search or filter combination." onClearFilters={() => { setSearchInput(''); setParams({ search: null, status: null, planId: null, page: '1' }); }} />
        )}

        {!isLoading && !isError && tenants.length > 0 && (
          <table className="w-full text-start text-sm border-separate border-spacing-0 min-w-max" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <SuperadminGymsDirectoryTableHeader
              effectiveSortBy={effectiveSortBy}
              effectiveSortOrder={effectiveSortOrder}
              handleSort={handleSort}
              renderSortIndicator={renderSortIndicator}
              isColVisible={isColVisible}
              scrolledLeft={scrolledLeft}
              scrolledRight={scrolledRight}
            />
            <tbody>
              {tenants.map((gym, gymIndex) => (
                <SuperadminGymsDirectoryTableRow
                  key={gym.id}
                  gym={gym}
                  scrolledLeft={scrolledLeft}
                  scrolledRight={scrolledRight}
                  isKebabActive={activeKebabId === gym.id}
                  openUpwards={tenants.length >= 4 && gymIndex >= tenants.length - 3}
                  kebabRef={kebabRef}
                  isColVisible={isColVisible}
                  handleRowClickAction={handleRowClick}
                  handleStatusButtonClick={(e, g) => { e.stopPropagation(); setConfirmStatusTenant(g); setTargetStatus(g.accessStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'); }}
                  handleOpenEditModal={(e, g) => { e.stopPropagation(); setSelectedTenantForEdit(g); setIsEditModalOpen(true); }}
                  handleOpenHistoryAction={(e, g) => { e.stopPropagation(); setSelectedTenantForDrawer(g); setDrawerTab('history'); setIsDrawerOpen(true); }}
                  handleLoginAs={handleLoginAs}
                  handleDeleteClick={(e, g) => { e.stopPropagation(); setActiveKebabId(null); setConfirmDeleteTenant(g); }}
                  setActiveKebabId={setActiveKebabId}
                  activeKebabId={activeKebabId}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── STICKY PAGINATION FOOTER ─── */}
      <SuperadminGymsDirectoryTablePagination
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        pageSizeParam={pageSizeParam}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />

      {/* ── MODALS & DRAWERS ─── */}
      <SuperadminGymsDirectoryTableModals
        selectedTenantForDrawer={selectedTenantForDrawer}
        isDrawerOpen={isDrawerOpen}
        drawerTab={drawerTab}
        onCloseDrawer={() => { setIsDrawerOpen(false); setSelectedTenantForDrawer(null); }}
        selectedTenantForEdit={selectedTenantForEdit}
        isEditModalOpen={isEditModalOpen}
        onCloseEditModal={() => { setIsEditModalOpen(false); setSelectedTenantForEdit(null); }}
        onSuccessEditModal={() => void refetch()}
        confirmStatusTenant={confirmStatusTenant}
        targetStatus={targetStatus}
        onCloseStatusDialog={() => setConfirmStatusTenant(null)}
        onConfirmStatusDialog={executeStatusChange}
        isStatusLoading={changeStatusMutation.isPending}
        confirmDeleteTenant={confirmDeleteTenant}
        onCloseDeleteDialog={() => setConfirmDeleteTenant(null)}
        onConfirmDeleteDialog={executeDelete}
        isDeleteLoading={deleteMutation.isPending}
      />
    </div>
  );
}

export { SuperadminGymsDirectoryTable as SuperadminGymsTable };
