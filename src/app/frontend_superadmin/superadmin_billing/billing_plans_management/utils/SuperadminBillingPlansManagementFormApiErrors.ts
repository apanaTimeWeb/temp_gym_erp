/** Leaf-local typed preservation and safe mapping for backend 400 validation envelopes. */
import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

export interface SuperadminBillingPlansValidationItem { field: string; message: string }
export interface SuperadminBillingPlansFormApiError extends Error {
  validationErrors: readonly SuperadminBillingPlansValidationItem[];
  statusCode?: number;
  requestId?: string;
}

export function createSuperadminBillingPlansFormApiError(response: unknown, fallbackMessage = 'The request could not be completed.'): SuperadminBillingPlansFormApiError {
  const record = response !== null && typeof response === 'object'
    ? response as Record<string, unknown>
    : {};
  const message = typeof record.message === 'string' && record.message.trim()
    ? record.message
    : fallbackMessage;
  const validationErrors = Array.isArray(record.validationErrors)
    ? record.validationErrors.filter((item): item is SuperadminBillingPlansValidationItem =>
        item !== null && typeof item === 'object' &&
        typeof (item as Record<string, unknown>).field === 'string' &&
        typeof (item as Record<string, unknown>).message === 'string' &&
        Boolean(((item as Record<string, unknown>).field as string).trim()) &&
        Boolean(((item as Record<string, unknown>).message as string).trim()),
      ) as SuperadminBillingPlansValidationItem[]
    : [];
  const error = new Error(message) as SuperadminBillingPlansFormApiError;
  error.name = 'SuperadminBillingPlansFormApiError';
  error.validationErrors = validationErrors;
  error.statusCode = typeof record.statusCode === 'number' ? record.statusCode : undefined;
  error.requestId = typeof record.requestId === 'string' ? record.requestId : undefined;
  return error;
}

/** Only maps server field names that match an explicitly allowed form path. */
export function applySuperadminBillingPlansManagementFormApiErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  allowedFields: readonly string[],
): number {
  const candidate = error !== null && typeof error === 'object'
    ? error as Partial<SuperadminBillingPlansFormApiError>
    : {};
  const items = Array.isArray(candidate.validationErrors) ? candidate.validationErrors : [];
  let mapped = 0;
  for (const item of items) {
    if (!item || typeof item.field !== 'string' || typeof item.message !== 'string') continue;
    const isAllowed = allowedFields.some((allowedPath) => {
      if (allowedPath === item.field) return true;
      const pattern = allowedPath.split('.').map((segment) => segment === '*' ? '[^.]+': segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\.');
      return new RegExp(`^${pattern}$`).test(item.field);
    });
    if (!isAllowed) continue;
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
