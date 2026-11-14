import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_hr/hr_staff_management/components/searchable_dropdown/AdminHrStaffManagementSearchableDropdown';
import Pagination from '@/app/frontend_admin/admin_hr/hr_staff_management/components/AdminHrStaffManagementPagination';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const opts = [{label: 'All', value: 'all'}, {label: 'Trainer', value: 'trainer'}, {label: 'Manager', value: 'manager'}];

describe('RBG128 HR selector and pagination safety', () => {
 it('supports keyboard Home/End, selects and returns focus', () => {
  const onChange = vi.fn();
  render(<AdminNavigationLayoutSearchableDropdown options={opts} value="all" onChange={onChange} ariaLabel="Role" />);
  const trigger = screen.getByRole('button', {name: 'Role'}); fireEvent.click(trigger);
  const input = screen.getByRole('combobox');
  fireEvent.keyDown(input, {key: 'End'});
  fireEvent.keyDown(input, {key: 'Enter'});
  expect(onChange).toHaveBeenCalledWith('manager');
 });
 it('disables a selector while its options are open', () => {
  const onChange = vi.fn();
  const view = render(<AdminNavigationLayoutSearchableDropdown options={opts} value="all" onChange={onChange} ariaLabel="Role" />);
  fireEvent.click(screen.getByRole('button', {name: 'Role'}));
  view.rerender(<AdminNavigationLayoutSearchableDropdown options={opts} value="all" onChange={onChange} ariaLabel="Role" disabled />);
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  expect(screen.getByRole('button', {name:'Role'})).toBeDisabled();
 });
 it('does not display impossible row numbers for obsolete pages', () => {
  render(<Pagination currentPage={50} totalPages={2} totalItems={15} itemsPerPage={10} onPageChange={vi.fn()} />);
  const status = screen.getAllByText('15')[0];
  expect(status).toBeInTheDocument();
  expect(screen.queryByText('491')).not.toBeInTheDocument();
 });
});
