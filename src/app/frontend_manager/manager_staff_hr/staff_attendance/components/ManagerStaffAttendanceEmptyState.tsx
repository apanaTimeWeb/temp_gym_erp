// RESPONSIBILITY: Renders the Staff Attendance no-records state; it does not own attendance filtering or query state.
import { CalendarDays } from 'lucide-react';

export default function ManagerStaffAttendanceEmptyState({ message }: { message: string }) {
  return <div data-testid="manager_hr-managerhrattendancehistory-empty-state" role="status" aria-live="polite" className="p-10 text-center text-text-secondary"><CalendarDays size={18} strokeWidth={2} aria-hidden="true" className="mx-auto mb-2 opacity-40" />{message}</div>;
}
