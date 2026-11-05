// RESPONSIBILITY: Verifies member CSV export duplicate-request prevention, cleanup, and feedback.
// DATA FLOW: export trigger → member API result → browser download lifecycle → toast and resource cleanup.

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminMembersApi } from '@/app/frontend_admin/admin_members/members_directory/api/admin_members_directory_api';
import { useAdminMembersExport } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryExport';
import { adminToast } from '@/app/frontend_admin/admin_members/members_directory/components/feedback/AdminMembersDirectoryToastService';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_members/members_directory/api/admin_members_directory_api', () => ({ AdminMembersApi: { exportMembers: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_members/members_directory/components/feedback/AdminMembersDirectoryToastService', () => ({ adminToast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_members/members_directory/components/feedback/AdminMembersDirectoryBackendMessage', () => ({ getAdminBackendMessage: () => 'export failed safely' }));

const filters = { search: 'Riya', status: 'active', branchId: 'branch-1' };
let createObjectURL: ReturnType<typeof vi.fn>;
let revokeObjectURL: ReturnType<typeof vi.fn>;
let clickSpy: ReturnType<typeof vi.spyOn>;
let previousCreateDescriptor: PropertyDescriptor | undefined;
let previousRevokeDescriptor: PropertyDescriptor | undefined;

describe('useAdminMembersExport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    createObjectURL = vi.fn().mockReturnValue('blob:members-export');
    revokeObjectURL = vi.fn();
    previousCreateDescriptor = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
    previousRevokeDescriptor = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL');
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectURL });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL });
    clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
  });

  afterEach(() => {
    clickSpy.mockRestore();
    if (previousCreateDescriptor) Object.defineProperty(URL, 'createObjectURL', previousCreateDescriptor);
    else Reflect.deleteProperty(URL, 'createObjectURL');
    if (previousRevokeDescriptor) Object.defineProperty(URL, 'revokeObjectURL', previousRevokeDescriptor);
    else Reflect.deleteProperty(URL, 'revokeObjectURL');
  });

  it('creates, clicks, and revokes a CSV download after a successful API response', async () => {
    vi.mocked(AdminMembersApi.exportMembers).mockResolvedValue({ data: 'id,name\n1,Riya', message: 'Export ready' } as never);
    const { result } = renderHook(() => useAdminMembersExport(filters));

    await act(async () => { await result.current.exportMembers(); });

    expect(AdminMembersApi.exportMembers).toHaveBeenCalledWith(filters);
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:members-export');
    expect(adminToast.success).toHaveBeenCalledWith('Export ready', 'admin_members-export-success');
    expect(result.current.isExporting).toBe(false);
  });

  it('prevents a second export while the first API request is unresolved', async () => {
    let resolveExport!: (value: unknown) => void;
    vi.mocked(AdminMembersApi.exportMembers).mockReturnValue(new Promise((resolve) => { resolveExport = resolve; }) as never);
    const { result } = renderHook(() => useAdminMembersExport(filters));

    let firstRun!: Promise<void>;
    act(() => { firstRun = result.current.exportMembers(); });
    await act(async () => { await result.current.exportMembers(); });
    expect(AdminMembersApi.exportMembers).toHaveBeenCalledTimes(1);
    await act(async () => { resolveExport({ data: 'id,name\n1,Riya', message: 'Export ready' }); await firstRun; });
  });

  it('surfaces a safe error and always restores export state', async () => {
    vi.mocked(AdminMembersApi.exportMembers).mockRejectedValue(new Error('internal transport detail'));
    const { result } = renderHook(() => useAdminMembersExport(filters));

    await act(async () => { await result.current.exportMembers(); });

    expect(adminToast.error).toHaveBeenCalledWith('members.AdminAuditRepair.exportFailed', 'admin_members-export-error');
    expect(result.current.isExporting).toBe(false);
  });
});


describe('Members Directory browser download failure', () => {
  it('shows only localized failure feedback and releases the pending state', async () => {
    vi.mocked(AdminMembersApi.exportMembers).mockResolvedValue({ data: 'ID,Name', message: 'Export ready' } as never);
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { throw new Error('private browser diagnostic'); });
    const { result } = renderHook(() => useAdminMembersExport(filters));
    await act(async () => { await result.current.exportMembers(); });
    expect(adminToast.error).toHaveBeenCalledWith('members.AdminAuditRepair.exportFailed', 'admin_members-export-error');
    expect(adminToast.success).not.toHaveBeenCalled();
    expect(result.current.isExporting).toBe(false);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:members-export');
    click.mockRestore();
  });
});
