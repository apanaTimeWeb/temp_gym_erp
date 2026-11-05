// RESPONSIBILITY: Avoids reusing blacklist mutation idempotency keys for opposite actions.
// DATA FLOW: current row state → explicit action tuple → feature-local retry-key map.
export const adminBlacklistToggleIntent = (id: string, action: 'restore' | 'blacklist'): string =>
  JSON.stringify(['toggle-blacklist', id, action]);
