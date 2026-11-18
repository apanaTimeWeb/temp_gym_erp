import React from 'react';
import {describe,it,expect} from 'vitest';
import {render,screen} from '@testing-library/react';
import {readMockPositiveInteger} from '@/app/frontend_admin/admin_members/members_blacklist_management/mocks/handlers/AdminMembersBlacklistManagementMockHandlers';
import Pagination from '@/app/frontend_admin/admin_members/members_blacklist_management/components/AdminMembersBlacklistManagementPagination';
import { vi } from 'vitest';
vi.mock('next-intl',()=>({useTranslations:()=> (key:string)=>key}));
describe('RBG136 pagination contract',()=>{
 it('rejects non-positive and unsafe mock request integers',()=>{
  expect(readMockPositiveInteger('-1',10)).toBe(10);
  expect(readMockPositiveInteger('Infinity',10)).toBe(10);
  expect(readMockPositiveInteger('2',10)).toBe(2);
 });
 it('clamps obsolete page to final available page',()=>{
  render(<Pagination currentPage={999} totalPages={3} totalItems={21} itemsPerPage={10} onPageChange={()=>{}}/>);
  expect(screen.getByText('3').closest('button')?.getAttribute('aria-current')).toBe('page');
  expect(screen.getByRole('button',{name:'admin_layout.AdminNavigationLayoutPagination.text_4bfc194b68'}).hasAttribute('disabled')).toBe(true);
 });
});
