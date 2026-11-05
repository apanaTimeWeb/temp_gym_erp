// RESPONSIBILITY: Regression checks for Finance ledger selector keyboard, focus, and disabled states.
// DATA FLOW: keyboard selection → accessible active option → parent onChange and focus restoration.
import { fireEvent,render,screen } from '@testing-library/react';
import { describe,expect,it,vi } from 'vitest';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/components/searchable_dropdown/AdminFinanceStaffLedgerManagementSearchableDropdown';
vi.mock('next-intl',()=>({useTranslations:()=> (key:string)=>key}));
const options=Array.from({length:25},(_,i)=>({value:String(i),label:`Staff ${i}`}));
describe('Finance ledger searchable selector',()=>{
 it('supports Home/End, Enter and focus restoration',()=>{
  const onChange=vi.fn();render(<AdminNavigationLayoutSearchableDropdown options={options} value="4" onChange={onChange} placeholder="Staff" testId="ledger-trigger"/>);
  const trigger=screen.getByTestId('ledger-trigger');fireEvent.click(trigger);
  const input=screen.getByRole('combobox');fireEvent.keyDown(input,{key:'End'});
  expect(input.getAttribute('aria-activedescendant')).toMatch(/option-24$/);
  fireEvent.keyDown(input,{key:'Home'});expect(input.getAttribute('aria-activedescendant')).toMatch(/option-0$/);
  fireEvent.keyDown(input,{key:'Enter'});expect(onChange).toHaveBeenCalledWith('0');expect(document.activeElement).toBe(trigger);
 });
 it('closes an open selector when it becomes disabled',()=>{
  const onChange=vi.fn();const {rerender}=render(<AdminNavigationLayoutSearchableDropdown options={options} value="4" onChange={onChange} placeholder="Staff" testId="ledger-trigger"/>);
  fireEvent.click(screen.getByTestId('ledger-trigger'));expect(screen.getByRole('listbox')).toBeTruthy();
  rerender(<AdminNavigationLayoutSearchableDropdown options={options} value="4" onChange={onChange} placeholder="Staff" testId="ledger-trigger" disabled/>);
  expect(screen.queryByRole('listbox')).toBeNull();expect(screen.getByTestId('ledger-trigger').getAttribute('aria-expanded')).toBe('false');
 });
});
