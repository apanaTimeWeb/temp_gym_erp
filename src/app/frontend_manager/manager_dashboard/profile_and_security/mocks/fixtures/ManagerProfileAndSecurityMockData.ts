import type { ManagerProfileAndSecurityData } from '@/app/frontend_manager/manager_dashboard/profile_and_security/types/manager_profile_and_security.types';

/**
 * @description Provides the ManagerProfileAndSecurityMockData implementation for the profile module.
 * @dependencies @/app/frontend_manager/manager_dashboard/manager_profile_types/ManagerProfileAndSecurityTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_PROFILE: ManagerProfileAndSecurityData = {
  id: 'm-001',
  name: 'Vikram Singh',
  email: 'vikram.manager@gym.com',
  phone: '+919876543210',
  role: 'Branch Manager',
  branchName: 'Koregaon Park Branch',
  joinedAt: '2023-01-15T10:00:00Z',
  avatarInitial: 'V' };
