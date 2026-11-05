import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchTrainerProgressTrackingProgressEntries } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/api/TrainerCoachingProgressComparisonProgressTrackingApi';
import { fetchTrainerProgressTrackingCompleteHistory } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/api/TrainerCoachingProgressComparisonCompleteHistoryApi';
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/api/TrainerCoachingProgressComparisonProgressTrackingApi', () => ({fetchTrainerProgressTrackingProgressEntries: vi.fn()}));
beforeEach(() => vi.resetAllMocks());
describe('comparison all-page history', () => {
 it('fetches every page rather than silently truncating after 100', async () => {
  vi.mocked(fetchTrainerProgressTrackingProgressEntries).mockImplementation(async ({page,limit}) => ({entries: Array.from({length:page===3?5:limit},(_,i)=>({id:`${page}-${i}`})) as never, total:205,page,limit}));
  const data = await fetchTrainerProgressTrackingCompleteHistory('member-1');
  expect(data.entries).toHaveLength(205);
  expect(fetchTrainerProgressTrackingProgressEntries).toHaveBeenCalledTimes(3);
 });
 it('rejects incorrect first-page metadata before loading later pages', async () => {
  vi.mocked(fetchTrainerProgressTrackingProgressEntries).mockResolvedValueOnce({entries: [], total: 5, page: 2, limit: 100} as never);
  await expect(fetchTrainerProgressTrackingCompleteHistory('member-1')).rejects.toThrow(/first comparison history page metadata/i);
  expect(fetchTrainerProgressTrackingProgressEntries).toHaveBeenCalledTimes(1);
 });
 it('rejects changing dataset totals instead of drawing incomplete comparisons', async () => {
  vi.mocked(fetchTrainerProgressTrackingProgressEntries).mockImplementation(async ({page,limit}) => ({entries: Array.from({length:limit},(_,i)=>({id:`${page}-${i}`})) as never,total:page===1?120:119,page,limit}));
  await expect(fetchTrainerProgressTrackingCompleteHistory('member-1')).rejects.toThrow(/changed/);
 });
});
