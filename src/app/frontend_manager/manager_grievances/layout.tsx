// RESPONSIBILITY: Preserves the Tier3 Grievance domain boundary; business behavior stays in `grievance_resolution/`.
import type { ReactNode } from 'react';

export default function ManagerGrievanceDomainLayout({ children }: { children: ReactNode }) {
  return <section aria-label="Manager Grievance domain" className="min-h-full">{children}</section>;
}
