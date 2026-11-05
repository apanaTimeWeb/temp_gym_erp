import {describe,it,expect,vi} from 'vitest';
import {renderHook,act} from '@testing-library/react';
import {useAdminNavigationLayoutUrlQuerySync} from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementUrlQuerySync';
let pathname='/admin/members/blacklist';let current='?unrelated=keep';const replace=vi.fn();
vi.mock('next/navigation',()=>({useRouter:()=>({replace}),usePathname:()=>pathname,useSearchParams:()=>new URLSearchParams(current)}));
describe('RBG136 optimistic filter URL synchronization',()=>{
 it('preserves unrelated query keys and merges rapid edits',()=>{
  const state={search:'',scope:'all'};
  const bindings=()=>[{key:'search',value:state.search,defaultValue:'',setValue:(v:unknown)=>{state.search=String(v)}},{key:'scope',value:state.scope,defaultValue:'all',setValue:(v:unknown)=>{state.scope=String(v)}}];
  const {rerender}=renderHook(()=>useAdminNavigationLayoutUrlQuerySync(bindings()));
  act(()=>{state.search='alex';rerender()});
  act(()=>{state.scope='global';rerender()});
  expect(replace).toHaveBeenCalled();
  expect(String(replace.mock.lastCall?.[0])).toContain('search=alex');
  expect(String(replace.mock.lastCall?.[0])).toContain('scope=global');
  expect(String(replace.mock.lastCall?.[0])).toContain('unrelated=keep');
 });
});
