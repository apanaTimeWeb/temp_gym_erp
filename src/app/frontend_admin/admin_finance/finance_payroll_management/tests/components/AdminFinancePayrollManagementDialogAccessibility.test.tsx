import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import AdminFinancePayrollManagementConfirmModal from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/feedback/AdminFinancePayrollManagementConfirmModal';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/searchable_dropdown/AdminFinancePayrollManagementSearchableDropdown';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
afterEach(cleanup);
describe('Payroll modal focus and validation', () => {
  it('traps keyboard Tab, cancels on Escape and returns focus to the invoker', () => {
    const onCancel = vi.fn();
    const caller = document.createElement('button'); caller.textContent = 'Open'; document.body.appendChild(caller); caller.focus();
    const view = render(<AdminFinancePayrollManagementConfirmModal isOpen title="Confirm" message="Check" onConfirm={vi.fn()} onCancel={onCancel} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveFocus();
    // JSDOM has no layout. Mock focusable geometry to exercise the real Tab trap.
    const rects = vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue([{}] as never);
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(screen.getByRole('button', { name: 'hr.AdminFinancePayrollDialog.confirm' })).toHaveFocus();
    rects.mockRestore();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledOnce();
    view.rerender(<AdminFinancePayrollManagementConfirmModal isOpen={false} title="Confirm" message="Check" onConfirm={vi.fn()} onCancel={onCancel} />);
    expect(caller).toHaveFocus(); caller.remove();
  });
  it('associates invalid staff selector with the form error and restores focus after selection', () => {
    const onChange = vi.fn();
    render(<><AdminNavigationLayoutSearchableDropdown value="a" ariaLabel="Staff" ariaInvalid ariaDescribedBy="staff-error" onChange={onChange} options={[{value:'a', label:'Alpha'}, {value:'b',label:'Beta'}]} /><p id="staff-error">Choose staff</p></>);
    const trigger = screen.getByRole('button', { name: 'Staff: Alpha' });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAttribute('aria-describedby', 'staff-error');
    fireEvent.click(trigger); fireEvent.click(screen.getByRole('option', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalledWith('b'); expect(trigger).toHaveFocus();
  });
});
