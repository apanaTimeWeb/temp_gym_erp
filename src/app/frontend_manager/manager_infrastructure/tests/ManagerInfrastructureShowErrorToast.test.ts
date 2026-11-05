import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ManagerInfrastructureDomainError } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureDomainError';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('ManagerInfrastructureShowErrorToast', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows a verified backend/domain message with a stable toast id', () => {
    ManagerInfrastructureShowErrorToast(new ManagerInfrastructureDomainError('Backend rejected request'), 'manager-test-error');
    expect(toast.error).toHaveBeenCalledWith('Backend rejected request', { id: 'manager-test-error' });
  });

  it('never exposes raw JavaScript exception messages', () => {
    ManagerInfrastructureShowErrorToast(new Error('Failed to fetch internal-service.local'), 'manager-network-error');
    expect(toast.error).toHaveBeenCalledWith('An unexpected error occurred. Please try again.', { id: 'manager-network-error' });
  });

  it('uses the caller-provided localized fallback for unclassified failures', () => {
    ManagerInfrastructureShowErrorToast({ message: 'internal stack details' }, 'manager-localized-error', 'No se pudo completar la solicitud.');
    expect(toast.error).toHaveBeenCalledWith('No se pudo completar la solicitud.', { id: 'manager-localized-error' });
  });
});
