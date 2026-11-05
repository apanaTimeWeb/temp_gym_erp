import { describe, expect, it, vi } from 'vitest';

import { applySuperadminAffiliatesManagementFormApiErrors, createSuperadminAffiliatesFormApiError } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementFormApiErrors';

import type { FieldValues, UseFormSetError } from 'react-hook-form';

describe('SuperadminAffiliatesManagementFormApiErrors', () => {
  it('maps an allowlisted server field to its field-level message', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    const error = createSuperadminAffiliatesFormApiError({ message: 'Validation failed',
      validationErrors: [{ field: 'name', message: 'Server rejected this field' }],
    });

    const mapped = applySuperadminAffiliatesManagementFormApiErrors(error, setError, ['name'] as never);

    expect(mapped).toBe(1);
    expect(setError).toHaveBeenCalledWith('name', { type: 'server', message: 'Server rejected this field' });
  });

  it('does not trust an unrecognized server field path and falls back to root.server', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    const error = createSuperadminAffiliatesFormApiError({ message: 'Validation failed',
      validationErrors: [{ field: '__proto__.constructor', message: 'Untrusted path' }],
    });

    const mapped = applySuperadminAffiliatesManagementFormApiErrors(error, setError, ['name'] as never);

    expect(mapped).toBe(0);
    expect(setError).toHaveBeenCalledWith('root.server', { type: 'server', message: 'Validation failed' });
  });
  it('hides raw transport exception details in the root error', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    applySuperadminAffiliatesManagementFormApiErrors(new Error('internal host stack / credential detail'), setError, []);
    expect(setError).toHaveBeenCalledWith('root.server', { type: 'server', message: 'The request could not be completed.' });
  });
});
