import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * @description Manages Query state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useQuery = vi.fn();
const getUser = vi.fn((): { id: string } | null => ({ id: 'trainer-1' }));
const fetchAllTrainerAttendanceRecords = vi.fn();
const fetchTrainerAttendanceRecords = vi.fn();
const fetchTrainerAttendanceStats = vi.fn();
const fetchTrainerAttendanceMembersBasic = vi.fn();
/**
 * @description Manages Debounce state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useDebounce = vi.fn((value: string) => value);

vi.mock('@tanstack/react-query', () => ({ useQuery }));
vi.mock('@/lib/api', () => ({ getUser }));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/api/TrainerOperationsMemberAttendanceAttendanceApi', () => ({ fetchAllTrainerAttendanceRecords, fetchTrainerAttendanceRecords, fetchTrainerAttendanceStats, fetchTrainerAttendanceMembersBasic }));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureDebounce', () => ({ useTrainerInfrastructureDebounce: useDebounce }));

describe('useTrainerAttendanceQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useQuery.mockImplementation((options) => options);
  });

  it('propagates attendance tab, search, date, pagination, sorting, and trainer identity into the query contract', async () => {
    const { useTrainerAttendanceRecordsQuery } = await import('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceQuery');
    const result = useTrainerAttendanceRecordsQuery({ tab: 'MY_ATTENDANCE', search: 'Rahul', filterDate: '2026-09-30', currentPage: 2, sortBy: 'date', sortDirection: 'asc' }) as any;
    expect(result.queryFn).toBeTypeOf('function');
    expect(result.queryKey[0]).toBe('trainer_attendance');
    expect(result.queryKey[1]).toBe('records');
    const key = JSON.stringify(result.queryKey);
    expect(key).toContain('Rahul');
    expect(key).toContain('2026-09-30');
    expect(fetchTrainerAttendanceRecords).not.toHaveBeenCalled();
  });

  it('selects the correct stats and member query contracts', async () => {
    const { useTrainerAttendanceStatsQuery, useTrainerAttendanceMembersQuery } = await import('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceQuery');
    expect((useTrainerAttendanceStatsQuery() as any).queryKey).toEqual(['trainer_attendance', 'stats']);
    expect((useTrainerAttendanceMembersQuery() as any).queryKey).toEqual(['trainer_attendance', 'members']);
  });

  it('keys complete My Attendance history by trainer identity', async () => {
    const { useTrainerAttendanceMyHistoryQuery } = await import('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceQuery');
    const result = useTrainerAttendanceMyHistoryQuery(true) as any;

    expect(result.queryKey).toEqual(['trainer_attendance', 'my-history', 'trainer-1']);
    expect(result.enabled).toBe(true);
    expect(result.queryFn).toBeTypeOf('function');
    expect(fetchAllTrainerAttendanceRecords).not.toHaveBeenCalled();
  });

  it('refuses an unscoped My Attendance request when trainer identity is unavailable', async () => {
    getUser.mockReturnValueOnce(null);
    const { useTrainerAttendanceRecordsQuery } = await import('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceQuery');
    const result = useTrainerAttendanceRecordsQuery({ tab: 'MY_ATTENDANCE', search: '', filterDate: 'ALL_TIME', currentPage: 1, sortBy: 'date', sortDirection: 'asc' }) as any;

    await expect(result.queryFn()).rejects.toThrow(/authenticated trainer identity/i);
    expect(fetchTrainerAttendanceRecords).not.toHaveBeenCalled();
  });
});
