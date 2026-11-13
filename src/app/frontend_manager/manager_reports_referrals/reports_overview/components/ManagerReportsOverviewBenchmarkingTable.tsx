'use client';

import { CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface BranchComparisonRow {
  gymBranch: string;
  monthlyRevenue: string;
  activeMembers: number;
  attendanceRate: string;
  trainerUtilization: string;
  status: 'EXCELLING' | 'ON_TRACK' | 'ATTENTION';
}

const BRANCH_COMPARISONS: BranchComparisonRow[] = [
  {
    gymBranch: 'Andheri East (Your Branch)',
    monthlyRevenue: '₹15,60,000',
    activeMembers: 420,
    attendanceRate: '74.2%',
    trainerUtilization: '92.0%',
    status: 'EXCELLING',
  },
  {
    gymBranch: 'Bandra West (Benchmark)',
    monthlyRevenue: '₹18,20,000',
    activeMembers: 480,
    attendanceRate: '72.5%',
    trainerUtilization: '89.5%',
    status: 'EXCELLING',
  },
  {
    gymBranch: 'Powai Central',
    monthlyRevenue: '₹13,90,000',
    activeMembers: 360,
    attendanceRate: '68.0%',
    trainerUtilization: '84.0%',
    status: 'ON_TRACK',
  },
  {
    gymBranch: 'Thane West',
    monthlyRevenue: '₹11,50,000',
    activeMembers: 310,
    attendanceRate: '64.5%',
    trainerUtilization: '78.0%',
    status: 'ATTENTION',
  },
];

export function ManagerReportsOverviewBenchmarkingTable() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
      <div className="p-4 border-b border-border bg-input/20">
        <h3 className="text-sm font-bold text-text-primary">
          Side-by-Side Gym Network Performance Comparison
        </h3>
        <p className="text-xs text-text-secondary mt-0.5">
          Benchmark your branch metrics against city network averages
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-input border-b border-border font-semibold text-text-secondary uppercase tracking-wider">
              <th className="py-3 px-4">Gym Branch</th>
              <th className="py-3 px-4">Monthly Revenue</th>
              <th className="py-3 px-4">Active Members</th>
              <th className="py-3 px-4">Attendance Rate</th>
              <th className="py-3 px-4">Trainer Utilization</th>
              <th className="py-3 px-4">Network Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {BRANCH_COMPARISONS.map((branch) => {
              const isCurrent = branch.gymBranch.includes('Your Branch');
              return (
                <tr
                  key={branch.gymBranch}
                  className={`hover:bg-input/30 transition-colors ${
                    isCurrent ? 'bg-primary/5 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-text-primary flex items-center gap-2">
                    {isCurrent && <CheckCircle2 size={14} className="text-primary shrink-0" />}
                    <span>{branch.gymBranch}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-text-primary">{branch.monthlyRevenue}</td>
                  <td className="py-3 px-4 text-text-primary">{branch.activeMembers}</td>
                  <td className="py-3 px-4 text-text-primary">{branch.attendanceRate}</td>
                  <td className="py-3 px-4 text-text-primary">{branch.trainerUtilization}</td>
                  <td className="py-3 px-4">
                    {branch.status === 'EXCELLING' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-success-bg text-success-text">
                        <TrendingUp size={11} /> Top Tier
                      </span>
                    ) : branch.status === 'ON_TRACK' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-info-bg text-info-text">
                        On Target
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-warning-bg text-warning-text">
                        <AlertTriangle size={11} /> Optimization
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerReportsOverviewBenchmarkingTable;

