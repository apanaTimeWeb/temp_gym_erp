import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  range: 'monthly' as 'weekly' | 'monthly' | 'yearly' | 'custom',
  startDate: '',
  endDate: '',
  setRange: vi.fn(),
  setCustomDateRange: vi.fn(),
}));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewUrlState', () => ({
  useManagerDashboardOverviewUrlState: () => state,
}));
vi.mock('@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown', () => ({
  default: ({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) => (
    <select aria-label="date range" value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  ),
}));

import ManagerDashboardOverviewDateFilterDropdown from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewDateFilterDropdown';

describe('ManagerDashboardOverviewDateFilterDropdown', () => {
  beforeEach(() => {
    state.range = 'monthly';
    state.startDate = '';
    state.endDate = '';
    state.setRange.mockClear();
    state.setCustomDateRange.mockClear();
  });

  it('changes to a preset without overwriting it as custom', () => {
    render(<ManagerDashboardOverviewDateFilterDropdown />);

    fireEvent.change(screen.getByRole('combobox', { name: 'date range' }), { target: { value: 'weekly' } });

    expect(state.setRange).toHaveBeenCalledTimes(1);
    expect(state.setRange).toHaveBeenCalledWith('weekly');
    expect(state.setCustomDateRange).not.toHaveBeenCalled();
  });

  it('enters custom mode without inventing date boundaries', () => {
    render(<ManagerDashboardOverviewDateFilterDropdown />);

    fireEvent.change(screen.getByRole('combobox', { name: 'date range' }), { target: { value: 'custom' } });

    expect(state.setRange).toHaveBeenCalledWith('custom');
    expect(state.setCustomDateRange).not.toHaveBeenCalled();
  });
});
