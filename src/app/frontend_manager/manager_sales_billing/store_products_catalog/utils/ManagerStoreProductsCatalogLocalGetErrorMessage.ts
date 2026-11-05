import { ManagerInfrastructureDomainError } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/utils/ManagerStoreProductsCatalogLocalDomainError';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/utils/ManagerStoreProductsCatalogLocalGenericErrorMessage';

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
