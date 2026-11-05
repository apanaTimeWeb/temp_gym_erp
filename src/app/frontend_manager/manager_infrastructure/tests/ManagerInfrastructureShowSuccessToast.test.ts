import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('ManagerInfrastructureShowSuccessToast', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows a non-empty success message with a stable deduplication id', () => {
    ManagerInfrastructureShowSuccessToast('Saved by backend', 'manager-test-success');
    expect(toast.success).toHaveBeenCalledWith('Saved by backend', { id: 'manager-test-success' });
  });

  it('does not show an empty success message', () => {
    ManagerInfrastructureShowSuccessToast('  ', 'manager-empty-success');
    expect(toast.success).not.toHaveBeenCalled();
  });
});
