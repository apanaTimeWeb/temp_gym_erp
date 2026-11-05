import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const navigationState = vi.hoisted(() => ({ search: 'range=custom&startDate=2026-10-01&endDate=2026-10-10' }));
const navigationReplace = vi.hoisted(() => vi.fn());
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: navigationReplace }),
  useSearchParams: () => new URLSearchParams(navigationState.search),
  usePathname: () => '/superadmin/analytics',
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/components/ui/SearchableDropdown', () => ({
  SearchableDropdown: ({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (next: string) => void }) => (
    <select aria-label="Analytics date range" value={value} onChange={(event) => onChange(event.target.value)} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  ),
}));

import { SuperadminAnalyticsDashboardDateFilterDropdown } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_forms_and_filters/SuperadminAnalyticsDashboardDateFilterDropdown';

describe('SuperadminAnalyticsDashboardDateFilterDropdown rendered interactions', () => {
  beforeEach(() => {
    navigationState.search = 'range=custom&startDate=2026-10-01&endDate=2026-10-10';
    navigationReplace.mockClear();
  });

  it('writes a changed custom start date to shareable URL state', () => {
    render(<SuperadminAnalyticsDashboardDateFilterDropdown />);
    fireEvent.change(screen.getByLabelText('ui.custom_start_date_v3'), { target: { value: '2026-10-02' } });
    expect(navigationReplace).toHaveBeenCalledTimes(1);
    const url = navigationReplace.mock.calls[0][0] as string;
    expect(url).toContain('/superadmin/analytics?');
    expect(new URLSearchParams(url.split('?')[1]).get('range')).toBe('custom');
    expect(new URLSearchParams(url.split('?')[1]).get('startDate')).toBe('2026-10-02');
  });

  it('announces invalid or inverted custom date bounds accessibly', () => {
    navigationState.search = 'range=custom&startDate=2026-10-20&endDate=2026-10-10';
    render(<SuperadminAnalyticsDashboardDateFilterDropdown />);
    expect(screen.getByRole('alert')).toHaveTextContent('ui.analytics_custom_range_invalid');
  });
});
