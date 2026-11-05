import { describe, expect, it } from 'vitest';

import { ManagerInfrastructureDomainError } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureDomainError';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGenericErrorMessage';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

describe('ManagerInfrastructureGetErrorMessage', () => {
  it('passes through an explicitly classified backend domain message', () => {
    expect(ManagerInfrastructureGetErrorMessage(new ManagerInfrastructureDomainError('Member is already active'))).toBe('Member is already active');
  });

  it('uses the safe fallback for native Error instances', () => {
    expect(ManagerInfrastructureGetErrorMessage(new Error('Failed to fetch /private/internal/path'))).toBe(MANAGER_GENERIC_ERROR_MESSAGE);
  });

  it('uses the safe fallback for unclassified strings and object messages', () => {
    expect(ManagerInfrastructureGetErrorMessage('internal exception detail')).toBe(MANAGER_GENERIC_ERROR_MESSAGE);
    expect(ManagerInfrastructureGetErrorMessage({ message: 'database connection secret' })).toBe(MANAGER_GENERIC_ERROR_MESSAGE);
  });

  it('supports localized fallback copy supplied by the caller', () => {
    expect(ManagerInfrastructureGetErrorMessage(new Error('technical detail'), 'No se pudo completar la solicitud.')).toBe('No se pudo completar la solicitud.');
  });
});
