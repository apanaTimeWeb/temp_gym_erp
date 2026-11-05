'use client';
import { useQuery } from '@tanstack/react-query';

import { useUrlState } from '@/hooks/useUrlState';

import { superadminReportsApi } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_health/api/superadmin_analytics_reports_health.api';
import { SUPERADMIN_ANALYTICS_REPORTS_HEALTH_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_health/api/superadmin_analytics_reports_health.query_keys';


/** Report-specific route filters, query identity and retry lifecycle. */
export function useSuperadminAnalyticsReportsHealthPage() {
 const {getParam}=useUrlState();
 const params:Record<string,string>={preset:getParam('preset','THIS_MONTH')};
 const from=getParam('startDate','');const to=getParam('endDate','');
 if(/^\d{4}-\d{2}-\d{2}$/.test(from))params.startDate=from;
 if(/^\d{4}-\d{2}-\d{2}$/.test(to))params.endDate=to;
 const search=getParam('search','').trim().slice(0,200);if(search)params.search=search;
 const plan=getParam('planFilter','');if(plan&&plan!=='ALL')params.plan=plan;
 return useQuery({queryKey:SUPERADMIN_ANALYTICS_REPORTS_HEALTH_QUERY_KEYS.list(params),queryFn:async()=>{
  const response=await superadminReportsApi.fetchHealthData(params);
  if(!response.success)throw new Error(response.message);
  return response.data;
 }});
}
