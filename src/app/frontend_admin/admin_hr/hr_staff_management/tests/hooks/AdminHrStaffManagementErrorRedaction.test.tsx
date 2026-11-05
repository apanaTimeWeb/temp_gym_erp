// RESPONSIBILITY: Verify HR staff reads mask untrusted backend error text while retaining retry.
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdminHrLogic } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementLogic';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams() }));
vi.mock('@tanstack/react-query', () => ({ useQuery: () => ({ status:'error', error: new Error('private-connection-info'), refetch:vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementUrlState', () => ({ useAdminHrUrlState: () => ({ debouncedSearch:'',roleFilter:'All',branchFilter:'All',currentPage:1,staffSortKey:'name',staffSortDir:'asc' }) }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/state/useAdminHrStaffManagementToastStore', () => ({ useAdminNavigationLayoutToastStore: () => ({ showToast:vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementStaffMutations', () => ({ useAdminHrStaffMutations: () => ({ isPending:false,saveStaff:vi.fn(),deleteStaff:vi.fn(),toggleStaffStatus:vi.fn() }) }));
describe('HR staff error redaction', () => {it('exposes only the localized retry message', () => {
 const {result}=renderHook(()=>useAdminHrLogic({editId:null,setShowModal:vi.fn()} as never));
 expect(result.current.error).toBe('hr.AdminAuditRepair.requestFailed');
 expect(result.current.error).not.toContain('private-connection-info');
 expect(result.current.retryStaff).toBeTypeOf('function');
});});
