// RESPONSIBILITY: Type contract extracted from SuperadminSystemOpsBackupsRestoreModal.tsx; no business behavior.
import type { BackupRecord } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups.types';

export interface SuperadminBackupsRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBackup: BackupRecord | null;
  restoreConfirmText: string;
  setRestoreConfirmText: (value: string) => void;
}
