import { delay, http, HttpResponse } from 'msw';

/** Canonical deterministic MSW scenarios for earnings_overview_and_ledger. */
import type { TrainerEarningsEarningsOverviewAndLedgerFailureEnvelope, TrainerEarningsEarningsOverviewAndLedgerScenarioKey, TrainerEarningsEarningsOverviewAndLedgerSuccessEnvelope } from '../../types/TrainerEarningsEarningsOverviewAndLedgerMockScenarioTypes';

const emptyCollections = <TData,>(value: TData): TData => {
  if (Array.isArray(value)) return [] as unknown as TData;
  if (value === null || typeof value !== 'object') return value;

  const emptyValue = Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => {
      if (Array.isArray(nestedValue)) return [key, []];
      if (typeof nestedValue === 'number' && /^(total|count|totalPages|unreadCount|pendingCount)$/i.test(key)) {
        return [key, 0];
      }
      return [key, emptyCollections(nestedValue)];
    }),
  );

  return emptyValue as TData;
};

const successEnvelope = <TData,>(data: TData, message: string, requestId: string): TrainerEarningsEarningsOverviewAndLedgerSuccessEnvelope<TData> => ({
  success: true,
  message,
  data,
  requestId,
});

const failureEnvelope = (
  message: string,
  errorCode: string,
  statusCode: number,
  requestId: string,
): TrainerEarningsEarningsOverviewAndLedgerFailureEnvelope => ({
  success: false,
  message,
  data: null,
  errorCode,
  statusCode,
  requestId,
});

/**
 * Creates module-scoped handlers for the five canonical mock states.
 * Pass the existing feature-owned GET endpoint and its schema-shaped fixture data;
 * no endpoint, DTO field, or backend behavior is invented by this registry.
 * Apply one returned handler with `server.use(registry.EMPTY_DATA)`, etc.
 */
export function createTrainerEarningsEarningsOverviewAndLedgerScenarioRegistry<TData>(endpoint: string, activeData: TData) {
  return {
    ACTIVE_RECORDS: http.get(endpoint, () =>
      HttpResponse.json(successEnvelope(activeData, 'Active fixture records loaded.', 'trainer_earnings_earnings_overview_and_ledger-active')),
    ),
    EMPTY_DATA: http.get(endpoint, () =>
      HttpResponse.json(successEnvelope(emptyCollections(activeData), 'No records found.', 'trainer_earnings_earnings_overview_and_ledger-empty')),
    ),
    SERVER_500_ERROR: http.get(endpoint, () =>
      HttpResponse.json(
        failureEnvelope('The mock server returned an internal error.', 'MOCK_SERVER_500', 500, 'trainer_earnings_earnings_overview_and_ledger-server-500'),
        { status: 500 },
      ),
    ),
    NETWORK_TIMEOUT: http.get(endpoint, async () => {
      await delay(15000);
      return HttpResponse.json(
        failureEnvelope('The mock request timed out.', 'MOCK_NETWORK_TIMEOUT', 504, 'trainer_earnings_earnings_overview_and_ledger-timeout'),
        { status: 504 },
      );
    }),
    UNAUTHORIZED_401: http.get(endpoint, () =>
      HttpResponse.json(
        failureEnvelope('The mock session has expired.', 'MOCK_UNAUTHORIZED', 401, 'trainer_earnings_earnings_overview_and_ledger-unauthorized'),
        { status: 401 },
      ),
    ),
    FORBIDDEN_403: http.get(endpoint, () =>
      HttpResponse.json(
        failureEnvelope('The mock user does not have permission.', 'MOCK_FORBIDDEN', 403, 'trainer_earnings_earnings_overview_and_ledger-forbidden'),
        { status: 403 },
      ),
    ),
  } as const;
}
