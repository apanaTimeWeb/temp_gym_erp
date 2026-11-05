import { describe, expect, it, vi } from 'vitest';
import { fetchTrainerProgressTrackingProgressSummary, fetchTrainerProgressTrackingProgressMembers, fetchTrainerProgressTrackingProgressEntries, deleteTrainerProgressTrackingProgressEntry } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/api/TrainerCoachingProgressComparisonProgressTrackingApi';

const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Progress Comparison API behavior', () => {
  it('preserves canonical failures for member and history reads before domain parsing', async () => {
    const failure = { success: false, requestId: 'comparison-read-failure', message: 'Comparison unavailable', data: null, errorCode: 'COMPARISON_UNAVAILABLE', statusCode: 503 };
    apiFetch.mockResolvedValueOnce(failure);
    await expect(fetchTrainerProgressTrackingProgressMembers()).rejects.toMatchObject({ message: 'Comparison unavailable', errorCode: 'COMPARISON_UNAVAILABLE', statusCode: 503 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'comparison-history-failure' });
    await expect(fetchTrainerProgressTrackingProgressEntries({ memberId: 'member-1', page: 1, limit: 100, sortBy: 'date', sortDirection: 'asc' })).rejects.toMatchObject({ message: 'Comparison unavailable', errorCode: 'COMPARISON_UNAVAILABLE', statusCode: 503 });
  });

  it('rejects a valid failure envelope from the dormant legacy DELETE API', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, requestId: 'comparison-delete-failure', message: 'Delete rejected', data: null, errorCode: 'DELETE_REJECTED', statusCode: 409 });
    await expect(deleteTrainerProgressTrackingProgressEntry('member-1', 'entry-1', 'comparison-delete-key')).rejects.toMatchObject({ message: 'Delete rejected', errorCode: 'DELETE_REJECTED', statusCode: 409 });
  });

  it('preserves a canonical summary failure instead of exposing a payload-schema error', async () => {
    apiFetch.mockResolvedValueOnce({
      success: false,
      requestId: 'comparison-summary-failure-1',
      message: 'Comparison summary unavailable',
      data: null,
      errorCode: 'SUMMARY_UNAVAILABLE',
      statusCode: 503,
    });
    await expect(fetchTrainerProgressTrackingProgressSummary('member-1')).rejects.toMatchObject({
      message: 'Comparison summary unavailable',
      errorCode: 'SUMMARY_UNAVAILABLE',
      statusCode: 503,
    });
  });
});
