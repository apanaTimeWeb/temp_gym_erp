import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_communications/communications_churn_recovery/hooks/useManagerCommunicationsChurnRecoveryLogic';

const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn(), back: vi.fn(), refresh: vi.fn() })),
  usePathname: vi.fn(() => '/manager'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));


describe('useManagerCommunicationsCampaignsChurnRecoveryLogic co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerCommunicationsCampaignsChurnRecoveryLogic).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerCommunicationsCampaignsChurnRecoveryLogic as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
