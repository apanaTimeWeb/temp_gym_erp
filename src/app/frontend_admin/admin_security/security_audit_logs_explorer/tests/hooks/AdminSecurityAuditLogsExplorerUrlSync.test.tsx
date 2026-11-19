import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/hooks/useAdminSecurityAuditLogsExplorerUrlQuerySync';

const nav = vi.hoisted(() => ({ query: 'actor=alice&page=3', replace: vi.fn() }));
vi.mock('next/navigation', () => ({
  usePathname: () => '/frontend_admin/admin_security/security_audit_logs_explorer',
  useRouter: () => ({ replace: nav.replace }),
  useSearchParams: () => new URLSearchParams(nav.query),
}));

describe('RBG125 audit URL-state synchronization', () => {
  it('hydrates, preserves consecutive local edits and restores defaults via browser history', () => {
    nav.query = 'actor=alice&page=3'; nav.replace.mockClear();
    const { result, rerender } = renderHook(() => {
      const [filters, setFilters] = useState({ actor: 'all', action: 'all', page: 1 });
      useAdminNavigationLayoutUrlQuerySync([
        { key: 'actor', value: filters.actor, defaultValue: 'all', setValue: (value) => setFilters((old) => ({ ...old, actor: String(value) })) },
        { key: 'action', value: filters.action, defaultValue: 'all', setValue: (value) => setFilters((old) => ({ ...old, action: String(value) })) },
        { key: 'page', value: filters.page, defaultValue: 1, setValue: (value) => setFilters((old) => ({ ...old, page: Number(value) })) },
      ]);
      return { filters, setFilters };
    });
    expect(result.current.filters.actor).toBe('alice');
    expect(result.current.filters.page).toBe(3);
    act(() => result.current.setFilters((old) => ({ ...old, actor: 'bob' })));
    act(() => result.current.setFilters((old) => ({ ...old, action: 'LOGIN' })));
    expect(nav.replace).toHaveBeenCalled();
    const lastUrl = String(nav.replace.mock.lastCall?.[0]);
    expect(lastUrl).toContain('actor=bob');
    expect(lastUrl).toContain('action=LOGIN');
    nav.query = ''; rerender();
    expect(result.current.filters.actor).toBe('all');
    expect(result.current.filters.action).toBe('all');
    expect(result.current.filters.page).toBe(1);
  });
});
