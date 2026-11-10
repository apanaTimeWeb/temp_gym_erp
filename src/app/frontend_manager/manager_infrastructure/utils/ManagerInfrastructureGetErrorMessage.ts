import { ManagerInfrastructureDomainError } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureDomainError';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGenericErrorMessage';

/**
 * Returns a classified backend/domain message or a caller-provided localized fallback.
 * Unknown Error, string and object shapes are deliberately not rendered to users because
 * they may contain transport details, internal paths, stack-adjacent data, or error codes.
 */
export function ManagerInfrastructureGetErrorMessage(
  error: unknown,
  fallbackMessage: string = MANAGER_GENERIC_ERROR_MESSAGE,
): string {
  if (
    error &&
    typeof error === 'object' &&
    'kind' in error &&
    (error as { kind: string }).kind === 'manager-domain-error' &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string' &&
    (error as { message: string }).message.trim()
  ) {
    return (error as { message: string }).message;
  }
  if (error instanceof ManagerInfrastructureDomainError && error.message.trim()) {
    return error.message;
  }
  const normalizedFallback = fallbackMessage.trim();
  return normalizedFallback || MANAGER_GENERIC_ERROR_MESSAGE;
}
