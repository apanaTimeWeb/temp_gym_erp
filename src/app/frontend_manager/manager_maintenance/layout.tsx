// RESPONSIBILITY: Preserves the Tier3 Maintenance domain boundary; business behavior stays in `maintenance_requests/`.
import type { ReactNode } from 'react';

export default function ManagerMaintenanceDomainLayout({ children }: { children: ReactNode }) {
  return <section aria-label="Manager Maintenance domain" className="min-h-full">{children}</section>;
}
