// RESPONSIBILITY: Owns module-local MSW handlers for hr_performance_analytics; it simulates only the endpoints and fields supported by the supplied feature contract.
// DATA FLOW: MSW request → request/schema validation → module fixture state → response envelope → feature query/UI (admin_hr/hr_performance_analytics/mocks/handlers/AdminHrPerformanceAnalyticsMockHandlers.ts)

import { http, HttpResponse } from 'msw';
import { ADMIN_HR_PERFORMANCE_API_URL } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/config/admin_hr_performance_analytics.url_config';
import { MOCK_ADMIN_STAFF_PERFORMANCE } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/mocks/fixtures/AdminHrPerformanceAnalyticsMockFixtures';
export const adminHrPerformanceMockHandlers = [
 http.get(`*${ADMIN_HR_PERFORMANCE_API_URL}`, ({ request }) => {
  const url=new URL(request.url); const search=(url.searchParams.get('search')??'').trim().toLowerCase(); const sortKey=url.searchParams.get('sortKey')??'rating'; const sortDir=url.searchParams.get('sortDir')??'desc';
  const filtered=MOCK_ADMIN_STAFF_PERFORMANCE.filter((row)=>!search||`${row.name} ${row.role} ${row.branchName}`.toLowerCase().includes(search));
  const sorted=[...filtered].sort((a,b)=>{const av=a[sortKey as keyof typeof a];const bv=b[sortKey as keyof typeof b];const cmp=typeof av==='number'&&typeof bv==='number'?av-bv:String(av??'').localeCompare(String(bv??''));return sortDir==='asc'?cmp:-cmp;});
  return HttpResponse.json({success:true,message:'Success',data:sorted, requestId: globalThis.crypto.randomUUID() });
 }),
];
