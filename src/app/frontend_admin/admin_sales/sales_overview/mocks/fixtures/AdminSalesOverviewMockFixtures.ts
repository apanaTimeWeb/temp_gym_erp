// RESPONSIBILITY: Source-derived fixtures for Sales Overview endpoints only.
export const MOCK_ADMIN_SALES_OVERVIEW: OverviewDataPoint[] = [
  { date: '2026-01-01', newMembers: 8, revenue: 9000 },
  { date: '2026-02-01', newMembers: 9, revenue: 10000 },
  { date: '2026-03-01', newMembers: 10, revenue: 11000 },
  { date: '2026-04-01', newMembers: 11, revenue: 12000 },
  { date: '2026-05-01', newMembers: 11, revenue: 12500 },
  { date: '2026-06-01', newMembers: 12, revenue: 13000 },
  { date: '2026-07-01', newMembers: 12, revenue: 13500 },
  { date: '2026-08-01', newMembers: 13, revenue: 14000 },
  { date: '2026-09-01', newMembers: 13, revenue: 14500 },
  { date: '2026-10-01', newMembers: 18, revenue: 20500 },
  { date: '2026-10-02', newMembers: 19, revenue: 25000 },
  { date: '2026-10-02', newMembers: 19, revenue: 25000 },
  { date: '2026-10-03', newMembers: 15, revenue: 18000 },
  { date: '2026-10-04', newMembers: 26, revenue: 32000 },
  { date: '2026-10-05', newMembers: 18, revenue: 22000 },
  { date: '2026-10-06', newMembers: 34, revenue: 45000 },
  { date: '2026-10-07', newMembers: 29, revenue: 38000 },
];

export const MOCK_ADMIN_SALES_REFERRALS = [
  { source: 'Instagram', revenue: 45000 },
  { source: 'Google Ads', revenue: 65000 },
  { source: 'Word of Mouth', revenue: 25000 },
  { source: 'Walk-in', revenue: 15000 },
] as const;
