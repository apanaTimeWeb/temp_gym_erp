import { describe, it, expect } from 'vitest';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';

import { ManagerMembersDirectoryCreateDefaultForm } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCreateDefaultForm';
import { ManagerMembersDirectoryFormatCurrency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';


describe('ManagerMembersDirectorySharedConstants', () => {
  it('should format currency correctly', () => {
        expect(ManagerMembersDirectoryFormatCurrency(1000, ManagerEnvConfig.currencyCode)).toContain('10');
  });

  it('should have empty member form defined', () => {
    expect(ManagerMembersDirectoryCreateDefaultForm()).toBeDefined();
    expect(ManagerMembersDirectoryCreateDefaultForm().name).toBe('');
  });
});
