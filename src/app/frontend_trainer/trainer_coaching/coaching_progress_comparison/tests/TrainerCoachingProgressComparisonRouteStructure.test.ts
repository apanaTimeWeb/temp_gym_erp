import { describe, expect, it } from 'vitest';
import { moduleMockNamespace } from './harness/bootstrap';
describe('coaching_progress_comparison module boundary', () => {
 it('owns a unique module-local mock namespace', () => { expect(moduleMockNamespace).toBe('coaching_progress_comparison'); });
});
