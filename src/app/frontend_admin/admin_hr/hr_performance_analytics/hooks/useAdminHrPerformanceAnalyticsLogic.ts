"use client";
// RESPONSIBILITY: Logic layer for Staff Performance Dashboard. Handles API fetching,
// DATA FLOW: feature API/schema → hook/context → useAdminHrPerformanceLogic consumers.

import { ADMIN_HR_PERFORMANCE_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsQueryKeys';
import { PERFORMANCE_PERIOD_OPTIONS, PERFORMANCE_STATUS_VALUES } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsConstants';
// client-side sorting, and deriving KPI aggregates.
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAdminHrPerformanceDebounce } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/hooks/useAdminHrPerformanceAnalyticsDebounce';
import { useAdminHrPerformanceUrlQuerySync } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/hooks/useAdminHrPerformanceAnalyticsUrlQuerySync';
import { AdminHrPerformanceApi } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/api/admin_hr_performance_analytics_api';
import { sortAdminHrPerformanceRecords } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/utils/AdminHrPerformanceAnalyticsSortUtils';
import type { 
  StaffPerformanceRecord, 
  PerformancePeriod, 
  PerformanceSortKey, 
  PerformanceSortDirection,
  PerformanceAggregates
} from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';
/** @description useAdminHrPerformanceLogic: Logic layer for Staff Performance Dashboard. Handles API fetching, @dependencies Consumes AdminHrQueryKeys, useAdminNavigationLayoutDebounce, useAdminHrPerformanceUrlQuerySync, AdminHrPerformanceApi, AdminHrPerformanceSortUtils, AdminHrPerformanceTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminHrPerformanceLogic() {
  const [period, setPeriod] = useState<PerformancePeriod>('THIS_MONTH');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<PerformanceSortKey>('rating');
  const [sortDir, setSortDir] = useState<PerformanceSortDirection>('desc');

  const debouncedSearch = useAdminHrPerformanceDebounce(searchQuery, 300);

  useAdminHrPerformanceUrlQuerySync([
    { key: 'period', value: period, defaultValue: 'THIS_MONTH', setValue: (value) => { if (PERFORMANCE_PERIOD_OPTIONS.some((option) => option.value === value)) setPeriod(value as PerformancePeriod); } },
    { key: 'search', value: searchQuery, defaultValue: '', setValue: (val) => setSearchQuery(val as string) },
  ]);

  const { data: rawResponse, isPending, isError, refetch } = useQuery({
    queryKey: ADMIN_HR_PERFORMANCE_QUERY_KEYS.key('performance', { period, search: debouncedSearch, sortKey, sortDir }),
    queryFn: () => AdminHrPerformanceApi.fetchStaffPerformance(period, { search: debouncedSearch, sortKey, sortDir }),
  });

  const sourceData = rawResponse?.data ?? [];
  const sortedData = sortAdminHrPerformanceRecords(sourceData, sortKey, sortDir);

  const aggregates: PerformanceAggregates = (() => {
    if (sortedData.length === 0) return { totalSessions: 0, totalMembersAdded: 0, avgAttendance: 0, avgRating: 0, topPerformersCount: 0, lowPerformersCount: 0 };
    const sessions = sortedData.reduce((sum, staff) => sum + staff.sessionsTaken, 0);
    const members = sortedData.reduce((sum, staff) => sum + staff.membersAdded, 0);
    const attendance = sortedData.reduce((sum, staff) => sum + staff.attendancePct, 0);
    const rating = sortedData.reduce((sum, staff) => sum + staff.rating, 0);
    return {
      totalSessions: sessions,
      totalMembersAdded: members,
      avgAttendance: attendance / sortedData.length,
      avgRating: rating / sortedData.length,
      topPerformersCount: sortedData.filter((staff) => staff.status === PERFORMANCE_STATUS_VALUES.EXCELLENT).length,
      lowPerformersCount: sortedData.filter((staff) => staff.status === PERFORMANCE_STATUS_VALUES.POOR).length,
    };
  })();

  return {
    period,
    setPeriod,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortDir,
    handleSort: (key: PerformanceSortKey) => {
      setSortKey((currentKey) => {
        if (currentKey !== key) {
          setSortDir('desc');
          return key;
        }
        setSortDir((currentDirection) => currentDirection === 'asc' ? 'desc' : 'asc');
        return currentKey;
      });
    },
    sortedData,
    aggregates,
    isPending,
    isError,
    retry: refetch,
  };
}
