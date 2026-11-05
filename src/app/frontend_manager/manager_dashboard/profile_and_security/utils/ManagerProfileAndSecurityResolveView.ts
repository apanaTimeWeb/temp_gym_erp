// RESPONSIBILITY: Validates and resolves Profile view identifiers.
import type { ManagerProfileAndSecurityTab } from '@/app/frontend_manager/manager_dashboard/profile_and_security/types/manager_profile_and_security.types';
import { MANAGER_PROFILE_AND_SECURITY_DEFAULT_VIEW, MANAGER_PROFILE_AND_SECURITY_VIEW_IDS } from '@/app/frontend_manager/manager_dashboard/profile_and_security/constants/manager_profile_and_security_view.constants';

export function resolveManagerProfileAndSecurityView(value: string | null | undefined): ManagerProfileAndSecurityTab {
  return MANAGER_PROFILE_AND_SECURITY_VIEW_IDS.includes(value as ManagerProfileAndSecurityTab) ? value as ManagerProfileAndSecurityTab : MANAGER_PROFILE_AND_SECURITY_DEFAULT_VIEW;
}
