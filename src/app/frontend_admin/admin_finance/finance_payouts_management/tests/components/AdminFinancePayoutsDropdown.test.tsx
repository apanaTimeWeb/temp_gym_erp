import { render, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/searchable_dropdown/AdminFinancePayoutsManagementSearchableDropdown';
vi.mock('next-intl', () => ({useTranslations: () => (key:string) => key}));
describe('RBG119 payout selector accessibility', () => {
  it('supports Home/End and focus restoration after selecting', () => {
    const change = vi.fn();
    render(<AdminNavigationLayoutSearchableDropdown options={[{value:'a',label:'A'},{value:'b',label:'B'},{value:'c',label:'C'}]} value="a" onChange={change} placeholder="Gym" testId="gym" />);
    fireEvent.click(screen.getByTestId('gym'));
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input,{key:'End'});
    expect(input.getAttribute('aria-activedescendant')).toContain('option-2');
    fireEvent.keyDown(input,{key:'Home'});
    expect(input.getAttribute('aria-activedescendant')).toContain('option-0');
    fireEvent.keyDown(input,{key:'ArrowDown'});
    fireEvent.keyDown(input,{key:'Enter'});
    expect(change).toHaveBeenCalledWith('b');
    expect(screen.getByTestId('gym')).toHaveFocus();
  });
  it('removes listbox relationship once disabled',()=>{
    const props={options:[{value:'a',label:'A'}],value:'a',onChange:vi.fn(),placeholder:'Gym',testId:'gym'};
    const {rerender}=render(<AdminNavigationLayoutSearchableDropdown {...props}/>);
    fireEvent.click(screen.getByTestId('gym'));
    rerender(<AdminNavigationLayoutSearchableDropdown {...props} disabled/>);
    expect(screen.getByTestId('gym')).toHaveAttribute('aria-expanded','false');
    expect(screen.getByTestId('gym')).not.toHaveAttribute('aria-controls');
  });
});
