import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_communications/notifications_inbox/hooks/useManagerNotificationsInboxQueries';

describe("useManagerNotificationsInboxQueries co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerNotificationsInboxQueries).toBe("function");
  });
});
