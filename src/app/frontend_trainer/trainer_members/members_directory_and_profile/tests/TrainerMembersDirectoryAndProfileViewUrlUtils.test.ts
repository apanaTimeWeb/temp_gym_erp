import { describe, expect, it } from 'vitest';
import {
  TrainerMembersBuildViewSearch,
  TrainerMembersResolveViewUrl,
} from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileViewUrlUtils';

describe('TrainerMembersViewUrlUtils', () => {
  it('defaults to the list view and keeps list filters', () => {
    expect(TrainerMembersResolveViewUrl('search=Asha&page=2&status=Active')).toEqual({
      view: 'list',
      memberId: null,
      normalizedSearch: 'search=Asha&page=2&status=Active',
    });
  });

  it('resolves a canonical profile view and record identity', () => {
    expect(TrainerMembersResolveViewUrl('view=progress&id=MEM-002')).toEqual({
      view: 'progress',
      memberId: 'MEM-002',
      normalizedSearch: 'view=progress&id=MEM-002',
    });
  });

  it('defaults an identified member with no view to overview', () => {
    expect(TrainerMembersResolveViewUrl('id=MEM-002&search=Asha')).toEqual({
      view: 'overview',
      memberId: 'MEM-002',
      normalizedSearch: 'id=MEM-002&search=Asha&view=overview',
    });
  });

  it('normalizes obsolete tab URLs and retains unrelated parameters', () => {
    expect(TrainerMembersResolveViewUrl('view=attendance&tab=obsolete&id=MEM-003&sortBy=name&search=Ravi')).toEqual({
      view: 'attendance',
      memberId: 'MEM-003',
      normalizedSearch: 'id=MEM-003&sortBy=name&search=Ravi&view=attendance',
    });
  });

  it('prefers a valid canonical view to a obsolete tab value', () => {
    expect(TrainerMembersResolveViewUrl('view=diet&tab=obsolete&id=MEM-004').view).toBe('diet');
  });

  it('falls back safely for invalid view values without discarding member identity', () => {
    expect(TrainerMembersResolveViewUrl('view=admin&id=MEM-005')).toMatchObject({ view: 'overview', memberId: 'MEM-005' });
  });

  it('removes empty member identity and screen state but preserves list parameters', () => {
    expect(TrainerMembersResolveViewUrl('id=%20&view=progress&search=Asha')).toEqual({
      view: 'list',
      memberId: null,
      normalizedSearch: 'search=Asha',
    });
  });

  it('builds profile URLs and preserves search, filters, sort and pagination', () => {
    const next = TrainerMembersBuildViewSearch('search=Asha&status=Active&page=3&sortBy=name&sortDirection=asc', 'fitness', 'MEM-006');
    const params = new URLSearchParams(next);
    expect(params.get('view')).toBe('fitness');
    expect(params.get('id')).toBe('MEM-006');
    expect(params.get('search')).toBe('Asha');
    expect(params.get('status')).toBe('Active');
    expect(params.get('page')).toBe('3');
    expect(params.get('sortBy')).toBe('name');
    expect(params.get('sortDirection')).toBe('asc');
  });

  it('encodes record IDs and removes obsolete tab state when building profile URLs', () => {
    const params = new URLSearchParams(TrainerMembersBuildViewSearch('view=notes&tab=obsolete&x=1', 'notes', 'MEM / 007'));
    expect(params.get('id')).toBe('MEM / 007');
    expect(params.get('view')).toBe('notes');
    expect(params.has('tab')).toBe(false);
    expect(params.get('x')).toBe('1');
  });

  it('returns to list view without dropping filters', () => {
    const params = new URLSearchParams(TrainerMembersBuildViewSearch('search=Asha&id=MEM-008&view=notes&page=2', 'list', null));
    expect(params.has('id')).toBe(false);
    expect(params.has('view')).toBe(false);
    expect(params.has('tab')).toBe(false);
    expect(params.get('search')).toBe('Asha');
    expect(params.get('page')).toBe('2');
  });

  it('is idempotent once the URL is canonical', () => {
    const first = TrainerMembersResolveViewUrl('search=Asha&view=workout&id=MEM-009');
    const second = TrainerMembersResolveViewUrl(first.normalizedSearch);
    expect(second.normalizedSearch).toBe(first.normalizedSearch);
  });
});
