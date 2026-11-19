import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { AdminFinanceOverviewDateFilterDropdown } from '@/app/frontend_admin/admin_finance/finance_payments/components/date_filter/AdminFinancePaymentsDateFilterDropdown';
const replaced = vi.hoisted(() => vi.fn());
vi.mock('next/navigation', () => ({useRouter:()=>({replace:replaced}),usePathname:()=>'/finance/payments',useSearchParams:()=>new URLSearchParams('range=custom&startDate=2026-02-30&endDate=2026-03-01&page=4')}));
vi.mock('next-intl', () => ({useTranslations:()=>(key:string)=>key}));
vi.mock('@/app/frontend_admin/admin_finance/finance_payments/components/searchable_dropdown/AdminFinancePaymentsSearchableDropdown',()=>({AdminNavigationLayoutSearchableDropdown:()=>null}));
describe('RBG118 Payments date filter',()=>{
  it('rejects invalid native constraints and preserves date edits',()=>{
    render(<AdminFinanceOverviewDateFilterDropdown/>);
    const start=screen.getByLabelText('finance.AdminFinanceDateFilterDropdown.customStartDate');
    const end=screen.getByLabelText('finance.AdminFinanceDateFilterDropdown.customEndDate');
    expect(start).toHaveAttribute('aria-invalid','true');
    expect(end).not.toHaveAttribute('min','2026-02-30');
    fireEvent.change(start,{target:{value:'2026-02-28'}});
    fireEvent.change(end,{target:{value:'2026-03-02'}});
    const url=new URL(replaced.mock.lastCall![0],'https://example.test');
    expect(url.searchParams.get('page')).toBe('1');
    expect(url.searchParams.get('startDate')).toBe('2026-02-28');
    expect(url.searchParams.get('endDate')).toBe('2026-03-02');
  });
});
