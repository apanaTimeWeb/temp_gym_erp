"use client";
// RESPONSIBILITY: Owns feature-local query, mutation, or interaction orchestration for members_directory; it does not render the page UI.
// DATA FLOW: component event → feature hook → API client/query cache or UI state → component state and feedback (admin_members/members_directory/hooks/useAdminMembersDirectoryExport.ts)

import { useCallback, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { adminToast } from '@/app/frontend_admin/admin_members/members_directory/components/feedback/AdminMembersDirectoryToastService';
import { AdminMembersApi } from '@/app/frontend_admin/admin_members/members_directory/api/admin_members_directory_api';
import type { FetchMembersParams } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryApiQueryTypes';
import { downloadAdminMembersDirectoryCsv } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryDownloadCsv';

export type AdminMembersExportFilters = Pick<FetchMembersParams, 'search' | 'status' | 'branchId' | 'expiryFilter' | 'gender' | 'plan'>;

/** Handles filtered CSV export, duplicate-request prevention, cleanup, and user feedback. @description Coordinates useAdminMembersExport for the owning members_directory feature. @dependencies Uses the API, query cache, state, and router dependencies explicitly imported by this hook. @param filters - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. @edge-case Preserves contract-defined pending, empty, error, validation, and retry behavior. */
export function useAdminMembersExport(filters: AdminMembersExportFilters) {
  const t = useTranslations();
  const [isExporting, setIsExporting] = useState(false);
  const exportInFlightRef = useRef(false);

  const exportMembers = useCallback(async () => {
    if (exportInFlightRef.current) return;
    exportInFlightRef.current = true;
    setIsExporting(true);
    try {
      const response = await AdminMembersApi.exportMembers(filters);
      if (!response.data) throw new Error(t('members.AdminAuditRepair.exportEmpty'));
      downloadAdminMembersDirectoryCsv(response.data);
      adminToast.success(response.message, 'admin_members-export-success');
    } catch (error) {
      adminToast.error(t('members.AdminAuditRepair.exportFailed'), 'admin_members-export-error');
    } finally {
      exportInFlightRef.current = false;
      setIsExporting(false);
    }
  }, [filters, t]);

  return { exportMembers, isExporting };
}
