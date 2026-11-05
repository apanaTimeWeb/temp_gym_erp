import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('member attendance typed confirmation lifecycle', () => {
  it('remounts the confirmation modal for a new request', () => {
    const source = readFileSync(join(__dirname, '../components/TrainerOperationsMemberAttendanceTrainerInfrastructureConfirmProvider.tsx'), 'utf8');
    expect(source).toContain('key={confirmationSequence}');
    expect(source).toContain('resolverRef.current?.(false)');
  });
});
