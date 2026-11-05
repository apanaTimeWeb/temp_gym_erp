// RESPONSIBILITY: Application configuration projection for the current Manager gym identity. No workflow/business logic.
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

/**
 * @description Provides the ManagerGymIdentity implementation for the manager infrastructure module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const GYM_DETAILS = {
  name: ManagerEnvConfig.gymName,
  phone: ManagerEnvConfig.gymPhone,
  gstNumber: ManagerEnvConfig.gymGstNumber,
  address: ManagerEnvConfig.gymAddress };
