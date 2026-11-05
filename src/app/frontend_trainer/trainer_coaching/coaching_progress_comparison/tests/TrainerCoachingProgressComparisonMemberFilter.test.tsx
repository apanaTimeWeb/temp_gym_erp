import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTrainerProgressTrackingFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/hooks/useTrainerCoachingProgressComparisonProgressTrackingFilters';
const push = vi.fn(); const replace = vi.fn();
vi.mock('next/navigation', () => ({useSearchParams:()=>new URLSearchParams('memberId=old&page=9'),usePathname:()=>'/frontend_trainer/trainer_coaching/coaching_progress_comparison',useRouter:()=>({push,replace})}));
describe('comparison member paging', () => {
 it('clears previous member page when choosing a new member', () => {
  push.mockClear(); const {result}=renderHook(()=>useTrainerProgressTrackingFilters());
  act(()=>result.current.setSelectedMemberId('new'));
  const href=push.mock.calls.at(-1)?.[0] as string;
  expect(new URL(href,'https://example.test').searchParams.get('page')).toBe('1');
  expect(new URL(href,'https://example.test').searchParams.get('memberId')).toBe('new');
 });
});
