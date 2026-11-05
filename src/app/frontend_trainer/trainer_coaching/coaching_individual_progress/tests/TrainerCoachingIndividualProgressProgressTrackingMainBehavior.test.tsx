import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import TrainerProgressTrackingMain from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingMain';






const deleteEntry = vi.fn();
const createEntry = vi.fn();
const updateEntry = vi.fn();
const showSuccess = vi.fn();
const showError = vi.fn();
const begin = vi.fn((actionId: string) => `key-${actionId}`);
const clear = vi.fn();
const confirm = vi.fn();

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingFilters', () => ({
  useTrainerProgressTrackingFilters: () => ({
    selectedMemberId: '1', setSelectedMemberId: vi.fn(), activeTab: 'individual', setActiveTab: vi.fn(),
    currentPage: 1, setCurrentPage: vi.fn(), sortBy: 'date', sortDirection: 'desc', setSort: vi.fn(),
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingQuery', () => ({
  useTrainerProgressTrackingMembersQuery: () => ({ data: [{ id: '1', name: 'Rahul Sharma' }], isPending: false, isError: false, error: null }),
  useTrainerProgressTrackingEntriesQuery: () => ({
    data: { entries: [{ id: 'p1', date: '2026-09-17', weightKg: 80, heightCm: 175 }], total: 1 },
    isPending: false, isError: false, isFetching: false, error: null, refetch: vi.fn(),
  }),
  useTrainerProgressTrackingCompleteHistoryQuery: () => ({ data: { entries: [] }, isPending: false, isError: false, refetch: vi.fn() }),
  useTrainerProgressTrackingSummaryQuery: () => ({ data: { memberId: '1', memberName: 'Rahul Sharma', totalEntries: 1, latestEntry: { weightKg: 80, bmi: 26.1 }, firstEntry: null, weightChangeKg: 0, bmiChange: 0 }, isPending: false, isError: false, refetch: vi.fn() }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingMutations', () => ({
  useTrainerProgressTrackingMutations: () => ({ deleteEntry, createEntry, updateEntry, deleteEntryPending: false, createEntryPending: false, updateEntryPending: false }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingComparisonQueries', () => ({ useTrainerProgressTrackingComparisonQueries: () => [] }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/state/useTrainerCoachingIndividualProgressProgressTrackingStore', () => ({
  useTrainerProgressTrackingStore: (selector: (s: Record<string, unknown>) => unknown) => selector({
    activeMetric: 'weightKg', setActiveMetric: vi.fn(), showModal: false, setShowModal: vi.fn(), editingEntryId: null, setEditingEntryId: vi.fn(),
    activeComparisonMetric: 'weightKg', setActiveComparisonMetric: vi.fn(), selectedComparisonIds: [], toggleComparisonMember: vi.fn(),
  }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureFeedback', () => ({ useTrainerInfrastructureFeedback: () => ({ showSuccess, showError }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureConfirm', () => ({ useTrainerInfrastructureConfirm: () => ({ confirm }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureIdempotencyKey', () => ({ useTrainerInfrastructureIdempotencyKey: () => ({ begin, clear, current: vi.fn() }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingChart', () => ({ default: () => <div data-testid="trainer_progress_tracking-main-behavior-test-chart" /> }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingTable', () => ({
  default: (props: { onDelete: (id: string) => void }) => <button type="button" onClick={() => void props.onDelete('p1')} data-testid="trainer_progress_tracking-main-behavior-test-delete-entry">Delete Entry</button>,
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingEmptyState', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingMemberSelector', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingComparisonChart', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingComparisonTable', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressTrainerInfrastructureSearchableDropdown', () => ({ default: () => <div data-testid="trainer_progress_tracking-main-behavior-test-member-selector" /> }));

describe('TrainerProgressTrackingMain behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    begin.mockImplementation((actionId: string) => `key-${actionId}`);
    deleteEntry.mockResolvedValue({ message: 'Progress entry deleted' });
    confirm.mockResolvedValue(true);
  });

  it('routes a table delete action through the module mutation with a stable idempotency key', async () => {
    const user = userEvent.setup();
    render(<TrainerProgressTrackingMain />);
    expect(screen.getByTestId('trainer-progress-summary')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Delete Entry' }));
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ requireTypedConfirmation: true, confirmationPhrase: 'TEXT_DELETE_ENTRY_CONFIRMATION' }));
    expect(deleteEntry).toHaveBeenCalledWith({ memberId: '1', entryId: 'p1', idempotencyKey: 'key-delete-p1' });
    expect(clear).toHaveBeenCalledWith('delete-p1');
    expect(showSuccess).toHaveBeenCalledWith('Progress entry deleted', 'progress-delete-p1');
  });
  it('does not call the delete API when the typed confirmation is declined', async () => {
    confirm.mockResolvedValue(false);
    const user = userEvent.setup();
    render(<TrainerProgressTrackingMain />);
    await user.click(screen.getByRole('button', { name: 'Delete Entry' }));
    expect(deleteEntry).not.toHaveBeenCalled();
    expect(begin).not.toHaveBeenCalled();
  });

});
