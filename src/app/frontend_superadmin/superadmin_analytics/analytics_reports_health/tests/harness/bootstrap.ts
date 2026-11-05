import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminReportsHandlers } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_health/mocks/handlers/SuperadminAnalyticsReportsHealthMockHandlers';
export const analytics_reports_healthMockServer=setupServer(...superadminReportsHandlers);
export function createSuperadminAnalyticsReportsHealthMainQueryClient() { return new QueryClient({ defaultOptions: {queries:{retry:false},mutations:{retry:false}} }); }
export function startSuperadminAnalyticsReportsHealthMainMocks() { analytics_reports_healthMockServer.listen({onUnhandledRequest:'error'}); }
export function resetSuperadminAnalyticsReportsHealthMainMocks() { analytics_reports_healthMockServer.resetHandlers();  }
export function stopSuperadminAnalyticsReportsHealthMainMocks() { analytics_reports_healthMockServer.close(); }
