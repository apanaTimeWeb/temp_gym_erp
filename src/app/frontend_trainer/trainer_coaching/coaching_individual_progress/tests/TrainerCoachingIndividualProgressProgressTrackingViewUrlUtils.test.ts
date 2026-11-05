import { describe, expect, it } from 'vitest';

import { canonicalizeTrainerProgressTrackingViewParams, resolveTrainerProgressTrackingScreenView } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingViewUrlUtils';

describe('TrainerProgressTrackingViewUrlUtils', () => {
  it('defaults to individual when the URL omits view state', () => {
    expect(resolveTrainerProgressTrackingScreenView(new URLSearchParams('memberId=m-1&page=2'))).toBe('individual');
  });

  it('normalizes obsolete tab state to the canonical view key and preserves member/filter context', () => {
    const normalized = canonicalizeTrainerProgressTrackingViewParams(new URLSearchParams('view=compare&tab=obsolete&memberId=m-1&page=3&sortBy=date&sortDirection=asc'));
    const result = new URLSearchParams(normalized ?? '');
    expect(result.get('view')).toBe('compare');
    expect(result.has('tab')).toBe(false);
    expect(result.get('memberId')).toBe('m-1');
    expect(result.get('page')).toBe('3');
    expect(result.get('sortBy')).toBe('date');
    expect(result.get('sortDirection')).toBe('asc');
  });

  it('prefers valid canonical state when both view and obsolete tab are present', () => {
    expect(resolveTrainerProgressTrackingScreenView(new URLSearchParams('view=individual&tab=obsolete'))).toBe('individual');
    const result = new URLSearchParams(canonicalizeTrainerProgressTrackingViewParams(new URLSearchParams('view=individual&tab=obsolete')) ?? '');
    expect(result.get('view')).toBe('individual');
    expect(result.has('tab')).toBe(false);
  });

  it('falls back safely for invalid view values and does not discard filters', () => {
    expect(resolveTrainerProgressTrackingScreenView(new URLSearchParams('view=wrong&memberId=m-2'))).toBe('individual');
    const result = new URLSearchParams(canonicalizeTrainerProgressTrackingViewParams(new URLSearchParams('view=wrong&memberId=m-2')) ?? '');
    expect(result.has('view')).toBe(false);
    expect(result.get('memberId')).toBe('m-2');
  });
});
