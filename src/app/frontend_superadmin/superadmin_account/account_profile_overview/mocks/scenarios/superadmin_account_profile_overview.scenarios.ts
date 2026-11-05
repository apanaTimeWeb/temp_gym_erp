/**
 * Module-owned MSW scenario overrides for profile_overview.
 * ACTIVE and EMPTY payloads are supplied by the owning module's own fixtures;
 * this file deliberately does not invent business response fields.
 */
import { http, HttpResponse } from 'msw';

export type ProfileOverviewScenarioName = 'ACTIVE' | 'EMPTY' | 'SERVER_500' | 'TIMEOUT' | 'UNAUTHORIZED';
export type ProfileOverviewDataScenario = 'ACTIVE' | 'EMPTY';

export function createProfileOverviewScenarioHandler(
  endpoint: string,
  resolveData: (scenario: ProfileOverviewDataScenario, request: Request) => unknown,
) {
  return http.all(endpoint.startsWith('/') ? `*${endpoint}` : endpoint, ({ request }) => {
    const rawScenario = new URL(request.url).searchParams.get('__mockScenario');
    if (!rawScenario) return undefined;

    const scenario = rawScenario.toUpperCase() as ProfileOverviewScenarioName;
    switch (scenario) {
      case 'ACTIVE':
      case 'EMPTY':
        return HttpResponse.json({
          success: true,
          message: scenario === 'EMPTY' ? 'Empty scenario' : 'Active scenario',
          data: resolveData(scenario, request),
          requestId: crypto.randomUUID(),
        });
      case 'SERVER_500':
        return HttpResponse.json({
          success: false,
          message: 'Simulated server failure.',
          data: null,
          errorCode: 'INTERNAL_SERVER_ERROR',
          statusCode: 500,
          requestId: crypto.randomUUID(),
        }, { status: 500 });
      case 'TIMEOUT':
        return HttpResponse.error();
      case 'UNAUTHORIZED':
        return HttpResponse.json({
          success: false,
          message: 'Authentication is required for this scenario.',
          data: null,
          errorCode: 'UNAUTHORIZED',
          statusCode: 401,
          requestId: crypto.randomUUID(),
        }, { status: 401 });
      default:
        return HttpResponse.json({
          success: false,
          message: 'Unknown mock scenario.',
          data: null,
          errorCode: 'VALIDATION_ERROR',
          statusCode: 400,
          requestId: crypto.randomUUID(),
        }, { status: 400 });
    }
  });
}

/** Produces an empty-list scenario while preserving fixture-defined field names and object shape. */
export function createProfileOverviewEmptyScenarioData<T>(fixture: T): T {
  if (Array.isArray(fixture)) return [] as unknown as T;
  if (fixture === null || typeof fixture !== 'object') return fixture;
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fixture as Record<string, unknown>)) {
    if (Array.isArray(value)) {
      result[key] = [];
    } else if (typeof value === 'number' && /(?:count|total|amount|revenue|mrr|arr|arpu|score|members|staff|pending|overdue|trial|active|delta|percent|limit)/i.test(key)) {
      result[key] = 0;
    } else if (value !== null && typeof value === 'object') {
      result[key] = createProfileOverviewEmptyScenarioData(value);
    } else {
      result[key] = value;
    }
  }
  return result as unknown as T;
}
