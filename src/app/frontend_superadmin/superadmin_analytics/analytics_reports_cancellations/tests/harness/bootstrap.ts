import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminReportsHandlers } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/mocks/handlers/SuperadminAnalyticsReportsCancellationsMockHandlers';
export const analytics_reports_cancellationsMockServer=setupServer(...superadminReportsHandlers);
export function createSuperadminAnalyticsReportsCancellationsMainQueryClient() { return new QueryClient({ defaultOptions: {queries:{retry:false},mutations:{retry:false}} }); }
export function startSuperadminAnalyticsReportsCancellationsMainMocks() { analytics_reports_cancellationsMockServer.listen({onUnhandledRequest:'error'}); }
export function resetSuperadminAnalyticsReportsCancellationsMainMocks() { analytics_reports_cancellationsMockServer.resetHandlers();  }
export function stopSuperadminAnalyticsReportsCancellationsMainMocks() { analytics_reports_cancellationsMockServer.close(); }
