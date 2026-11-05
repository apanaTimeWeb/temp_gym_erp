// Host-only RTL/Vitest regression specification; authored, not executed in source archive.
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_summary/components/searchable_dropdown/AdminFinanceSummarySearchableDropdown';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const options=Array.from({length:16},(_,i)=>({value:String(i),label:`Branch ${i}`}));
describe('Finance Summary searchable selector', () => {
 it('supports Home and End and restores focus after Enter',()=>{
  const onChange=vi.fn();render(<AdminNavigationLayoutSearchableDropdown options={options} value="2" onChange={onChange} placeholder="Branch" testId="finance-branch"/>);
  const trigger=screen.getByTestId('finance-branch');fireEvent.click(trigger);
  const input=screen.getByTestId('finance-branch-search');
  fireEvent.keyDown(input,{key:'End'});expect(input).toHaveAttribute('aria-activedescendant',expect.stringContaining('option-15'));
  fireEvent.keyDown(input,{key:'Home'});expect(input).toHaveAttribute('aria-activedescendant',expect.stringContaining('option-0'));
  fireEvent.keyDown(input,{key:'Enter'});expect(onChange).toHaveBeenCalledWith('0');expect(trigger).toHaveFocus();
 });
 it('unmounts its listbox and clears aria-expanded when disabled',()=>{
  const onChange=vi.fn();const ui=render(<AdminNavigationLayoutSearchableDropdown options={options} value="2" onChange={onChange} placeholder="Branch" testId="finance-branch"/>);
  fireEvent.click(screen.getByTestId('finance-branch'));expect(screen.getByRole('listbox')).toBeInTheDocument();
  ui.rerender(<AdminNavigationLayoutSearchableDropdown options={options} value="2" onChange={onChange} placeholder="Branch" testId="finance-branch" disabled/>);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();expect(screen.getByTestId('finance-branch')).toHaveAttribute('aria-expanded','false');
  expect(screen.getByTestId('finance-branch')).not.toHaveAttribute('aria-controls');
 });
});
