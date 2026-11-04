// RESPONSIBILITY: Prove the standalone Ghost restoration harness drives real cookie-only route behavior.
import { describe, expect, it } from 'vitest';
import { runGhostRestoreScenario } from './harness/bootstrap';

describe('Standalone Ghost Restoration harness', () => {
  it('returns unauthorized without an original stashed session', async () => {
    const response = await runGhostRestoreScenario('missing-original');
    expect(response.status).toBe(401);
    expect((await response.json()).data).toBeNull();
  });
  it('restores and clears the original-session cookies from fixture inputs', async () => {
    const response = await runGhostRestoreScenario('original-present');
    expect(response.status).toBe(200);
    expect(response.cookies.get('gymsmart_token')?.value).toBe('test-original-access');
    expect(response.cookies.get('gymsmart_ghost_original_access_token')?.value).toBe('');
  });
  it('rejects a request missing a UUIDv4 key', async () => {
    const response = await runGhostRestoreScenario('original-present', { idempotencyKey: null });
    expect(response.status).toBe(400);
    expect(response.headers.get('set-cookie')).toBeNull();
  });
});
