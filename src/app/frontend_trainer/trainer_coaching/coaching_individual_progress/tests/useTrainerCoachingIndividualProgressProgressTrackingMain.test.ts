import { act, renderHook } from '@testing-library/react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerProgressTrackingMain } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingMain';





const state = {
  activeMetric: 'weight',
  setActiveMetric: vi.fn(),
  showModal: false,
  setShowModal: vi.fn(),
  editingEntryId: null,
  setEditingEntryId: vi.fn(),
  activeComparisonMetric: 'weight',
  setActiveComparisonMetric: vi.fn(),
  selectedComparisonIds: ['member-1'],
  toggleComparisonMember: vi.fn(),
};
const setSelectedMemberId = vi.fn();
const setActiveTab = vi.fn();
const setCurrentPage = vi.fn();
const setSort = vi.fn();
const deleteEntry = vi.fn();
const createEntry = vi.fn();
const updateEntry = vi.fn();
const showSuccess = vi.fn();
const showError = vi.fn();
const begin = vi.fn((actionId: string) => `key-${actionId}`);
const clear = vi.fn();

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingFilters', () => ({
  useTrainerProgressTrackingFilters: () => ({ selectedMemberId: 'member-1', setSelectedMemberId, activeTab: 'overview', setActiveTab, currentPage: 1, setCurrentPage, sortBy: 'date', sortDirection: 'desc', setSort }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingQuery', () => ({
  useTrainerProgressTrackingMembersQuery: () => ({ data: [{ id: 'member-1', name: 'Aman' }] }),
  useTrainerProgressTrackingEntriesQuery: () => ({ data: { entries: [] } }),
  useTrainerProgressTrackingCompleteHistoryQuery: () => ({ data: { entries: [] }, isPending: false, isError: false, refetch: vi.fn() }),
  useTrainerProgressTrackingSummaryQuery: () => ({ data: null, isPending: false, isError: false, refetch: vi.fn() }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingMutations', () => ({
  useTrainerProgressTrackingMutations: () => ({ deleteEntry, createEntry, updateEntry }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingComparisonQueries', () => ({
  useTrainerProgressTrackingComparisonQueries: () => [{ data: { entries: [] } }],
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingComparisonSnapshotBuilder', () => ({
  TrainerProgressTrackingComparisonSnapshotBuilder: (id: string, name: string, entries: unknown[]) => ({ id, name, entries }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/state/useTrainerCoachingIndividualProgressProgressTrackingStore', () => ({
  useTrainerProgressTrackingStore: <T,>(selector: (value: typeof state) => T) => selector(state),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureFeedback', () => ({
  useTrainerInfrastructureFeedback: () => ({ showSuccess, showError }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureIdempotencyKey', () => ({
  useTrainerInfrastructureIdempotencyKey: () => ({ begin, clear, current: vi.fn() }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressTrainerInfrastructureUserSafeError', () => ({
  TrainerInfrastructureUserSafeError: (error: unknown) => error instanceof Error ? error.message : 'Unknown error',
}));

describe('useTrainerProgressTrackingMain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    state.editingEntryId = null;
    state.showModal = false;
    begin.mockImplementation((actionId: string) => `key-${actionId}`);
    deleteEntry.mockResolvedValue({ message: 'Entry deleted' });
    createEntry.mockResolvedValue({ message: 'Entry created' });
    updateEntry.mockResolvedValue({ message: 'Entry updated' });
  });

  it('opens add/edit modals by updating module-owned UI state', () => {
    const { result } = renderHook(() => useTrainerProgressTrackingMain());
    const entry: { id: string; memberId: string } = { id: 'entry-1', memberId: 'member-1' };

    act(() => result.current.openAddModal());
    expect(state.setEditingEntryId).toHaveBeenCalledWith(null);
    expect(state.setShowModal).toHaveBeenCalledWith(true);

    vi.clearAllMocks();
    act(() => result.current.openEditModal(entry));
    expect(state.setEditingEntryId).toHaveBeenCalledWith(entry.id);
    expect(state.setShowModal).toHaveBeenCalledWith(true);
  });

  it('creates a progress entry with an idempotency key and closes the modal after success', async () => {
    const { result } = renderHook(() => useTrainerProgressTrackingMain());
    const dto = { weight: 70, date: '2026-10-04' } as never;

    let saved!: boolean;
    await act(async () => {
      saved = await result.current.handleSave(dto);
    });

    expect(saved).toBe(true);
    expect(begin).toHaveBeenCalledWith('create-member-1');
    expect(createEntry).toHaveBeenCalledWith({ memberId: 'member-1', dto, idempotencyKey: 'key-create-member-1' });
    expect(clear).toHaveBeenCalledWith('create-member-1');
    expect(state.setShowModal).toHaveBeenCalledWith(false);
    expect(showSuccess).toHaveBeenCalledWith('Entry created', 'progress-create-member-1');
  });

  it('returns false and reports the error when deleting a progress entry fails', async () => {
    deleteEntry.mockRejectedValueOnce(new Error('Delete failed'));
    const { result } = renderHook(() => useTrainerProgressTrackingMain());

    await act(async () => {
      await result.current.handleDelete('entry-7');
    });

    expect(deleteEntry).toHaveBeenCalledWith({ memberId: 'member-1', entryId: 'entry-7', idempotencyKey: 'key-delete-entry-7' });
    expect(showError).toHaveBeenCalledWith('Delete failed', 'progress-delete-entry-7');
  });
});
