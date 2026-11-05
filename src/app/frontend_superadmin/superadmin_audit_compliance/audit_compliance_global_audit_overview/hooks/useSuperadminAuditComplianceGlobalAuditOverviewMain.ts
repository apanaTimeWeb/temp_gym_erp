'use client';


import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useUrlState } from '@/hooks/useUrlState';

import { SUPERADMIN_AUDIT_ACTOR_OPTIONS, SUPERADMIN_AUDIT_PAGE_SIZE, SUPERADMIN_AUDIT_SEVERITY_OPTIONS, SUPERADMIN_AUDIT_FILTER_ALL } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/constants/superadmin_audit_compliance_global_audit_overview.constants';
import { useSuperadminAuditComplianceGlobalAuditOverviewData } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/hooks/useSuperadminAuditComplianceGlobalAuditOverviewData';
import { useSuperadminAuditComplianceGlobalAuditOverviewExportMutation } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/hooks/useSuperadminAuditComplianceGlobalAuditOverviewExportMutation';

import type { AuditActorFilter, AuditSeverityFilter } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/types/superadmin_audit_compliance_global_audit_overview_filter.types';

function normalizeOption<T extends string>(value: string, allowed: readonly T[], fallback: T): T {
  return (allowed as readonly string[]).includes(value) ? value as T : fallback;
}
function normalizePage(value: string): number {
  if (!/^\d+$/.test(value)) return 1;
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

/**
 * @description Coordinates the use Superadmin global audit main concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminAuditComplianceGlobalAuditOverviewMain() {
  const { getParam, setParam } = useUrlState();
  const t = useTranslations('superadmin_audit_compliance_global_audit');
  const committedSearch = getParam('search', '').slice(0, 200);
  const [draftSearch, setDraftSearch] = useState(committedSearch);
  useEffect(() => { setDraftSearch(committedSearch); }, [committedSearch]);
  useEffect(() => {
    if (draftSearch === committedSearch) return;
    const timeoutId = window.setTimeout(() => {
      setParam('search', draftSearch.trim().slice(0, 200));
      setParam('page', '1');
    }, 300);
    return () => window.clearTimeout(timeoutId);
  }, [draftSearch, committedSearch, setParam]);
  const search = draftSearch;
  const severityFilter = normalizeOption(getParam('severityFilter', SUPERADMIN_AUDIT_FILTER_ALL), SUPERADMIN_AUDIT_SEVERITY_OPTIONS, SUPERADMIN_AUDIT_FILTER_ALL) as AuditSeverityFilter;
  const actorTypeFilter = normalizeOption(getParam('actorTypeFilter', SUPERADMIN_AUDIT_FILTER_ALL), SUPERADMIN_AUDIT_ACTOR_OPTIONS, SUPERADMIN_AUDIT_FILTER_ALL) as AuditActorFilter;
  const currentPage = normalizePage(getParam('page', '1'));
  const query = useSuperadminAuditComplianceGlobalAuditOverviewData(committedSearch, severityFilter, actorTypeFilter, currentPage, SUPERADMIN_AUDIT_PAGE_SIZE);
  const exportMutation = useSuperadminAuditComplianceGlobalAuditOverviewExportMutation();
  const setSearch = (value: string) => setDraftSearch(value.slice(0, 200));
  const setSeverityFilter = (value: AuditSeverityFilter) => { setParam('severityFilter', normalizeOption(value, SUPERADMIN_AUDIT_SEVERITY_OPTIONS, SUPERADMIN_AUDIT_FILTER_ALL)); setParam('page', '1'); };
  const setActorTypeFilter = (value: AuditActorFilter) => { setParam('actorTypeFilter', normalizeOption(value, SUPERADMIN_AUDIT_ACTOR_OPTIONS, SUPERADMIN_AUDIT_FILTER_ALL)); setParam('page', '1'); };
  const setCurrentPage = (value: number) => setParam('page', String(Number.isSafeInteger(value) && value > 0 ? value : 1));
  return {
    search, severityFilter, actorTypeFilter, currentPage,
    severityOptions: SUPERADMIN_AUDIT_SEVERITY_OPTIONS.map((value) => ({ value, label: value === SUPERADMIN_AUDIT_FILTER_ALL ? t('ui.all_severities') : t(`ui.severity_${value.toLowerCase()}`) })),
    actorTypeOptions: SUPERADMIN_AUDIT_ACTOR_OPTIONS.map((value) => ({ value, label: value === SUPERADMIN_AUDIT_FILTER_ALL ? t('ui.all_actors') : t(`ui.actor_type_${value.toLowerCase()}`) })),
    setSearch, setSeverityFilter, setActorTypeFilter, setCurrentPage,
    logs: query.logs, totalPages: query.totalPages, isPending: query.isPending, isFetching: query.isFetching, queryError: query.error, refetch: query.refetch,
    requestExport: exportMutation.requestExport, isExporting: exportMutation.isRequesting, exportError: exportMutation.error, resetExportError: exportMutation.reset,
  };
}
