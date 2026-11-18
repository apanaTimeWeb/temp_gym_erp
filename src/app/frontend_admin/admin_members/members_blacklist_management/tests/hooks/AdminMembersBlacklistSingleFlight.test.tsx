import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementLogic';
import { AdminBlacklistApi } from '@/app/frontend_admin/admin_members/members_blacklist_management/api/admin_members_blacklist_management_api';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementConfirm';

vi.mock('@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementConfirm',()=>({useAdminNavigationLayoutConfirm:vi.fn()}));
vi.mock('@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementUrlQuerySync',()=>({useAdminNavigationLayoutUrlQuerySync:vi.fn()}));
vi.mock('@/app/frontend_admin/admin_members/members_blacklist_management/api/admin_members_blacklist_management_api',()=>({AdminBlacklistApi:{fetchBlacklist:vi.fn(),fetchKPIs:vi.fn(),addToBlacklist:vi.fn(),removeFromBlacklist:vi.fn(),toggleBlacklist:vi.fn(),propagateToAllBranches:vi.fn()}}));
const member={id:'bl-1',memberId:'M-1',memberName:'Test',memberPhone:'1234567890',memberEmail:'test@example.com',reason:'Policy',scope:'specific' as const,assignedGyms:['g1'],assignedGymNames:['One'],isActive:true,blacklistedBy:'Admin',blacklistedAt:'2026-11-02'};
const payload={memberId:'M-2',memberName:'Example',memberPhone:'1234567890',memberEmail:'two@example.com',reason:'Policy',scope:'specific' as const,assignedGyms:['g1']};
let client:QueryClient;
function wrapper({children}:{children:React.ReactNode}){return <QueryClientProvider client={client}>{children}</QueryClientProvider>}
const confirm=vi.fn();
beforeEach(()=>{vi.clearAllMocks();client=new QueryClient({defaultOptions:{queries:{retry:false},mutations:{retry:false}}});vi.mocked(useAdminNavigationLayoutConfirm).mockReturnValue({confirm});confirm.mockResolvedValue(true);vi.mocked(AdminBlacklistApi.fetchBlacklist).mockResolvedValue({success:true,data:[member],meta:{total:1,page:1,limit:10,totalPages:1}} as never);vi.mocked(AdminBlacklistApi.fetchKPIs).mockResolvedValue({success:true,data:{totalBlacklisted:1,globalBans:0,gymSpecificBans:1,addedThisMonth:1}} as never);vi.mocked(AdminBlacklistApi.removeFromBlacklist).mockResolvedValue({success:true,message:'Removed',data:null} as never);vi.mocked(AdminBlacklistApi.addToBlacklist).mockResolvedValue({success:true,message:'Saved',data:member} as never);});
describe('RBG136 blacklist mutation lifecycle',()=>{
 it('prevents concurrent destructive requests during an unsettled add',async()=>{
  let settle!:(value:unknown)=>void;
  vi.mocked(AdminBlacklistApi.addToBlacklist).mockImplementationOnce(()=>new Promise(resolve=>{settle=resolve}) as never);
  const {result}=renderHook(()=>useAdminBlacklistLogic(),{wrapper});
  await waitFor(()=>expect(result.current.status).toBe('success'));
  let pending!:Promise<boolean>;
  await act(async()=>{pending=result.current.saveBlacklist(payload);await Promise.resolve();});
  await waitFor(()=>expect(AdminBlacklistApi.addToBlacklist).toHaveBeenCalledTimes(1));
  await act(async()=>{expect(await result.current.removeFromBlacklist(member.id,member.memberName)).toBe(false);expect(await result.current.toggleBlacklist(member.id)).toBe(false);});
  expect(confirm).toHaveBeenCalledTimes(1);
  await act(async()=>{settle({success:true,message:'Saved',data:member});await pending});
  expect(AdminBlacklistApi.removeFromBlacklist).not.toHaveBeenCalled();
 });
 it('guards across separate mounted table/modal hook instances',async()=>{
  let settle!:(value:unknown)=>void;
  vi.mocked(AdminBlacklistApi.addToBlacklist).mockImplementationOnce(()=>new Promise(resolve=>{settle=resolve}) as never);
  const table=renderHook(()=>useAdminBlacklistLogic(),{wrapper});
  const modal=renderHook(()=>useAdminBlacklistLogic(),{wrapper});
  await waitFor(()=>expect(table.result.current.status).toBe('success'));
  let pending!:Promise<boolean>;
  await act(async()=>{pending=modal.result.current.saveBlacklist(payload);await Promise.resolve();});
  await waitFor(()=>expect(AdminBlacklistApi.addToBlacklist).toHaveBeenCalledTimes(1));
  await act(async()=>{expect(await table.result.current.removeFromBlacklist(member.id,member.memberName)).toBe(false)});
  expect(AdminBlacklistApi.removeFromBlacklist).not.toHaveBeenCalled();
  await act(async()=>{settle({success:true,message:'Saved',data:member});await pending});
 });
 it('awaits failure, preserves retry identity, then rotates on different payload',async()=>{
  vi.mocked(AdminBlacklistApi.addToBlacklist).mockRejectedValueOnce(new Error('offline'));
  const {result}=renderHook(()=>useAdminBlacklistLogic(),{wrapper});await waitFor(()=>expect(result.current.status).toBe('success'));
  await act(async()=>{expect(await result.current.saveBlacklist(payload)).toBe(false)});
  const first=vi.mocked(AdminBlacklistApi.addToBlacklist).mock.calls[0][1];
  await act(async()=>{expect(await result.current.saveBlacklist(payload)).toBe(true)});
  expect(vi.mocked(AdminBlacklistApi.addToBlacklist).mock.calls[1][1]).toEqual(first);
  await act(async()=>{expect(await result.current.saveBlacklist({...payload,reason:'Updated policy'})).toBe(true)});
  expect(vi.mocked(AdminBlacklistApi.addToBlacklist).mock.calls[2][1]).not.toEqual(first);
 });
});
