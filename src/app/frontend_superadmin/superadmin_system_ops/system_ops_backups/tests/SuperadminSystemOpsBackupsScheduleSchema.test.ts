import { describe, expect, it } from 'vitest';

import { isSuperadminBackupsCronExpressionValid, SuperadminBackupsScheduleInputSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_schedule.schemas';

describe('isSuperadminBackupsCronExpressionValid', () => {
  it.each(['0 2 * * *', '*/15 8-17 * * 1-5', '0,30 2 * * 0,6'])('accepts supported five-field cron %s', (expression) => {
    expect(isSuperadminBackupsCronExpressionValid(expression)).toBe(true);
  });

  it.each(['', '* * * *', '99 2 * * *', '0 24 * * *', '0 2 * 13 *', '0 2 * * 9', '0 2 * * *; rm -rf /', '*/0 2 * * *', '5,,10 2 * * *'])('rejects malformed cron %s', (expression) => {
    expect(isSuperadminBackupsCronExpressionValid(expression)).toBe(false);
  });

  it('rejects malformed cron before submitting the schedule form', () => {
    expect(SuperadminBackupsScheduleInputSchema.safeParse({ cronExpression: 'not-a-cron', retentionDays: 30 }).success).toBe(false);
  });
});
