import { describe, expect, it, vi } from 'vitest';

import { fetchTrainerProgressTrackingProgressEntries, fetchTrainerProgressTrackingProgressSummary, createTrainerProgressTrackingProgressEntry, deleteTrainerProgressTrackingProgressEntry } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/api/TrainerCoachingIndividualProgressProgressTrackingApi';

import { TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/mocks/fixtures/TrainerCoachingIndividualProgressProgressTrackingMockData';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer progress API behavior', () => {
  it('fetches progress entries for the requested member', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'progress-read-1', message: 'OK', data: { entries: TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES.slice(0, 2), total: 4, page: 2, limit: 2 } });
    const result = await fetchTrainerProgressTrackingProgressEntries({ memberId: '1', page: 2, limit: 2, sortBy: 'date', sortDirection: 'asc' });
    expect(apiFetch.mock.calls[0][0]).toContain('/1/entries?page=2&limit=2&sortBy=date&sortDirection=asc');
    expect(result).toMatchObject({ total: 4, page: 2, limit: 2 });
    expect(result.entries).toHaveLength(2);
  });
  it('runs create and delete through the module API paths', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'progress-create-1', message: 'Created', data: TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES[0] });
    await createTrainerProgressTrackingProgressEntry('1', { date: '2026-09-17', weightKg: 83.5, heightCm: 175 } as any, 'progress-create-test-key');
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'POST' });
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'progress-delete-1', message: 'Deleted', data: null });
    await deleteTrainerProgressTrackingProgressEntry('1', 'prog_1', 'progress-delete-test-key');
    expect(apiFetch.mock.calls[1][1]).toMatchObject({ method: 'DELETE' });
  });

  it('rejects a valid DELETE failure envelope instead of resolving as a deletion', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, requestId: 'progress-delete-fail-1', message: 'Entry cannot be deleted', data: null, errorCode: 'ENTRY_LOCKED', statusCode: 403 });
    await expect(deleteTrainerProgressTrackingProgressEntry('1', 'prog_1', 'progress-delete-failure-key')).rejects.toMatchObject({ message: 'Entry cannot be deleted', errorCode: 'ENTRY_LOCKED', statusCode: 403 });
  });

  it('preserves the canonical server failure for the summary query', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, requestId: 'progress-summary-fail-1', message: 'Summary unavailable', data: null, errorCode: 'SUMMARY_UNAVAILABLE', statusCode: 503 });
    await expect(fetchTrainerProgressTrackingProgressSummary('1')).rejects.toMatchObject({ message: 'Summary unavailable', errorCode: 'SUMMARY_UNAVAILABLE', statusCode: 503 });
  });
});
