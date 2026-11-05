'use client';



import { useState } from 'react';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useUrlState } from '@/hooks/useUrlState';

import { SUPERADMIN_BACKUPS_FILTER_STATUS_CODES, SUPERADMIN_BACKUPS_PAGE_SIZE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/constants/superadmin_system_ops_backups.constants';
import { useSuperadminSystemOpsBackupsActions } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsActions';
import { useSuperadminSystemOpsBackupsData } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsData';

import type { BackupRecord } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups.types';

// DATA FLOW: API / URL state / module client state → useState → superadmin_system_ops_backups view components.
/**
 * @description Owns URL filters, debounce, modal UI state, selected backup identity, and query parameter construction for the Backups page.
 * @dependencies Delegates server data and backup mutations to module-owned hooks; URL and debounce are approved infrastructure hooks.
 * @edge-case Page resets to the first page whenever search or a filter changes so the user cannot remain on an invalid later page.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminSystemOpsBackupsMainViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin system ops backups main view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminSystemOpsBackupsMainViewModel() {
  const { getParam, setParam } = useUrlState();
  const search = getParam('search', '');
  const statusFilter = getParam('statusFilter', SUPERADMIN_BACKUPS_FILTER_STATUS_CODES.ALL);
  const requestedPage = Number(getParam('page', '1'));
  const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const debouncedSearch = useDebouncedValue(search, 300);
  const [triggerModalOpen, setTriggerModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<BackupRecord | null>(null);
  const [restoreConfirmText, setRestoreConfirmText] = useState('');
  const itemsPerPage = SUPERADMIN_BACKUPS_PAGE_SIZE;
  const setSearch = (value: string) => { setParam('search', value); setParam('page', '1'); };
  const setStatusFilter = (value: string) => { setParam('statusFilter', value); setParam('page', '1'); };
  const setCurrentPage = (value: number) => setParam('page', String(value));
  const queryParams: Record<string, string> = { page: String(currentPage), limit: String(itemsPerPage), ...(debouncedSearch ? { search: debouncedSearch } : {}), ...(statusFilter !== SUPERADMIN_BACKUPS_FILTER_STATUS_CODES.ALL ? { status: statusFilter } : {}), };
  const query = useSuperadminSystemOpsBackupsData(queryParams);
  const actions = useSuperadminSystemOpsBackupsActions();
  const handleRestoreClick = (backup: BackupRecord) => { setSelectedBackup(backup); setRestoreModalOpen(true); };

  return {
    search, statusFilter, currentPage, setSearch, setStatusFilter, setCurrentPage,
    ...query, downloadBackup: actions.downloadBackup, isTriggering: actions.isTriggering,
    triggerModalOpen, scheduleModalOpen, restoreModalOpen, selectedBackup, restoreConfirmText,
    setRestoreConfirmText, handleRestoreClick,
    openTriggerModal: () => setTriggerModalOpen(true), closeTriggerModal: () => setTriggerModalOpen(false),
    openScheduleModal: () => setScheduleModalOpen(true), closeScheduleModal: () => setScheduleModalOpen(false),
    closeRestoreModal: () => {
      if (selectedBackup) actions.clearRestoreIntent(selectedBackup.id);
      setRestoreConfirmText('');
      setRestoreModalOpen(false);
      setSelectedBackup(null);
    },
  };
}

