import { toast } from 'sonner';

/** Shows a deduplicated success toast using a verified backend domain outcome message. */
export function ManagerInfrastructureShowSuccessToast(message: string, toastId: string): void {
  if (message.trim().length === 0) return;
  toast.success(message, { id: toastId });
}
