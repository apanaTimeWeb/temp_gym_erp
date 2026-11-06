import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { maskSensitiveData } from '@/lib/formatters';

import SuperadminGymsTable from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryTable';
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';
import { useSuperadminGymsDirectoryTable } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryTable';
import { resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockHandlers';

vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryTable');
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryTableSortIcon', () => ({ default: () => null }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryEmptyState', () => ({ default: () => <div>No gyms</div> }));
vi.mock('@/components/ui/Pagination', () => ({ default: () => null }));
vi.mock('@/components/ui/CopyButton', () => ({ default: () => null }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryGymEditModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryGymWhatsappModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/components/SuperadminGymsDirectoryGymDeleteModal', () => ({ default: () => null }));
vi.mock('next-intl', () => ({
  useLocale: () => 'en-IN',
  useTranslations: () => (key: string) => {
    const tableMap: Record<string, string> = {
      'ui.members_ef53538a': 'Members',
      'ui.mrr_35432afe': 'MRR',
      'ui.last_active_b32a44ea': 'Last Active',
      'ui.sort_member_count_aria': 'Sort gyms by member count',
      'ui.sort_monthly_revenue_aria': 'Sort gyms by monthly revenue',
      'ui.sort_last_active_time_aria': 'Sort gyms by last active date',
    };
    return tableMap[key] || key;
  },
}));

const mockedUseGymsTable = vi.mocked(useSuperadminGymsDirectoryTable);
const baseGym = {
  id: 't1', name: 'Iron Paradise', ownerName: 'John Doe', adminEmail: 'john@iron.com', phone: '9876543210',
  status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE as const, plan: 'Pro', createdAt: '2026-08-01', memberCount: 200, monthlyRevenue: 5000,
  databaseVersion: 'v1.2', city: 'Mumbai', state: 'MH', staffCount: 15, currency: 'INR', databaseName: 'gym_db', lastActiveAt: '2026-09-17T09:15:00Z',
};
const setSortOrder = vi.fn();
const setSortBy = vi.fn();
let defaultHookReturn: ReturnType<typeof useSuperadminGymsDirectoryTable>;

beforeEach(() => {
  resetSuperadminGymsMockState();
  defaultHookReturn = {
    filteredGyms: [baseGym], isPending: false, isError: false, error: null, total: 1, actionLoadingId: null,
    handleRowClick: vi.fn(), onGhostLoginClick: vi.fn(), onSuspendClick: vi.fn(), onDeleteClick: vi.fn(),
    openWhatsappModal: vi.fn(), currentPage: 1, pageLimit: 20, sortBy: 'memberCount', sortOrder: 'asc', segmentId: '',
    setCurrentPage: vi.fn(), setSortBy, setSortOrder, refetch: vi.fn(),
  };
  mockedUseGymsTable.mockReturnValue(defaultHookReturn);
});

describe('SuperadminGymsTable', () => {
  it('uses native buttons for every sortable header and exposes aria-sort', () => {
    render(<SuperadminGymsTable />);
    expect(screen.getByRole('columnheader', { name: /Members/i })).toHaveAttribute('aria-sort', 'ascending');
    expect(screen.getByRole('columnheader', { name: /MRR/i })).toHaveAttribute('aria-sort', 'none');
    expect(screen.getByRole('columnheader', { name: /Last Active/i })).toHaveAttribute('aria-sort', 'none');

    const membersButton = screen.getByRole('button', { name: /sort gyms by member count/i });
    fireEvent.click(membersButton);
    expect(setSortOrder).toHaveBeenCalledWith('desc');
  });

  it('masks the administrator email in the cell and its title', () => {
    render(<SuperadminGymsTable />);
    const maskedEmail = maskSensitiveData(baseGym.adminEmail, 'email');
    const emailCell = screen.getByText(maskedEmail);

    expect(emailCell).toHaveAttribute('title', maskedEmail);
    expect(screen.queryByText(baseGym.adminEmail)).not.toBeInTheDocument();
    expect(emailCell).not.toHaveAttribute('title', baseGym.adminEmail);
  });

  it('supports keyboard activation on tenant rows', () => {
    const handleRowClick = vi.fn();
    mockedUseGymsTable.mockReturnValue({ ...defaultHookReturn, handleRowClick });
    render(<SuperadminGymsTable />);
    const row = screen.getByRole('row', { name: /Iron Paradise/i });
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(handleRowClick).toHaveBeenCalledWith(baseGym);
  });
});
