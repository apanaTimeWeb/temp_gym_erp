import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiFetch } from '@/lib/api';
import { AdminFinancePlanRevenueAnalyticsApiResponseError, adminPlansRevenueAnalyticsApiFetch, applyAdminFinancePlanRevenueAnalyticsApiValidationErrors } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsApiResponse';

vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));

describe('AdminFinancePlanRevenueAnalytics API envelope contract', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns a canonical success envelope unchanged', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      requestId: 'test-success-request',
      message: 'Loaded',
      data: { id: 'record-1' },
    } as never);

    await expect(adminPlansRevenueAnalyticsApiFetch<{ id: string }>('/admin/test', { method: 'GET' })).resolves.toMatchObject({
      success: true,
      requestId: 'test-success-request',
      data: { id: 'record-1' },
    });
  });

  it.each([null, undefined])('rejects success envelopes with invalid data: %s', async (invalidData) => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      requestId: 'missing-data-test',
      message: 'Loaded',
      data: invalidData,
    } as never);

    await expect(adminPlansRevenueAnalyticsApiFetch<{ id: string }>('/admin/test')).rejects.toMatchObject({
      errorCode: 'INVALID_API_ENVELOPE',
      statusCode: 502,
    });
  });

  it('preserves defined falsy success payloads', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      requestId: 'falsy-data-test',
      message: 'Loaded',
      data: false,
    } as never);

    await expect(adminPlansRevenueAnalyticsApiFetch<boolean>('/admin/test')).resolves.toMatchObject({
      success: true,
      data: false,
    });
  });

  it('rejects a canonical failure envelope so success effects cannot run', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: false,
      requestId: 'test-failure-request',
      message: 'Input is invalid',
      data: null,
      errorCode: 'ADMIN_API_VALIDATION_ERROR',
      statusCode: 400,
      validationErrors: [{ field: 'name', message: 'Name is required.' }],
    } as never);

    await expect(adminPlansRevenueAnalyticsApiFetch('/admin/test', { method: 'POST' })).rejects.toMatchObject({
      name: 'AdminFinancePlanRevenueAnalyticsApiResponseError',
      success: false,
      requestId: 'test-failure-request',
      statusCode: 400,
      validationErrors: [{ field: 'name', message: 'Name is required.' }],
    });
  });

  it('rejects a malformed failure envelope', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: false,
      message: 'Missing required failure fields',
      data: null,
      errorCode: '',
      statusCode: 400,
      requestId: '',
    } as never);

    await expect(adminPlansRevenueAnalyticsApiFetch('/admin/test', { method: 'POST' })).rejects.toMatchObject({
      name: 'AdminFinancePlanRevenueAnalyticsApiResponseError',
      errorCode: 'INVALID_API_ENVELOPE',
      statusCode: 502,
    });
  });

  it('maps only canonical 400 errors to fields exposed by the current form', () => {
    const setError = vi.fn();
    const error = new AdminFinancePlanRevenueAnalyticsApiResponseError({
      success: false,
      requestId: 'test-form-request',
      message: 'Validation failed',
      data: null,
      errorCode: 'ADMIN_API_VALIDATION_ERROR',
      statusCode: 400,
      validationErrors: [
        { field: 'name', message: 'A name is required.' },
        { field: 'unknownField', message: 'This field is not part of this form.' },
      ],
    });

    expect(applyAdminFinancePlanRevenueAnalyticsApiValidationErrors(error, { name: '' }, setError as never)).toBe(true);
    expect(setError).toHaveBeenCalledTimes(1);
    expect(setError).toHaveBeenCalledWith('name', { type: 'server', message: 'A name is required.' });
  });

  it('does not map non-400 errors to form fields', () => {
    const setError = vi.fn();
    const error = new AdminFinancePlanRevenueAnalyticsApiResponseError({
      success: false,
      requestId: 'test-server-request',
      message: 'Service unavailable',
      data: null,
      errorCode: 'ADMIN_API_UNAVAILABLE',
      statusCode: 503,
    });

    expect(applyAdminFinancePlanRevenueAnalyticsApiValidationErrors(error, { name: '' }, setError as never)).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });
});
