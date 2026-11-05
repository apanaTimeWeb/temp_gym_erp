// RESPONSIBILITY: Retrieve the complete server-paginated history for graphs without truncating at 100 entries.
// DATA FLOW: canonical paginated progress API -> verified total -> bounded sequential page batches -> all entries.
import { fetchTrainerProgressTrackingProgressEntries } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/api/TrainerCoachingIndividualProgressProgressTrackingApi';
import type { TrainerProgressTrackingEntriesResponse } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingEntriesResponse';

const PAGE_LIMIT = 100;
const REQUEST_BATCH_SIZE = 5;

export async function fetchTrainerProgressTrackingCompleteHistory(memberId: string): Promise<TrainerProgressTrackingEntriesResponse> {
  const options = { memberId, limit: PAGE_LIMIT, sortBy: 'date' as const, sortDirection: 'asc' as const };
  const first = await fetchTrainerProgressTrackingProgressEntries({ ...options, page: 1 });
  if (!Number.isSafeInteger(first.total) || first.total < 0) throw new Error('Invalid progress pagination total.');
  if (first.page !== 1 || first.limit !== PAGE_LIMIT) throw new Error('Invalid first progress history page metadata.');
  if (first.entries.length !== Math.min(first.total, PAGE_LIMIT)) throw new Error('First progress history page is incomplete.');
  const pageCount = Math.ceil(first.total / PAGE_LIMIT);
  const allEntries = [...first.entries];
  for (let start = 2; start <= pageCount; start += REQUEST_BATCH_SIZE) {
    const end = Math.min(pageCount, start + REQUEST_BATCH_SIZE - 1);
    const pages = await Promise.all(Array.from({ length: end - start + 1 }, (_, i) => fetchTrainerProgressTrackingProgressEntries({ ...options, page: start + i })));
    pages.forEach((page, offset) => {
      const expectedPage = start + offset;
      const expectedLength = Math.min(PAGE_LIMIT, Math.max(0, first.total - ((expectedPage - 1) * PAGE_LIMIT)));
      if (page.page !== expectedPage || page.limit !== PAGE_LIMIT || page.total !== first.total || page.entries.length !== expectedLength) throw new Error('Progress dataset changed or returned incomplete pagination metadata; retry complete history.');
      allEntries.push(...page.entries);
    });
  }
  if (allEntries.length !== first.total) throw new Error('Progress history incomplete; retry to prevent misleading charts.');
  return { ...first, entries: allEntries };
}
