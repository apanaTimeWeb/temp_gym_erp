import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { AdminFinanceOverviewDateFilterDropdown } from '@/app/frontend_admin/admin_finance/finance_expenses/components/date_filter/AdminFinanceExpensesDateFilterDropdown';
const replaced = vi.hoisted(() => vi.fn());
vi.mock('next/navigation', () => ({useRouter:()=>({replace:replaced}),usePathname:()=>'/finance/expenses',useSearchParams:()=>new URLSearchParams('range=custom&startDate=2026-02-30&endDate=2026-03-01&expensePage=4')}));
vi.mock('next-intl', () => ({useTranslations:()=>(key:string)=>key}));
vi.mock('@/app/frontend_admin/admin_finance/finance_expenses/components/searchable_dropdown/AdminFinanceExpensesSearchableDropdown',()=>({AdminNavigationLayoutSearchableDropdown:()=>null}));
describe('RBG117 date filter',()=>{
  it('rejects impossible start dates and never sets them as a native minimum',()=>{
    render(<AdminFinanceOverviewDateFilterDropdown/>);
    const start=screen.getByLabelText('finance.AdminFinanceDateFilterDropdown.customStartDate');
    const end=screen.getByLabelText('finance.AdminFinanceDateFilterDropdown.customEndDate');
    expect(start).toHaveAttribute('aria-invalid','true');
    expect(end).not.toHaveAttribute('min','2026-02-30');
    fireEvent.change(start,{target:{value:'2026-02-28'}});
    expect(replaced).toHaveBeenCalled();
    const destination=new URL(replaced.mock.lastCall![0],'https://example.test');
    expect(destination.searchParams.get('expensePage')).toBe('1');
  });
});
