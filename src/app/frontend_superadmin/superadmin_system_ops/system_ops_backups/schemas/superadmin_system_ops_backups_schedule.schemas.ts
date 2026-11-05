/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsBackupsScheduleSchema owned by the superadmin_system_ops_backups feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

const SUPERADMIN_BACKUPS_CRON_FIELD_RANGES = [
  [0, 59],
  [0, 23],
  [1, 31],
  [1, 12],
  [0, 7],
] as const;

/** Validates the supported numeric, five-field cron subset before allowing a schedule mutation. */
export function isSuperadminBackupsCronExpressionValid(expression: string): boolean {
  const fields = expression.trim().split(/\s+/);
  if (fields.length !== 5) return false;

  return fields.every((field, fieldIndex) => {
    if (!field || !/^[0-9*/,-]+$/.test(field)) return false;
    const rangeBounds = SUPERADMIN_BACKUPS_CRON_FIELD_RANGES[fieldIndex];
    if (!rangeBounds) return false;
    const [minimum, maximum] = rangeBounds;
    return field.split(',').every((part) => {
      if (!part) return false;
      const [base, step, ...extra] = part.split('/');
      if (extra.length > 0 || (step !== undefined && (!/^\d+$/.test(step) || Number(step) < 1))) return false;
      if (!base) return false;
      if (base === '*') return true;
      if (base.includes('-')) {
        const range = base.split('-');
        if (range.length !== 2 || !range.every((value) => /^\d+$/.test(value))) return false;
        const start = Number(range[0]);
        const end = Number(range[1]);
        return start >= minimum && end <= maximum && start <= end;
      }
      if (!/^\d+$/.test(base)) return false;
      const value = Number(base);
      return value >= minimum && value <= maximum;
    });
  });
}

export const SuperadminSystemOpsBackupsScheduleSchema = z.object({
  cronExpression: z.string().min(1),
  retentionDays: z.number().int().min(1).max(365),
  updatedAt: z.string(),
});

export const SuperadminBackupsScheduleInputSchema = z.object({
  cronExpression: z.string().trim().min(1, 'validation.cron_required').refine(isSuperadminBackupsCronExpressionValid, 'validation.cron_invalid'),
  retentionDays: z.number().int().min(1, 'validation.retention_min').max(365, 'validation.retention_max'),
});
