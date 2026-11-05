// RESPONSIBILITY: Prop contract for the migration status badge.
import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations.types';
export interface SuperadminMigrationStatusBadgeProps { status: MigrationLog['status']; }
