// RESPONSIBILITY: Ledger errors use a localized alert and retry action, never a misleading no-records state.
// DATA FLOW: query-state hook → ledger table → alert/retry interaction.
import { fireEvent,render,screen } from '@testing-library/react';
import { describe,expect,it,vi } from 'vitest';
import AdminFinanceStaffLedgerManagementLedgerTable from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/components/ledger_table/AdminFinanceStaffLedgerManagementLedgerTable';
const state=vi.hoisted(()=>({retry:vi.fn()}));
vi.mock('next-intl',()=>({useTranslations:()=>(key:string)=>key,useLocale:()=> 'en'}));
vi.mock('@/app/frontend_admin/admin_finance/finance_staff_ledger_management/hooks/useAdminFinanceStaffLedgerManagementLedgerLogic',()=>({useAdminFinanceStaffLedgerManagementLedgerLogic:()=>({
 selectedStaffId:'s1',setSelectedStaffId:vi.fn(),selectedStaff:null,staffOptions:[],sortedLedger:[],loading:false,error:'Safe localized error',retryLedger:state.retry,sortKey:'date',sortDir:'desc',handleSort:vi.fn()
})}));
describe('Finance staff ledger error',()=>{
 it('renders error and permits explicit retry without exposing backend details',()=>{
  state.retry.mockReset();render(<AdminFinanceStaffLedgerManagementLedgerTable/>);
  expect(screen.getByRole('alert').textContent).toContain('Safe localized error');
  fireEvent.click(screen.getByTestId('finance-staff-ledger-retry'));expect(state.retry).toHaveBeenCalledOnce();
 });
});
