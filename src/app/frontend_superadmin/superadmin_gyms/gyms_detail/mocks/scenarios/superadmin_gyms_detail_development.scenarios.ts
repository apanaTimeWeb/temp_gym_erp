/** Leaf-owned browser scenarios; resolves original local handlers without making network requests. */
import { delay, getResponse, http, HttpResponse, matchRequestUrl } from 'msw';
import { superadminGymDetailHandlers } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockHandlers';
export type SuperadminGymsDetailDevelopmentScenario = 'ACTIVE' | 'EMPTY' | 'SERVER_500' | 'TIMEOUT' | 'UNAUTHORIZED';
export const SUPERADMIN_GYMS_DETAIL_DEVELOPMENT_SCENARIOS = ['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED'] as const;
/** Clear response collections and derived counts while preserving singleton identity, dates and pagination constraints. */
function emptyData(value: unknown, key = ''): unknown {
 if (Array.isArray(value)) return [];
 if (value !== null && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, emptyData(item, name)]));
 if (typeof value === 'number' && /^(total|totalPages|.*Count|.*Revenue|.*Amount|.*Members|pending|overdue|registered|missing|mrr|arr)$/i.test(key)) return 0;
 return value;
}
export function createSuperadminGymsDetailDevelopmentHandler(getScenario: () => SuperadminGymsDetailDevelopmentScenario) {
 return http.all('*', async ({ request }) => {
  const scenario = getScenario();
  // Unrelated framework resources are outside the feature network contract.
  const matches = superadminGymDetailHandlers.some(handler => (typeof handler.info.path === 'string' || handler.info.path instanceof RegExp) && matchRequestUrl(new URL(request.url), handler.info.path, new URL(request.url).origin).matches && (handler.info.method === 'ALL' || handler.info.method === request.method));
  if (!matches) return undefined;
  if (scenario === 'TIMEOUT') await delay(15000);
  if (scenario === 'SERVER_500' || scenario === 'UNAUTHORIZED') {
   const status = scenario === 'UNAUTHORIZED' ? 401 : 500;
   return HttpResponse.json({ success: false, message: status === 401 ? 'Authentication required.' : 'Simulated server failure.', data: null, errorCode: status === 401 ? 'UNAUTHORIZED' : 'INTERNAL_SERVER_ERROR', statusCode: status, requestId: crypto.randomUUID() }, { status });
  }
  const response = await getResponse(superadminGymDetailHandlers, request);
  if (!response || scenario !== 'EMPTY' || request.method !== 'GET' || !response.ok) return response;
  if (!response.headers.get('content-type')?.includes('json')) return response;
  const body: unknown = await response.clone().json();
  if (!body || typeof body !== 'object' || !('data' in body)) return response;
  const envelope = body as Record<string, unknown>;
  return HttpResponse.json({ ...envelope, data: emptyData(envelope.data), ...(envelope.meta ? { meta: { ...(envelope.meta as Record<string, unknown>), total: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false } } : {}) });
 });
}
