import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/utils/ManagerReferralsRewardsLocalGenericErrorMessage';

/**
 * Explicitly classified backend/domain outcome whose message is safe to display as plain text.
 * Only construct this from a verified backend response envelope; do not wrap caught JS errors.
 */
export class ManagerInfrastructureDomainError extends Error {
  readonly kind = 'manager-domain-error' as const;

  constructor(safeBackendMessage: string) {
    const normalizedMessage = safeBackendMessage.trim();
    super(normalizedMessage || MANAGER_GENERIC_ERROR_MESSAGE);
    this.name = 'ManagerDomainError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
