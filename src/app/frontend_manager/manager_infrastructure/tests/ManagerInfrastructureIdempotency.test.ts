import { describe, expect, it, vi } from 'vitest';

import { ManagerInfrastructureIdempotency, managerIdempotencyHeaders } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';


describe('ManagerIdempotency', () => {
  it('creates a UUID using the runtime crypto implementation', () => {
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => '11111111-1111-4111-8111-111111111111') });
    expect(ManagerInfrastructureIdempotency()).toBe('11111111-1111-4111-8111-111111111111');
  });

  it('preserves the exact key when building the transport header', () => {
    expect(managerIdempotencyHeaders('key-123')).toEqual({ 'Idempotency-Key': 'key-123' });
  });
});
