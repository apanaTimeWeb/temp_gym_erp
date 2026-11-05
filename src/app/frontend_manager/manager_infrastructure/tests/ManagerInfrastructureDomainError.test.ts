import { describe, expect, it } from 'vitest';

import { ManagerInfrastructureDomainError } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureDomainError';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGenericErrorMessage';

describe('ManagerInfrastructureDomainError', () => {
  it('normalizes whitespace-only safe backend messages to the generic fallback', () => {
    expect(new ManagerInfrastructureDomainError('   ').message).toBe(MANAGER_GENERIC_ERROR_MESSAGE);
  });

  it('preserves a non-empty verified backend/domain message', () => {
    expect(new ManagerInfrastructureDomainError('Member is already active').message).toBe('Member is already active');
  });
});
