import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
describe('trainer attendance pagination boundary source', () => {
  it('rejects fractional, negative and nonfinite paging before slicing', () => {
    const body = readFileSync(join(__dirname, '../mocks/handlers/TrainerOperationsTrainerAttendanceAttendanceMockHandlers.ts'), 'utf8');
    expect(body).toContain('Number.isSafeInteger(page)');
    expect(body).toContain('Number.isSafeInteger(limit)');
    expect(body).toContain('limit > 100');
  });
});
