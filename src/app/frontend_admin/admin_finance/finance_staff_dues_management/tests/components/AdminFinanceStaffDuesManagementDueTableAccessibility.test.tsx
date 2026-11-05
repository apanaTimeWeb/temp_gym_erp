import { render,screen } from '@testing-library/react';
import { describe,expect,it,vi } from 'vitest';
import AdminFinanceStaffDuesManagementDueTable from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/components/due_table/AdminFinanceStaffDuesManagementDueTable';
vi.mock('next-intl',()=>({useLocale:()=> 'en',useTranslations:()=> (key:string)=>key}));
vi.mock('@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementDueForm',()=>({useAdminFinanceStaffDuesManagementDueForm:()=>({
 staff:[],selectedStaff:null,saving:false,submit:vi.fn((e)=>e.preventDefault()),
 form:{register:()=>({}),setValue:vi.fn(),watch:(key:string)=>key==='amount'?0:'',formState:{errors:{notes:{message:'__i18n:hr.validation.notesMax'}}}}
})}));
vi.mock('@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementDueAmountSync',()=>({useAdminFinanceStaffDuesManagementDueAmountSync:()=>undefined}));
describe('due-payment form validation accessibility',()=>{
 it('connects translated notes validation to textarea',()=>{
  render(<AdminFinanceStaffDuesManagementDueTable/>);
  const textarea=screen.getByRole('textbox');const error=document.getElementById('admin_hr-due-notes-error');
  expect(textarea.getAttribute('aria-invalid')).toBe('true');expect(textarea.getAttribute('aria-describedby')).toBe(error?.id);expect(error).not.toBeNull();
 });
});
