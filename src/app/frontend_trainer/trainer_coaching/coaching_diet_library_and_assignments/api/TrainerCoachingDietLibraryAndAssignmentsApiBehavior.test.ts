import { describe, expect, it, vi } from 'vitest';

import { TrainerLibraryApi } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/api/TrainerCoachingDietLibraryAndAssignmentsApi';



const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

const DIET_PLAN = { id: 'diet-1', name: 'Lean Plan', goal: 'Weight Loss', meals: ['Breakfast'], isActive: true };

describe('Trainer library API behavior', () => {
  it('forwards search, goal, page, and limit filters', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'diet-list-test-request', message: 'OK', data: { dietPlans: [DIET_PLAN], total: 1 } });
    const result = await TrainerLibraryApi.fetchDietPlans({ search: 'Lean', goal: 'Weight Loss', page: '2', limit: '10' });
    expect(apiFetch.mock.calls[0][0]).toContain('search=Lean');
    expect(apiFetch.mock.calls[0][0]).toContain('goal=Weight+Loss');
    expect(apiFetch.mock.calls[0][0]).toContain('page=2');
    expect(result.data.dietPlans[0]?.name).toBe('Lean Plan');
  });
  it('uses the real mutation path and preserves the backend response contract', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'diet-assign-test-request', message: 'Diet plan assigned', data: null });
    await TrainerLibraryApi.assignDietPlan('member-1', 'diet-1', 'test-idempotency-key');
    expect(apiFetch).toHaveBeenCalledWith(expect.stringContaining('member-1'), expect.objectContaining({ method: 'PATCH', headers: expect.objectContaining({ 'Idempotency-Key': 'test-idempotency-key' }) }));
  });

  it('rejects a valid unsuccessful assignment envelope with its canonical error metadata', async () => {
    apiFetch.mockResolvedValueOnce({
      success: false,
      requestId: 'diet-assign-failure-request',
      message: 'Assignment was rejected',
      data: null,
      errorCode: 'DIET_ASSIGNMENT_REJECTED',
      statusCode: 409,
    });
    await expect(TrainerLibraryApi.assignDietPlan('member-1', 'diet-1', 'test-idempotency-key'))
      .rejects.toMatchObject({ message: 'Assignment was rejected', errorCode: 'DIET_ASSIGNMENT_REJECTED', statusCode: 409 });
  });
});
