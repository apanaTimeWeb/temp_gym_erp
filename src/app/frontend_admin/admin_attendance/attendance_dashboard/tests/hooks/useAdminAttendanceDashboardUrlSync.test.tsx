import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdminNavigationLayoutUrlQuerySync } from '../../hooks/useAdminAttendanceDashboardUrlQuerySync';

const env = vi.hoisted(() => ({ query: 'search=Zo&source=dashboard', replace: vi.fn() }));
vi.mock('next/navigation', () => ({
  usePathname: () => '/frontend_admin/admin_attendance/attendance_dashboard',
  useSearchParams: () => new URLSearchParams(env.query),
  useRouter: () => ({ replace: env.replace }),
}));

describe('RBG139 attendance URL round trips', () => {
  it('hydrates external URL then merges consecutive local edits and preserves unrelated query keys', () => {
    env.query = 'search=Zo&source=dashboard';
    env.replace.mockClear();
    const setSearch = vi.fn();
    const setStatus = vi.fn();
    const { rerender } = renderHook(({ search, status }) => useAdminNavigationLayoutUrlQuerySync([
      { key: 'search', value: search, defaultValue: '', setValue: setSearch },
      { key: 'status', value: status, defaultValue: 'all', setValue: setStatus },
    ]), { initialProps: { search: '', status: 'all' } });
    expect(setSearch).toHaveBeenCalledWith('Zo');
    rerender({ search: 'Zo', status: 'all' });
    rerender({ search: 'Jo', status: 'all' });
    expect(env.replace).toHaveBeenLastCalledWith(expect.stringContaining('search=Jo'), { scroll: false });
    rerender({ search: 'Jo', status: 'late' });
    const uri = env.replace.mock.lastCall?.[0] as string;
    expect(uri).toContain('search=Jo');
    expect(uri).toContain('status=late');
    expect(uri).toContain('source=dashboard');
    // A browser history URL without a search key must restore the default, not resurrect pending edits.
    env.query = 'page=2&source=back';
    rerender({ search: 'Jo', status: 'late' });
    expect(setSearch).toHaveBeenCalledWith('');
    expect(setStatus).toHaveBeenCalledWith('all');
  });
});
