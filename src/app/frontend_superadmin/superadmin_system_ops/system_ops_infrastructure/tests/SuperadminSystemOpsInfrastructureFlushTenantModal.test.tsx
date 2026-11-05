import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminSystemOpsInfrastructureFlushTenantModal from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureFlushTenantModal';
import { useSuperadminSystemOpsInfrastructureFlushTenantMutation } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureFlushTenantMutation';
import { useSuperadminSystemOpsInfrastructureTenants } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureTenants';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockFixtures';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string, values?: Record<string, unknown>) => values ? `${key} ${Object.values(values).join(' ')}` : key }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }) }));
vi.mock('@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureDialogA11y', () => ({ useSuperadminSystemOpsInfrastructureDialogA11y: () => ({ current: null }) }));
vi.mock('@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureUnsavedChangesGuard', () => ({ useSuperadminSystemOpsInfrastructureUnsavedChangesGuard: vi.fn() }));
vi.mock('@/components/ui/Tooltip', () => ({ default: ({ children }: { children: React.ReactNode }) => children }));
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureTenants", () => ({ useSuperadminSystemOpsInfrastructureTenants: vi.fn() }));
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureFlushTenantMutation", () => ({ useSuperadminSystemOpsInfrastructureFlushTenantMutation: vi.fn() }));

const tenantQuery = vi.mocked(useSuperadminSystemOpsInfrastructureTenants);
const flushMutation = vi.mocked(useSuperadminSystemOpsInfrastructureFlushTenantMutation);

describe('SuperadminSystemOpsInfrastructureFlushTenantModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    tenantQuery.mockReturnValue({ isPending: false, isError: false, data: { success: true, message: 'ok', data: MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS }, refetch: vi.fn() , requestId: 'test-request-id'} as never);
    flushMutation.mockReturnValue({ isPending: false, mutateAsync: vi.fn().mockResolvedValue(true) } as never);
  });

  it('filters tenants, selects visible tenants, and enables a real flush action', () => {
    const mutateAsync = vi.fn().mockResolvedValue(true);
    flushMutation.mockReturnValue({ isPending: false, mutateAsync } as never);
    render(<SuperadminSystemOpsInfrastructureFlushTenantModal isOpen onClose={vi.fn()} onFlush={vi.fn()} />);
    fireEvent.change(screen.getByRole('searchbox', { name: 'ui.search_tenants_512d7ce' }), { target: { value: 'Iron' } });
    expect(screen.getByText('Iron Paradise')).toBeInTheDocument();
    expect(screen.queryByText('Fit Life Studio')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'ui.select_all_66d7b9b' }));
    const flush = screen.getByRole('button', { name: /ui.flush_tenants/ });
    expect(flush).toBeEnabled();
    fireEvent.click(flush);
    expect(mutateAsync).toHaveBeenCalledTimes(1);
  });

  it('shows a retryable tenant-load error', () => {
    const refetch = vi.fn();
    tenantQuery.mockReturnValue({ isPending: false, isError: true, data: undefined, refetch } as never);
    render(<SuperadminSystemOpsInfrastructureFlushTenantModal isOpen onClose={vi.fn()} onFlush={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'ui.retry_9dfd4ea' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('does not render when closed', () => {
    render(<SuperadminSystemOpsInfrastructureFlushTenantModal isOpen={false} onClose={vi.fn()} onFlush={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(tenantQuery).toHaveBeenCalledWith(false);
  });
});
