// RESPONSIBILITY: Retrieve the complete verified progress history for trends and comparison, not only the first 100 records.
// DATA FLOW: canonical entries API -> fixed page windows -> complete entries with validated totals.
import { fetchTrainerProgressTrackingProgressEntries } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/api/TrainerCoachingProgressComparisonProgressTrackingApi';
import type { TrainerProgressTrackingEntriesResponse } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingEntriesResponse';
const PAGE_LIMIT = 100;
const BATCH_SIZE = 5;
export async function fetchTrainerProgressTrackingCompleteHistory(memberId: string): Promise<TrainerProgressTrackingEntriesResponse> {
  const options = { memberId, limit: PAGE_LIMIT, sortBy: 'date' as const, sortDirection: 'asc' as const };
  const first = await fetchTrainerProgressTrackingProgressEntries({ ...options, page: 1 });
  if (!Number.isSafeInteger(first.total) || first.total < 0) throw new Error('Invalid progress history total.');
  if (first.page !== 1 || first.limit !== PAGE_LIMIT) throw new Error('Invalid first comparison history page metadata.');
  if (first.entries.length !== Math.min(first.total, PAGE_LIMIT)) throw new Error('First comparison history page is incomplete.');
  const pages = Math.ceil(first.total / PAGE_LIMIT);
  const entries = [...first.entries];
  for (let start = 2; start <= pages; start += BATCH_SIZE) {
    const end = Math.min(pages, start + BATCH_SIZE - 1);
    const data = await Promise.all(Array.from({ length: end - start + 1 }, (_, offset) => fetchTrainerProgressTrackingProgressEntries({ ...options, page: start + offset })));
    for (let offset = 0; offset < data.length; offset++) {
      const response = data[offset]!;
      const expectedPage = start + offset;
      const expectedLength = Math.min(PAGE_LIMIT, Math.max(0, first.total - ((expectedPage - 1) * PAGE_LIMIT)));
      if (response.page !== expectedPage || response.limit !== PAGE_LIMIT || response.total !== first.total || response.entries.length !== expectedLength) throw new Error('Progress history changed or returned incomplete pagination metadata; retry to prevent incomplete charts.');
      entries.push(...response.entries);
    }
  }
  if (entries.length !== first.total) throw new Error('Progress history incomplete.');
  return { ...first, entries };
}
