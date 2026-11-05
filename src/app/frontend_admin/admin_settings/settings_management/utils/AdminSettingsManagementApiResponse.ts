"use client";
// RESPONSIBILITY: Enforces the canonical API envelope and maps canonical HTTP 400 field errors into React Hook Form.
// SCOPE: Generic transport/form-contract utility only; it contains no admin business fields or endpoints.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

export type AdminSettingsManagementApiValidationIssue = { field: string; message: string };
export type AdminSettingsManagementApiFailureShape = {
  success: false;
  message: string;
  data: null;
  errorCode: string;
  statusCode: number;
  requestId: string;
  validationErrors?: AdminSettingsManagementApiValidationIssue[];
};
export type AdminSettingsManagementApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
  requestId: string;
  meta?: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };
};

/** Error retaining the supplied failure envelope so form callers can map declared field errors. */
export class AdminSettingsManagementApiResponseError extends Error {
  readonly success = false as const;
  readonly data = null;
  readonly errorCode: string;
  readonly statusCode: number;
  readonly requestId: string;
  readonly validationErrors?: AdminSettingsManagementApiValidationIssue[];

  constructor(failure: AdminSettingsManagementApiFailureShape) {
    super(failure.message || 'The request failed.');
    this.name = 'AdminSettingsManagementApiResponseError';
    this.errorCode = failure.errorCode;
    this.statusCode = failure.statusCode;
    this.requestId = failure.requestId;
    this.validationErrors = failure.validationErrors;
  }
}

/** Runs apiFetch and rejects failure envelopes so React Query never executes success effects for success:false. */
export async function adminSettingsManagementApiFetch<T>(
  endpoint: string,
  options?: RequestInit & { dataSchema?: unknown },
): Promise<AdminSettingsManagementApiSuccess<T>> {
  const response = await apiFetch<T>(endpoint, options) as ApiResponse<T>;
  if (!response || typeof response !== 'object' || typeof response.success !== 'boolean') {
    throw new AdminSettingsManagementApiResponseError({
      success: false,
      message: 'The server returned an invalid API response envelope.',
      data: null,
      errorCode: 'INVALID_API_ENVELOPE',
      statusCode: 502,
      requestId: 'client-invalid-envelope',
    });
  }
  if (response.success === false) {
    const failure = response as unknown as Partial<AdminSettingsManagementApiFailureShape>;
    const hasCanonicalFailureFields =
      typeof failure.message === 'string' && failure.message.trim().length > 0 &&
      failure.data === null &&
      typeof failure.errorCode === 'string' && failure.errorCode.trim().length > 0 &&
      typeof failure.statusCode === 'number' && Number.isInteger(failure.statusCode) && failure.statusCode >= 400 &&
      typeof failure.requestId === 'string' && failure.requestId.trim().length > 0;
    const validationErrorsAreCanonical = failure.validationErrors === undefined || (
      failure.statusCode === 400 && Array.isArray(failure.validationErrors) && failure.validationErrors.every((issue) =>
        Boolean(issue) && typeof issue.field === 'string' && issue.field.trim().length > 0 &&
        typeof issue.message === 'string' && issue.message.trim().length > 0
      )
    );
    if (!hasCanonicalFailureFields || !validationErrorsAreCanonical) {
      throw new AdminSettingsManagementApiResponseError({
        success: false,
        message: 'The server failure response does not satisfy the required API envelope.',
        data: null,
        errorCode: 'INVALID_API_ENVELOPE',
        statusCode: 502,
        requestId: typeof failure.requestId === 'string' && failure.requestId.trim() ? failure.requestId : 'client-invalid-envelope',
      });
    }
    throw new AdminSettingsManagementApiResponseError(failure as AdminSettingsManagementApiFailureShape);
  }
  if (typeof response.message !== 'string' || !Object.prototype.hasOwnProperty.call(response, 'data') || typeof response.requestId !== 'string' || !response.requestId.trim()) {
    throw new AdminSettingsManagementApiResponseError({
      success: false,
      message: 'The server response does not satisfy the required success envelope.',
      data: null,
      errorCode: 'INVALID_API_ENVELOPE',
      statusCode: 502,
      requestId: 'client-invalid-envelope',
    });
  }
  return response as unknown as AdminSettingsManagementApiSuccess<T>;
}

/** Maps only canonical 400 validation issues onto real fields exposed by the current form. */
export function applyAdminSettingsManagementApiValidationErrors<T extends FieldValues>(
  error: unknown,
  currentValues: T,
  setError: UseFormSetError<T>,
): boolean {
  if (!error || typeof error !== 'object') return false;
  const candidate = error as Partial<AdminSettingsManagementApiFailureShape>;
  if (candidate.success !== false || candidate.statusCode !== 400 || !Array.isArray(candidate.validationErrors)) return false;
  const allowedFields = new Set(Object.keys(currentValues).filter((key) =>
    currentValues[key] === null || typeof currentValues[key] !== 'object'
  ));
  let applied = 0;
  for (const issue of candidate.validationErrors) {
    if (!issue || typeof issue.field !== 'string' || typeof issue.message !== 'string' || !issue.message.trim()) continue;
    // Each existing Settings section exposes only flat, registered fields. Never map
    // an unknown nested/bracket path merely because its root name is present.
    if (!allowedFields.has(issue.field)) continue;
    setError(issue.field as Path<T>, { type: 'server', message: issue.message });
    applied += 1;
  }
  return applied > 0;
}
