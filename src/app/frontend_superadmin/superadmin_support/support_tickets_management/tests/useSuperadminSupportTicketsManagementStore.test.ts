import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/constants/superadmin_support_tickets_management.constants';
import { useSuperadminSupportTicketsManagementStore } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/state/useSuperadminSupportTicketsManagementStore';



describe('useSuperadminSupportTicketsManagementStore', () => {
  it('resets pagination when search/filter state changes', () => {
    const { result } = renderHook(() => useSuperadminSupportTicketsManagementStore());
    expect(result.current.statusFilter).toBe(SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER);
    act(() => result.current.setCurrentPage(4));
    act(() => result.current.setSearch('billing'));
    expect(result.current.search).toBe('billing');
    expect(result.current.currentPage).toBe(1);
    act(() => result.current.setPriorityFilter('HIGH' as never));
    expect(result.current.priorityFilter).toBe('HIGH');
    expect(result.current.currentPage).toBe(1);
  });
});
