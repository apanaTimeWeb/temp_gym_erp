import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiFetch } from '@/lib/api';
import {
  AdminNavigationLayoutApiResponseError,
  adminLayoutApiFetch,
  applyAdminNavigationLayoutApiValidationErrors,
} from '@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutApiResponse';

vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));

describe('AdminNavigationLayout API envelope and field-validation contract', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns only successful envelopes', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      requestId: 'request-success-1',
      message: 'Loaded',
      data: { count: 2 },
    });

    await expect(adminLayoutApiFetch<{ count: number }>('/admin/test', { method: 'GET' })).resolves.toMatchObject({
      success: true,
      requestId: 'request-success-1',
      data: { count: 2 },
    });
  });

  it('converts a returned failure envelope into a rejected transport result', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: false,
      requestId: 'request-failure-1',
      message: 'Invalid input',
      data: null,
      errorCode: 'ERR_VALIDATION',
      statusCode: 400,
      validationErrors: [{ field: 'name', message: 'Name is required.' }],
    });

    await expect(adminLayoutApiFetch('/admin/test', { method: 'POST' })).rejects.toMatchObject({
      name: 'AdminNavigationLayoutApiResponseError',
      success: false,
      requestId: 'request-failure-1',
      statusCode: 400,
      validationErrors: [{ field: 'name', message: 'Name is required.' }],
    });
  });

  it('maps only declared 400 errors to fields that exist on the current form', () => {
    const setError = vi.fn();
    const error = new AdminNavigationLayoutApiResponseError({
      success: false,
      requestId: 'request-failure-2',
      message: 'Validation failed',
      data: null,
      errorCode: 'ERR_VALIDATION',
      statusCode: 400,
      validationErrors: [
        { field: 'name', message: 'A name is required.' },
        { field: 'unknownField', message: 'This field is not present in the form.' },
      ],
    });

    expect(applyAdminNavigationLayoutApiValidationErrors(error, { name: '' }, setError as never)).toBe(true);
    expect(setError).toHaveBeenCalledTimes(1);
    expect(setError).toHaveBeenCalledWith('name', { type: 'server', message: 'A name is required.' });
  });

  it('does not treat non-400 failures as field validation errors', () => {
    const setError = vi.fn();
    const error = new AdminNavigationLayoutApiResponseError({
      success: false,
      requestId: 'request-failure-3',
      message: 'Service unavailable',
      data: null,
      errorCode: 'ERR_INTERNAL',
      statusCode: 503,
    });

    expect(applyAdminNavigationLayoutApiValidationErrors(error, { name: '' }, setError as never)).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });
});
