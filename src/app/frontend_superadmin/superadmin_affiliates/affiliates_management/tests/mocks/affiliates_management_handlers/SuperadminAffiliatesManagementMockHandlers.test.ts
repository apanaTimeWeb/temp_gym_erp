import { setupServer } from 'msw/node';
import { expect, beforeEach, beforeAll, afterAll, describe, it } from 'vitest';

import { SUPERADMIN_AFFILIATES_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/config/superadmin_affiliates_management.url_config';
import { resetSuperadminAffiliatesMockState, superadminAffiliatesHandlers } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/mocks/handlers/SuperadminAffiliatesManagementMockHandlers';


const server = setupServer(...superadminAffiliatesHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminAffiliatesMockState());

describe('Superadmin Affiliates MSW integration', () => {
  it('exposes a real second page at the default page size without overlapping records', async () => {
    const pageOneResponse = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE}?page=1&limit=10`);
    const pageOne = await pageOneResponse.json();
    const pageTwoResponse = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE}?page=2&limit=10`);
    const pageTwo = await pageTwoResponse.json();

    expect(pageOneResponse.ok).toBe(true);
    expect(pageTwoResponse.ok).toBe(true);
    expect(pageOne.meta.totalPages).toBeGreaterThan(1);
    expect(pageOne.data).toHaveLength(10);
    expect(pageTwo.data).toHaveLength(2);
    expect(pageOne.data.map((item: { id: string }) => item.id).filter((id: string) => pageTwo.data.some((item: { id: string }) => item.id === id))).toEqual([]);
  });

  it('creates an affiliate and makes it visible in the next list query', async () => {
    const payload = { name: 'Integration Affiliate', email: 'integration@affiliate.test', referralCode: 'INT001' };
    const createResponse = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'affiliate-create-1' },
      body: JSON.stringify(payload),
    });
    expect(createResponse.ok).toBe(true);
    const created = await createResponse.json();
    expect(created.data).toMatchObject(payload);

    const listResponse = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE}?search=Integration%20Affiliate&page=1&limit=10`);
    const listed = await listResponse.json();
    expect(listed.data).toHaveLength(1);
    expect(listed.data[0]).toMatchObject(payload);
  });

  it('uses a valid default page when pagination parameters are invalid', async () => {
    const response = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE}?page=-2&limit=0`);
    const result = await response.json();

    expect(response.ok).toBe(true);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(10);
    expect(result.data).toHaveLength(10);
  });

  it('rejects unsupported affiliate statuses without changing the record', async () => {
    const response = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE}/a1/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'SUSPENDED' }),
    });
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.success).toBe(false);

    const listResponse = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE}?search=John%20Doe`);
    const listed = await listResponse.json();
    expect(listed.data[0].status).toBe('ACTIVE');
  });

  it('returns not-found for deletion of an unknown affiliate', async () => {
    const response = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE}/missing-affiliate`, { method: 'DELETE' });
    const result = await response.json();

    expect(response.status).toBe(404);
    expect(result).toMatchObject({ success: false, data: null });
  });

  it('rejects payout when the affiliate has no pending payout', async () => {
    const response = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_MANAGEMENT_API.BASE}/a2/pay`, { method: 'POST' });
    const result = await response.json();

    expect(response.status).toBe(409);
    expect(result).toMatchObject({ success: false, data: null });
  });

});
