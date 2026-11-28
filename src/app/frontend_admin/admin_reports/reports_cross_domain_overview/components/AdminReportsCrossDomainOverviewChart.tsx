"use client";
// RESPONSIBILITY: Renders the multi-month interactive visual comparison chart for Admin cross-domain reports.

interface MonthlyTrend {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  checkIns: number;
  newMembers: number;
  netGrowth: number;
}

interface AdminReportsCrossDomainOverviewChartProps {
  activeChartTab: 'financial' | 'attendance' | 'growth';
  monthlyTrends: MonthlyTrend[];
}

export default function AdminReportsCrossDomainOverviewChart({
  activeChartTab,
  monthlyTrends,
}: AdminReportsCrossDomainOverviewChartProps) {
  const maxRevenueVal = Math.max(...monthlyTrends.map((m) => Math.max(m.revenue, m.expenses, m.profit)));
  const maxCheckIns = Math.max(...monthlyTrends.map((m) => m.checkIns));
  const maxGrowth = Math.max(...monthlyTrends.map((m) => Math.max(m.newMembers, m.netGrowth)));

  return (
    <div className="rounded-xl border border-border bg-surface-highlight p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-text-primary">
            {activeChartTab === 'financial' && 'Monthly Revenue vs Expenses vs Net Profit (Last 6 Months)'}
            {activeChartTab === 'attendance' && 'Total Member & Staff Check-Ins (Last 6 Months)'}
            {activeChartTab === 'growth' && 'New Member Enrollments vs Net Member Growth (Last 6 Months)'}
          </p>
          <p className="text-xs text-secondary">
            {activeChartTab === 'financial' && 'Figures shown in Thousands INR (₹K) with comparative operating margins'}
            {activeChartTab === 'attendance' && 'Combined barcode and manual check-in volume logged across all gym gates'}
            {activeChartTab === 'growth' && 'Net monthly addition after factoring voluntary freezes and scheduled expirations'}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {activeChartTab === 'financial' && (
            <>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-success inline-block" /> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-danger inline-block" /> Expenses</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Net Profit</span>
            </>
          )}
          {activeChartTab === 'attendance' && (
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-info inline-block" /> Total Check-Ins</span>
          )}
          {activeChartTab === 'growth' && (
            <>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary inline-block" /> New Enrolls</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-success inline-block" /> Net Growth</span>
            </>
          )}
        </div>
      </div>

      <div className="h-56 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-border">
        {monthlyTrends.map((item) => {
          if (activeChartTab === 'financial') {
            const revHeight = Math.round((item.revenue / maxRevenueVal) * 100);
            const expHeight = Math.round((item.expenses / maxRevenueVal) * 100);
            const profHeight = Math.round((item.profit / maxRevenueVal) * 100);
            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full max-w-16 flex items-end justify-center gap-1 h-full">
                  <div
                    className="w-1/3 rounded-t-md bg-success motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                    style={{ height: `${revHeight}%` }}
                    title={`${item.month}: Revenue ₹${item.revenue}K`}
                  />
                  <div
                    className="w-1/3 rounded-t-md bg-danger motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                    style={{ height: `${expHeight}%` }}
                    title={`${item.month}: Expenses ₹${item.expenses}K`}
                  />
                  <div
                    className="w-1/3 rounded-t-md bg-primary motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                    style={{ height: `${profHeight}%` }}
                    title={`${item.month}: Profit ₹${item.profit}K`}
                  />
                </div>
                <span className="text-xs font-semibold text-secondary">{item.month}</span>
              </div>
            );
          }

          if (activeChartTab === 'attendance') {
            const height = Math.round((item.checkIns / maxCheckIns) * 100);
            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-xs font-bold text-text-primary group-hover:opacity-100 opacity-80">{item.checkIns.toLocaleString()}</span>
                <div className="w-full max-w-14 flex items-end justify-center h-full">
                  <div
                    className="w-full rounded-t-md bg-info motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                    style={{ height: `${height}%` }}
                    title={`${item.month}: ${item.checkIns} check-ins`}
                  />
                </div>
                <span className="text-xs font-semibold text-secondary">{item.month}</span>
              </div>
            );
          }

          const newHeight = Math.round((item.newMembers / maxGrowth) * 100);
          const netHeight = Math.round((item.netGrowth / maxGrowth) * 100);
          return (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="w-full max-w-14 flex items-end justify-center gap-1.5 h-full">
                <div
                  className="w-1/2 rounded-t-md bg-primary motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                  style={{ height: `${newHeight}%` }}
                  title={`${item.month}: +${item.newMembers} New Members`}
                />
                <div
                  className="w-1/2 rounded-t-md bg-success motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                  style={{ height: `${netHeight}%` }}
                  title={`${item.month}: +${item.netGrowth} Net Growth`}
                />
              </div>
              <span className="text-xs font-semibold text-secondary">{item.month}</span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs text-secondary pt-1">
        <span>May 2026</span>
        <span>Jun 2026</span>
        <span>Jul 2026</span>
        <span>Aug 2026</span>
        <span>Sep 2026</span>
        <span className="font-bold text-text-primary">Oct 2026 (Current)</span>
      </div>
    </div>
  );
}
