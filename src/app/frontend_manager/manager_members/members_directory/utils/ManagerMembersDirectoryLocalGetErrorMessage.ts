import { ManagerInfrastructureDomainError } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalDomainError';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalGenericErrorMessage';

/**
 * Returns a classified backend/domain message or a caller-provided localized fallback.
 * Unknown Error, string and object shapes are deliberately not rendered to users because
 * they may contain transport details, internal paths, stack-adjacent data, or error codes.
 */
export function ManagerInfrastructureGetErrorMessage(
  error: unknown,
  fallbackMessage: string = MANAGER_GENERIC_ERROR_MESSAGE,
): string {
  if (error instanceof ManagerInfrastructureDomainError && error.message.trim()) {
    return error.message;
  }
  const normalizedFallback = fallbackMessage.trim();
  return normalizedFallback || MANAGER_GENERIC_ERROR_MESSAGE;
}
