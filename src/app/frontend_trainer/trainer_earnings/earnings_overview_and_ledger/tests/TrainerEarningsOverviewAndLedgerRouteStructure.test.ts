import { describe, expect, it } from 'vitest';
import { moduleMockNamespace } from './harness/bootstrap';
describe('earnings_overview_and_ledger module boundary', () => {
 it('owns a unique module-local mock namespace', () => { expect(moduleMockNamespace).toBe('earnings_overview_and_ledger'); });
});
