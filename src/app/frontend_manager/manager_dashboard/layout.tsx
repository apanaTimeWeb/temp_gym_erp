// RESPONSIBILITY: Keeps the historical Dashboard route at the Tier3 boundary; the overview leaf owns all business UI.
import type { ReactNode } from 'react';

export default function ManagerDashboardOverviewDomainLayout({ children }: { children: ReactNode }) {
  return <section aria-label="Manager Dashboard domain" className="min-h-full">{children}</section>;
}
