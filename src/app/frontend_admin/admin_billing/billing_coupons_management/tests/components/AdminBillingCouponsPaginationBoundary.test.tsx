// RBG131: impossible pagination metadata never reaches visible controls.
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/AdminBillingCouponsManagementPagination';
vi.mock('next-intl',()=>({useTranslations:()=> (key:string)=>key}));
describe('RBG131 coupon pagination boundaries',()=>{
  it('clamps stale page and routes previous to the real preceding page',()=>{
    const change=vi.fn();
    render(<AdminNavigationLayoutPagination currentPage={999} totalPages={2} onPageChange={change} totalItems={11} itemsPerPage={10} />);
    expect(screen.getByRole('button',{name:'admin_layout.AdminNavigationLayoutPagination.text_4bfc194b68'})).toBeDisabled();
    fireEvent.click(screen.getByRole('button',{name:'admin_layout.AdminNavigationLayoutPagination.text_81f547195b'}));
    expect(change).toHaveBeenCalledWith(1);
    expect(screen.getAllByRole('button').filter(button => button.getAttribute('aria-current') === 'page')).toHaveLength(1);
  });
});
