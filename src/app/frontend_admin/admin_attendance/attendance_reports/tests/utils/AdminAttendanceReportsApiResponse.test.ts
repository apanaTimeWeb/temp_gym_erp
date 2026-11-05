import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiFetch } from '@/lib/api';
import { AdminAttendanceReportsAnalyticsApiResponseError, adminAttendanceReportsAnalyticsApiFetch, applyAdminAttendanceReportsAnalyticsApiValidationErrors } from '@/app/frontend_admin/admin_attendance/attendance_reports/utils/AdminAttendanceReportsApiResponse';

vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));

describe('AdminAttendanceReportsAnalytics API envelope contract', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns a canonical success envelope unchanged', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      requestId: 'test-success-request',
      message: 'Loaded',
      data: { id: 'record-1' },
    } as never);

    await expect(adminAttendanceReportsAnalyticsApiFetch<{ id: string }>('/admin/test', { method: 'GET' })).resolves.toMatchObject({
      success: true,
      requestId: 'test-success-request',
      data: { id: 'record-1' },
    });
  });

  it.each([null, undefined])('rejects success envelopes without typed data: %s', async (data) => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, requestId: 'bad-success', message: 'OK', data } as never);
    await expect(adminAttendanceReportsAnalyticsApiFetch('/admin/test')).rejects.toMatchObject({
      errorCode: 'INVALID_API_ENVELOPE', statusCode: 502,
    });
  });

  it('accepts valid falsy success payloads when endpoint types allow them', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, requestId: 'r-zero', message: 'OK', data: 0 } as never);
    await expect(adminAttendanceReportsAnalyticsApiFetch<number>('/admin/test')).resolves.toMatchObject({ data: 0 });
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

    await expect(adminAttendanceReportsAnalyticsApiFetch('/admin/test', { method: 'POST' })).rejects.toMatchObject({
      name: 'AdminAttendanceReportsAnalyticsApiResponseError',
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

    await expect(adminAttendanceReportsAnalyticsApiFetch('/admin/test', { method: 'POST' })).rejects.toMatchObject({
      name: 'AdminAttendanceReportsAnalyticsApiResponseError',
      errorCode: 'INVALID_API_ENVELOPE',
      statusCode: 502,
    });
  });

  it('maps only canonical 400 errors to fields exposed by the current form', () => {
    const setError = vi.fn();
    const error = new AdminAttendanceReportsAnalyticsApiResponseError({
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

    expect(applyAdminAttendanceReportsAnalyticsApiValidationErrors(error, { name: '' }, setError as never)).toBe(true);
    expect(setError).toHaveBeenCalledTimes(1);
    expect(setError).toHaveBeenCalledWith('name', { type: 'server', message: 'A name is required.' });
  });

  it('does not map non-400 errors to form fields', () => {
    const setError = vi.fn();
    const error = new AdminAttendanceReportsAnalyticsApiResponseError({
      success: false,
      requestId: 'test-server-request',
      message: 'Service unavailable',
      data: null,
      errorCode: 'ADMIN_API_UNAVAILABLE',
      statusCode: 503,
    });

    expect(applyAdminAttendanceReportsAnalyticsApiValidationErrors(error, { name: '' }, setError as never)).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });
});
