// RESPONSIBILITY: Renders a trainer-schedule-local status or alert message with severity styling and a caller-owned dismiss action; it does not persist notifications or schedule training sessions.
import type { ManagerToastType } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/ManagerTrainerScheduleLocalToastTypes';

type ManagerLocalToastProps = { message: string; type: ManagerToastType; onClose: () => void; 'data-testid'?: string };
const tone: Record<ManagerToastType, string> = { success: 'border-success bg-success-bg text-text-primary', error: 'border-danger bg-danger-bg text-text-primary', warning: 'border-warning bg-warning-bg text-text-primary', info: 'border-info bg-info-bg text-text-primary' };
export default function ManagerTrainerScheduleLocalToast({ message, type, onClose, 'data-testid': testId }: ManagerLocalToastProps) {
  if (!message.trim()) return null;
  return <div data-testid={testId} role={type === 'error' ? 'alert' : 'status'} aria-live={type === 'error' ? 'assertive' : 'polite'} className={`flex items-start justify-between gap-3 rounded-md border p-3 text-sm shadow-sm ${tone[type]}`}><span>{message}</span><button type="button" onClick={onClose} aria-label="Dismiss notification" className="rounded px-2 py-1 hover:opacity-70 focus-visible:outline focus-visible:outline-2" data-testid="manager_manager_schedule_personal_training-trainer-schedule-local-toast-button-dismiss">×</button></div>;
}
