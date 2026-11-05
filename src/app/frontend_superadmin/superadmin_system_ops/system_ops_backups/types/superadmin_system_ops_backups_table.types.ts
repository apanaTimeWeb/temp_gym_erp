// RESPONSIBILITY: Type contract extracted from SuperadminSystemOpsBackupsTable.tsx; no business behavior.
import type { BackupRecord } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups.types';

export interface SuperadminBackupsTableProps {
    paginatedBackups: BackupRecord[];
    filteredLength: number;
    handleDownload: (id: string) => void | Promise<void>;
    handleRestoreClick: (backup: BackupRecord) => void;
}
