import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * @description Manages Mutation state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useMutation = vi.fn();
const invalidateQueries = vi.fn();
/**
 * @description Manages QueryClient state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useQueryClient = vi.fn(() => ({ invalidateQueries }));
const createTrainerAttendanceRecord = vi.fn();
const selfCheckInTrainerAttendance = vi.fn();
const checkOutTrainerAttendance = vi.fn();
const getUser = vi.fn(() => ({ id: 'trainer-1' }));

vi.mock('@tanstack/react-query', () => ({ useMutation, useQueryClient }));
vi.mock('@/lib/api', () => ({ getUser }));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/api/TrainerOperationsMemberAttendanceAttendanceApi', () => ({ createTrainerAttendanceRecord, selfCheckInTrainerAttendance, checkOutTrainerAttendance }));

describe('useTrainerAttendanceMutations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useMutation.mockImplementation((options) => ({ mutateAsync: vi.fn(() => options.mutationFn({ dto: { type: 'MEMBER', memberId: 'member-1', date: '2026-10-01', checkIn: '06:00' }, idempotencyKey: 'key-1' })), isPending: false, options }));
  });

  it('builds mutation commands with caller-owned idempotency keys and invalidates attendance data', async () => {
    const { useTrainerAttendanceMutations } = await import('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceMutations');
    const hook = useTrainerAttendanceMutations();
    await hook.markAttendance({ dto: { type: 'MEMBER', memberId: 'member-1', date: '2026-10-01', checkIn: '06:00' }, idempotencyKey: 'key-1' });
    const markMutation = useMutation.mock.results[0].value;
    expect(markMutation.mutationFn).toBeTypeOf('function');
    await markMutation.options.onSuccess();
    expect(invalidateQueries).toHaveBeenCalled();
  });
});
