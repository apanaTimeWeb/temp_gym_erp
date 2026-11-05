import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminCommunicationMessagingCenterUrlState } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterUrlState';

const routerReplace = vi.hoisted(() => vi.fn());
vi.mock('next/navigation', () => ({
  usePathname: () => '/frontend_superadmin/superadmin_communication/communication_messaging_center',
  useRouter: () => ({ replace: routerReplace }),
  useSearchParams: () => new URLSearchParams('tab=messages&keep=1'),
}));

describe('useSuperadminCommunicationMessagingCenterUrlState', () => {
  it('reads a query value and uses a fallback when absent', () => {
    const { result } = renderHook(() => useSuperadminCommunicationMessagingCenterUrlState());
    expect(result.current.getParam('tab', 'messages')).toBe('messages');
    expect(result.current.getParam('missing', 'fallback')).toBe('fallback');
  });

  it('batches updates, deletes null values, and preserves unrelated keys', () => {
    const { result } = renderHook(() => useSuperadminCommunicationMessagingCenterUrlState());
    act(() => result.current.setParams({ tab: 'notifications', channel: null, page: '2' }));
    expect(routerReplace).toHaveBeenCalledWith(
      '/frontend_superadmin/superadmin_communication/communication_messaging_center?tab=notifications&keep=1&page=2',
      { scroll: false },
    );
  });
});
