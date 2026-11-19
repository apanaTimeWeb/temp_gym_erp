import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdminAttendanceReportsSearchableDropdown } from '@/app/frontend_admin/admin_attendance/attendance_reports/components/searchable_dropdown/AdminAttendanceReportsSearchableDropdown';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
const options = [{label:'Alpha',value:'a'},{label:'Beta',value:'b'},{label:'Gamma',value:'c'}];
describe('RBG138 accessible report filters', () => {
  it('supports Home/End, selection and keyboard focus restoration', () => {
    const onChange = vi.fn();
    render(<AdminAttendanceReportsSearchableDropdown options={options} value="a" onChange={onChange} ariaLabel="Branch"/>);
    const trigger=screen.getByRole('button',{name:'Branch'});
    fireEvent.click(trigger);
    const input=screen.getByRole('combobox',{name:'Branch'});
    fireEvent.keyDown(input,{key:'End'});
    fireEvent.keyDown(input,{key:'Enter'});
    expect(onChange).toHaveBeenCalledWith('c');
    expect(document.activeElement).toBe(trigger);
  });
  it('filters leading/trailing whitespace without turning whitespace-only searches into empty options', () => {
    render(<AdminAttendanceReportsSearchableDropdown options={options} value="a" onChange={vi.fn()} ariaLabel="Branch"/>);
    fireEvent.click(screen.getByRole('button',{name:'Branch'}));
    fireEvent.change(screen.getByRole('combobox',{name:'Branch'}),{target:{value:'  '}});
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });
});
