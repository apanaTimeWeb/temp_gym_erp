import { describe, expect, it, vi, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsUrlQuerySync';

let query = 'search=notice&page=3';
const replace = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
  usePathname: () => '/frontend_admin/admin_communication/communication_notices_and_announcements',
  useSearchParams: () => new URLSearchParams(query),
}));
function useTestBindings() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  useAdminNavigationLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: (value) => setSearch(String(value ?? '')) },
    { key: 'page', value: page, defaultValue: 1, setValue: (value) => {
      const n = Number(value); setPage(Number.isSafeInteger(n) && n >= 1 ? n : 1);
    } },
  ]);
  return { search, page, setSearch };
}
describe('announcement URL/history binding', () => {
  beforeEach(() => { query = 'search=notice&page=3'; replace.mockClear(); });
  it('hydrates incoming deep link without immediately overwriting it', () => {
    const { result } = renderHook(useTestBindings);
    expect(result.current.search).toBe('notice');
    expect(result.current.page).toBe(3);
    expect(replace).not.toHaveBeenCalled();
  });
  it('resets removed query parameters when browser history navigates back', () => {
    const { result, rerender } = renderHook(useTestBindings);
    act(() => { query = ''; rerender(); });
    expect(result.current.search).toBe('');
    expect(result.current.page).toBe(1);
  });
  it('writes local edits to the URL after hydration', () => {
    const { result } = renderHook(useTestBindings);
    act(() => { result.current.setSearch('updated'); });
    expect(replace).toHaveBeenCalledWith(expect.stringContaining('search=updated'), { scroll: false });
  });
});
