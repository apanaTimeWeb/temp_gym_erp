"use client";
// RESPONSIBILITY: Enforces the canonical API envelope and maps canonical HTTP 400 field errors into React Hook Form.
// SCOPE: Generic transport/form-contract utility only; it contains no admin business fields or endpoints.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

export type AdminCommunicationNoticesAndAnnouncementsApiValidationIssue = { field: string; message: string };
export type AdminCommunicationNoticesAndAnnouncementsApiFailureShape = {
  success: false;
  message: string;
  data: null;
  errorCode: string;
  statusCode: number;
  requestId: string;
  validationErrors?: AdminCommunicationNoticesAndAnnouncementsApiValidationIssue[];
};
export type AdminCommunicationNoticesAndAnnouncementsApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
  requestId: string;
  meta?: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };
};

/** Error retaining the supplied failure envelope so form callers can map declared field errors. */
export class AdminCommunicationNoticesAndAnnouncementsApiResponseError extends Error {
  readonly success = false as const;
  readonly data = null;
  readonly errorCode: string;
  readonly statusCode: number;
  readonly requestId: string;
  readonly validationErrors?: AdminCommunicationNoticesAndAnnouncementsApiValidationIssue[];

  constructor(failure: AdminCommunicationNoticesAndAnnouncementsApiFailureShape) {
    super(failure.message || 'The request failed.');
    this.name = 'AdminCommunicationNoticesAndAnnouncementsApiResponseError';
    this.errorCode = failure.errorCode;
    this.statusCode = failure.statusCode;
    this.requestId = failure.requestId;
    this.validationErrors = failure.validationErrors;
  }
}

/** Runs apiFetch and rejects failure envelopes so React Query never executes success effects for success:false. */
export async function adminAnnouncementsManagementApiFetch<T>(
  endpoint: string,
  options?: RequestInit & { dataSchema?: unknown },
): Promise<AdminCommunicationNoticesAndAnnouncementsApiSuccess<T>> {
  const response = await apiFetch<T>(endpoint, options) as ApiResponse<T>;
  if (!response || typeof response !== 'object' || typeof response.success !== 'boolean') {
    throw new AdminCommunicationNoticesAndAnnouncementsApiResponseError({
      success: false,
      message: 'The server returned an invalid API response envelope.',
      data: null,
      errorCode: 'INVALID_API_ENVELOPE',
      statusCode: 502,
      requestId: 'client-invalid-envelope',
    });
  }
  if (response.success === false) {
    const failure = response as unknown as Partial<AdminCommunicationNoticesAndAnnouncementsApiFailureShape>;
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
      throw new AdminCommunicationNoticesAndAnnouncementsApiResponseError({
        success: false,
        message: 'The server failure response does not satisfy the required API envelope.',
        data: null,
        errorCode: 'INVALID_API_ENVELOPE',
        statusCode: 502,
        requestId: typeof failure.requestId === 'string' && failure.requestId.trim() ? failure.requestId : 'client-invalid-envelope',
      });
    }
    throw new AdminCommunicationNoticesAndAnnouncementsApiResponseError(failure as AdminCommunicationNoticesAndAnnouncementsApiFailureShape);
  }
  if (typeof response.message !== 'string' || !Object.prototype.hasOwnProperty.call(response, 'data') || typeof response.requestId !== 'string' || !response.requestId.trim()) {
    throw new AdminCommunicationNoticesAndAnnouncementsApiResponseError({
      success: false,
      message: 'The server response does not satisfy the required success envelope.',
      data: null,
      errorCode: 'INVALID_API_ENVELOPE',
      statusCode: 502,
      requestId: 'client-invalid-envelope',
    });
  }
  return response as unknown as AdminCommunicationNoticesAndAnnouncementsApiSuccess<T>;
}

/** Maps only canonical 400 validation issues onto real fields exposed by the current form. */
export function applyAdminCommunicationNoticesAndAnnouncementsApiValidationErrors<T extends FieldValues>(
  error: unknown,
  currentValues: T,
  setError: UseFormSetError<T>,
): boolean {
  if (!error || typeof error !== 'object') return false;
  const candidate = error as Partial<AdminCommunicationNoticesAndAnnouncementsApiFailureShape>;
  if (candidate.success !== false || candidate.statusCode !== 400 || !Array.isArray(candidate.validationErrors)) return false;
  let applied = 0;
  for (const issue of candidate.validationErrors) {
    if (!issue || typeof issue.field !== 'string' || typeof issue.message !== 'string' || !issue.message.trim()) continue;
    // Only map a path actually present in the form. A matching root is insufficient:
    // "name.unknown" is not a registered field simply because "name" exists.
    const segments = issue.field.split('.');
    let current: unknown = currentValues;
    const isKnownField = segments.every((segment) => {
      if (!segment || segment === '__proto__' || segment === 'prototype' || segment === 'constructor' ||
          current === null || typeof current !== 'object' ||
          !Object.prototype.hasOwnProperty.call(current, segment)) return false;
      current = (current as Record<string, unknown>)[segment];
      return true;
    });
    if (!isKnownField) continue;
    setError(issue.field as Path<T>, { type: 'server', message: issue.message });
    applied += 1;
  }
  return applied > 0;
}
