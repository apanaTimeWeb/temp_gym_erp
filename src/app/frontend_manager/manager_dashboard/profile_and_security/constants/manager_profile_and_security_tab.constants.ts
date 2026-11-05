import { User, Lock } from 'lucide-react';

/**
 * @description Provides the ManagerProfileAndSecurityTabConstants implementation for the profile module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_PROFILE_AND_SECURITY_TABS = [
  { id: 'personal', labelKey: 'TEXT_TAB_PERSONAL_INFO', icon: User },
  { id: 'security', labelKey: 'TEXT_TAB_SECURITY', icon: Lock },
] as const;
