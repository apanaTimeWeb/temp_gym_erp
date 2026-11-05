import { describe, expect, it } from 'vitest';
import { MANAGER_MEMBERS_DIRECTORY_API } from '@/app/frontend_manager/manager_members/members_directory/config/manager_members_directory.url_config';



describe('Manager Members URL config', () => {
  it('encodes runtime resource IDs as one path segment', () => {
    expect(MANAGER_MEMBERS_DIRECTORY_API.GET_ONE('member/with space')).toBe('/api/v1/manager/members/member%2Fwith%20space');
  });

  it('preserves colon placeholders used by MSW route definitions', () => {
    expect(MANAGER_MEMBERS_DIRECTORY_API.ATTENDANCE(':id')).toBe('/api/v1/manager/members/:id/attendance');
  });
});
