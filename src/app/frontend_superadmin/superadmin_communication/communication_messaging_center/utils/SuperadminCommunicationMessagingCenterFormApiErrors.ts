/** Leaf-local typed preservation and safe mapping for backend 400 validation envelopes. */
import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

export interface SuperadminCommunicationMessagingValidationItem { field: string; message: string }
export interface SuperadminCommunicationMessagingFormApiError extends Error {
  validationErrors: readonly SuperadminCommunicationMessagingValidationItem[];
  statusCode?: number;
  requestId?: string;
}

export function createSuperadminCommunicationMessagingFormApiError(response: unknown, fallbackMessage = 'The request could not be completed.'): SuperadminCommunicationMessagingFormApiError {
  const record = response !== null && typeof response === 'object'
    ? response as Record<string, unknown>
    : {};
  const message = typeof record.message === 'string' && record.message.trim()
    ? record.message
    : fallbackMessage;
  const validationErrors = Array.isArray(record.validationErrors)
    ? record.validationErrors.filter((item): item is SuperadminCommunicationMessagingValidationItem =>
        item !== null && typeof item === 'object' &&
        typeof (item as Record<string, unknown>).field === 'string' &&
        typeof (item as Record<string, unknown>).message === 'string' &&
        Boolean(((item as Record<string, unknown>).field as string).trim()) &&
        Boolean(((item as Record<string, unknown>).message as string).trim()),
      ) as SuperadminCommunicationMessagingValidationItem[]
    : [];
  const error = new Error(message) as SuperadminCommunicationMessagingFormApiError;
  error.name = 'SuperadminCommunicationMessagingFormApiError';
  error.validationErrors = validationErrors;
  error.statusCode = typeof record.statusCode === 'number' ? record.statusCode : undefined;
  error.requestId = typeof record.requestId === 'string' ? record.requestId : undefined;
  return error;
}

/** Only maps server field names that match an explicitly allowed form path. */
export function applySuperadminCommunicationMessagingCenterFormApiErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  allowedFields: readonly FieldPath<T>[],
): number {
  const candidate = error !== null && typeof error === 'object'
    ? error as Partial<SuperadminCommunicationMessagingFormApiError>
    : {};
  const items = Array.isArray(candidate.validationErrors) ? candidate.validationErrors : [];
  let mapped = 0;
  for (const item of items) {
    if (!item || typeof item.field !== 'string' || typeof item.message !== 'string') continue;
    if (!(allowedFields as readonly string[]).includes(item.field)) continue;
    setError(item.field as FieldPath<T>, { type: 'server', message: item.message });
    mapped += 1;
  }
  if (mapped === 0) {
    const message = error instanceof Error && error.name.endsWith('FormApiError') && error.message.trim()
      ? error.message
      : 'The request could not be completed.';
    setError('root.server' as FieldPath<T>, { type: 'server', message });
  }
  return mapped;
}
