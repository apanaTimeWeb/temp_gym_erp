// RESPONSIBILITY: Preserves the Tier3 Attendance domain boundary; business behavior stays in `attendance_tracking/`.
import type { ReactNode } from 'react';

export default function ManagerAttendanceDomainLayout({ children }: { children: ReactNode }) {
  return <section aria-label="Manager Attendance domain" className="min-h-full">{children}</section>;
}
