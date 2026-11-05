import type { MigrationStatusSchema, MigrationLogSchema, SuperadminMigrationsTenantSchema, SchemaMigrationSchema, MigrationsPageDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/schemas/superadmin_system_ops_migrations.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines types and interfaces for the Superadmin Migrations (Schema Rollouts) module.
export type MigrationStatus = ZodInfer<typeof MigrationStatusSchema>;
export type MigrationLog = ZodInfer<typeof MigrationLogSchema>;
export type SuperadminMigrationsTenant = ZodInfer<typeof SuperadminMigrationsTenantSchema>;
export type SchemaMigration = ZodInfer<typeof SchemaMigrationSchema>;
export type MigrationsPageData = ZodInfer<typeof MigrationsPageDataSchema>;
