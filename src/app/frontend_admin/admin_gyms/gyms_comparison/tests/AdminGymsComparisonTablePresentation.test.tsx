// RESPONSIBILITY: Verifies presentation and responsive matrix rendering for AdminGymsComparisonTable.
// DATA FLOW: Mock branch fixtures -> AdminGymsComparisonTable presentation -> assertions.

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AdminGymsComparisonTable } from '../components/AdminGymsComparisonTable';
import type { Branch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes';

const mockBranches: Branch[] = [
  {
    id: 'b1',
    name: 'Andheri East Gym',
    branchCode: 'AND-01',
    location: 'Mumbai Suburbs',
    status: 'active',
    revenue: 185000,
    expenses: 95000,
    studentsCount: 420,
    staffCount: 18,
    equipmentCount: 45,
    currentOccupancy: 120,
    maxCapacity: 200,
    openingTime: '06:00',
    closingTime: '22:00',
  },
  {
    id: 'b2',
    name: 'Bandra West Gym',
    branchCode: 'BAN-02',
    location: 'South Mumbai',
    status: 'active',
    revenue: 142000,
    expenses: 61000,
    studentsCount: 310,
    staffCount: 12,
    equipmentCount: 38,
    currentOccupancy: 85,
    maxCapacity: 150,
    openingTime: '06:00',
    closingTime: '22:00',
  },
];

describe('AdminGymsComparisonTable', () => {
  const formatCurrency = (val: number) => `INR ${val.toLocaleString('en-IN')}`;

  it('renders all branches and metrics matrix in default "all" filter', () => {
    render(
      <AdminGymsComparisonTable
        branches={mockBranches}
        metricFilter="all"
        formatCurrency={formatCurrency}
      />
    );

    // Verify headers
    expect(screen.getByText('Side-by-Side Detailed Benchmark Matrix')).toBeInTheDocument();
    expect(screen.getByText('Comparison Metric')).toBeInTheDocument();
    expect(screen.getByText('Andheri East Gym')).toBeInTheDocument();
    expect(screen.getByText('Bandra West Gym')).toBeInTheDocument();

    // Verify financial metrics
    expect(screen.getByText('Monthly Collections')).toBeInTheDocument();
    expect(screen.getByText('Operating Expenses')).toBeInTheDocument();
    expect(screen.getByText('Net Operating Profit')).toBeInTheDocument();
    expect(screen.getByText('INR 1,85,000')).toBeInTheDocument();

    // Verify operational metrics
    expect(screen.getByText('Active Members')).toBeInTheDocument();
    expect(screen.getByText('420 Members')).toBeInTheDocument();
    expect(screen.getByText('310 Members')).toBeInTheDocument();
  });

  it('filters to only financial rows when metricFilter is "financial"', () => {
    render(
      <AdminGymsComparisonTable
        branches={mockBranches}
        metricFilter="financial"
        formatCurrency={formatCurrency}
      />
    );

    expect(screen.getByText('Monthly Collections')).toBeInTheDocument();
    expect(screen.getByText('Net Operating Profit')).toBeInTheDocument();
    expect(screen.queryByText('Active Members')).not.toBeInTheDocument();
    expect(screen.queryByText('Equipments Tracked')).not.toBeInTheDocument();
  });

  it('filters to only operations rows when metricFilter is "operations"', () => {
    render(
      <AdminGymsComparisonTable
        branches={mockBranches}
        metricFilter="operations"
        formatCurrency={formatCurrency}
      />
    );

    expect(screen.queryByText('Monthly Collections')).not.toBeInTheDocument();
    expect(screen.queryByText('Net Operating Profit')).not.toBeInTheDocument();
    expect(screen.getByText('Active Members')).toBeInTheDocument();
    expect(screen.getByText('Equipments Tracked')).toBeInTheDocument();
    expect(screen.getByText('Occupancy vs Capacity')).toBeInTheDocument();
  });
});
