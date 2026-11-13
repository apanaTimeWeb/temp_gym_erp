'use client';

import { useTranslations } from 'next-intl';
import { Target, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

interface BenchmarkMetric {
  title: string;
  target: string;
  actual: string;
  percentage: number;
  status: 'EXCEEDED' | 'ON_TRACK' | 'NEEDS_ATTENTION';
  delta: string;
}

const BENCHMARKS: BenchmarkMetric[] = [
  {
    title: 'Monthly Revenue',
    target: '₹15,00,000',
    actual: '₹15,60,000',
    percentage: 104,
    status: 'EXCEEDED',
    delta: '+4.0% vs target',
  },
  {
    title: 'Active Gym Members',
    target: '400 members',
    actual: '420 members',
    percentage: 105,
    status: 'EXCEEDED',
    delta: '+20 members',
  },
  {
    title: 'Daily Member Attendance',
    target: '70% avg',
    actual: '74.2% avg',
    percentage: 106,
    status: 'EXCEEDED',
    delta: '+4.2% higher',
  },
  {
    title: 'Trainer Session Utilization',
    target: '85% capacity',
    actual: '92% capacity',
    percentage: 108,
    status: 'EXCEEDED',
    delta: '+7.0% efficiency',
  },
  {
    title: 'Member Retention Rate',
    target: '95.0%',
    actual: '97.5%',
    percentage: 102.6,
    status: 'EXCEEDED',
    delta: '+2.5% retention',
  },
  {
    title: 'Inquiry to Member Conversion',
    target: '30.0%',
    actual: '34.8%',
    percentage: 116,
    status: 'EXCEEDED',
    delta: '+4.8% conversion',
  },
];

export function ManagerReportsOverviewBenchmarkingChart() {
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Target size={18} className="text-primary" />
            <span>Branch Performance Benchmarking (Target vs Actual)</span>
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Side-by-side performance benchmarking across key branch operational targets
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-success-bg border border-success/30 rounded-lg text-xs font-semibold text-success-text">
          <Award size={14} />
          <span>Branch Grade: A+ (107% Avg Target Score)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BENCHMARKS.map((metric) => (
          <div
            key={metric.title}
            className="p-4 bg-input/50 border border-border rounded-xl space-y-3 hover:border-primary/40 transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                {metric.title}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-success-text bg-success-bg px-2 py-0.5 rounded-md">
                <TrendingUp size={12} />
                {metric.delta}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xl font-bold text-text-primary">{metric.actual}</p>
                <p className="text-xs text-text-secondary">Target: {metric.target}</p>
              </div>
              <span className="text-sm font-extrabold text-primary">{metric.percentage}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-input rounded-full h-2 overflow-hidden border border-border/50">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, metric.percentage)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerReportsOverviewBenchmarkingChart;

