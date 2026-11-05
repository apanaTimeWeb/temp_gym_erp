import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/hooks/useManagerPtAssignmentsQueries';

describe("useManagerPtAssignmentsQueries co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerPtAssignmentsQueries).toBe("function");
  });
});
