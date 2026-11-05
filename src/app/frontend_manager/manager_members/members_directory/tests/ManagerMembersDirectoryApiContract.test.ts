import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiFetch } from '@/lib/api';

import { ManagerMembersDirectoryApi } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.api';

vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));

describe('ManagerMembersDirectoryApi request contract coverage', () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
    vi.mocked(apiFetch).mockResolvedValue({ success: true, message: 'ok', data: null } as never);
  });

  it('routes all 17 declared API methods to the module URL registry', async () => {
    await ManagerMembersDirectoryApi.fetchMembers({ page: '2', limit: '25' });
    await ManagerMembersDirectoryApi.fetchMemberById('member / one');
    await ManagerMembersDirectoryApi.fetchMemberStats();
    await ManagerMembersDirectoryApi.createMember({ name: 'New member' }, 'idem-create');
    await ManagerMembersDirectoryApi.updateMember('member-2', { status: 'ACTIVE' }, 'idem-update');
    await ManagerMembersDirectoryApi.deleteMember('member-3', 'idem-delete');
    await ManagerMembersDirectoryApi.renewMember('member-4', { planId: 'plan-1' }, 'idem-renew');
    await ManagerMembersDirectoryApi.fetchMemberTrainers();
    await ManagerMembersDirectoryApi.fetchMemberPlans();
    await ManagerMembersDirectoryApi.fetchMemberPayments('member-5');
    await ManagerMembersDirectoryApi.createMemberPayment('member-5', { amount: 12345, paidAt: new Date('2026-01-01T00:00:00.000Z'), method: 'UPI' }, 'idem-payment');
    await ManagerMembersDirectoryApi.fetchMemberAttendance('member-5');
    await ManagerMembersDirectoryApi.fetchMemberDietPlans();
    await ManagerMembersDirectoryApi.assignDietPlan('member-6', 'diet-1', 'idem-diet');
    await ManagerMembersDirectoryApi.fetchMemberWorkouts();
    await ManagerMembersDirectoryApi.assignWorkout('member-7', 'workout-1', 'idem-workout');
    await ManagerMembersDirectoryApi.exportMembersReport({ status: 'ACTIVE' });

    const calls = vi.mocked(apiFetch).mock.calls;
    expect(calls.map(([url]) => url)).toEqual([
      '/api/v1/manager/members?page=2&limit=25',
      '/api/v1/manager/members/member%20%2F%20one',
      '/api/v1/manager/members/stats',
      '/api/v1/manager/members',
      '/api/v1/manager/members/member-2',
      '/api/v1/manager/members/member-3',
      '/api/v1/manager/members/member-4/renew',
      '/api/v1/manager/members/trainers',
      '/api/v1/manager/members/plans',
      '/api/v1/manager/members/member-5/payments',
      '/api/v1/manager/members/member-5/payments',
      '/api/v1/manager/members/member-5/attendance',
      '/api/v1/manager/members/diet-plans',
      '/api/v1/manager/members/member-6/diet-plans',
      '/api/v1/manager/members/workouts',
      '/api/v1/manager/members/member-7/workouts',
      '/api/v1/manager/members/export?status=ACTIVE&page=1&limit=1000',
    ]);
    expect(calls.every(([, options]) => Boolean(options && typeof options === 'object' && 'dataSchema' in options))).toBe(true);
  });

  it('sends idempotency keys with every supported write and serializes Date values as ISO text', async () => {
    const paidAt = new Date('2026-01-01T00:00:00.000Z');
    await ManagerMembersDirectoryApi.createMember({ name: 'New member' }, 'idem-create');
    await ManagerMembersDirectoryApi.updateMember('member-1', { status: 'ACTIVE' }, 'idem-update');
    await ManagerMembersDirectoryApi.deleteMember('member-1', 'idem-delete');
    await ManagerMembersDirectoryApi.renewMember('member-1', { planId: 'plan-1' }, 'idem-renew');
    await ManagerMembersDirectoryApi.createMemberPayment('member-1', { amount: 500, paidAt, method: 'UPI' }, 'idem-payment');
    await ManagerMembersDirectoryApi.assignDietPlan('member-1', 'diet-1', 'idem-diet');
    await ManagerMembersDirectoryApi.assignWorkout('member-1', 'workout-1', 'idem-workout');

    for (const [, options] of vi.mocked(apiFetch).mock.calls) {
      const method = options && typeof options === 'object' && 'method' in options ? options.method : undefined;
      if (method === 'POST' || method === 'PATCH' || method === 'DELETE') {
        const headers = (options as { headers?: Record<string, string> }).headers;
        expect(headers?.['Idempotency-Key']).toMatch(/^idem-/);
      }
    }
    const paymentCall = vi.mocked(apiFetch).mock.calls.find(([url, options]) => url.endsWith('/member-1/payments') && options?.method === 'POST');
    expect(paymentCall).toBeDefined();
    expect(JSON.parse((paymentCall?.[1] as { body: string }).body)).toMatchObject({ paidAt: paidAt.toISOString(), amount: 500, method: 'UPI' });
  });
});
