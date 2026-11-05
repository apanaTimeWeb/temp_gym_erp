import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchTrainerProgressTrackingProgressEntries } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/api/TrainerCoachingIndividualProgressProgressTrackingApi';
import { fetchTrainerProgressTrackingCompleteHistory } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/api/TrainerCoachingIndividualProgressCompleteHistoryApi';

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/api/TrainerCoachingIndividualProgressProgressTrackingApi', () => ({ fetchTrainerProgressTrackingProgressEntries: vi.fn() }));
beforeEach(() => vi.resetAllMocks());

describe('individual progress complete history', () => {
  it('validates first-page and subsequent page metadata while collecting every entry', async () => {
    vi.mocked(fetchTrainerProgressTrackingProgressEntries).mockImplementation(async ({ page, limit }) => ({
      entries: Array.from({ length: page === 3 ? 5 : limit }, (_, index) => ({ id: `${page}-${index}` })) as never,
      total: 205, page, limit,
    }));
    const result = await fetchTrainerProgressTrackingCompleteHistory('member-1');
    expect(result.entries).toHaveLength(205);
    expect(fetchTrainerProgressTrackingProgressEntries).toHaveBeenCalledTimes(3);
  });
  it('rejects incorrect first-page metadata before requesting later pages', async () => {
    vi.mocked(fetchTrainerProgressTrackingProgressEntries).mockResolvedValueOnce({ entries: [] as never, total: 5, page: 2, limit: 100 });
    await expect(fetchTrainerProgressTrackingCompleteHistory('member-1')).rejects.toThrow(/first progress history page metadata/i);
    expect(fetchTrainerProgressTrackingProgressEntries).toHaveBeenCalledTimes(1);
  });
  it('rejects an incomplete first page', async () => {
    vi.mocked(fetchTrainerProgressTrackingProgressEntries).mockResolvedValueOnce({ entries: [] as never, total: 5, page: 1, limit: 100 });
    await expect(fetchTrainerProgressTrackingCompleteHistory('member-1')).rejects.toThrow(/first progress history page is incomplete/i);
  });
});
