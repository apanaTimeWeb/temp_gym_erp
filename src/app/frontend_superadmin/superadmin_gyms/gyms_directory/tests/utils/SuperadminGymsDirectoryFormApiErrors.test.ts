import { describe, expect, it, vi } from 'vitest';

import { applySuperadminGymsDirectoryFormApiErrors, createSuperadminGymsDirectoryFormApiError } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormApiErrors';

import type { FieldValues, UseFormSetError } from 'react-hook-form';

describe('SuperadminGymsDirectoryFormApiErrors', () => {
  it('maps an allowlisted server field to its field-level message', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    const error = createSuperadminGymsDirectoryFormApiError({ message: 'Validation failed',
      validationErrors: [{ field: 'gymName', message: 'Server rejected this field' }],
    });

    const mapped = applySuperadminGymsDirectoryFormApiErrors(error, setError, ['gymName'] as never);

    expect(mapped).toBe(1);
    expect(setError).toHaveBeenCalledWith('gymName', { type: 'server', message: 'Server rejected this field' });
  });

  it('does not trust an unrecognized server field path and falls back to root.server', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    const error = createSuperadminGymsDirectoryFormApiError({ message: 'Validation failed',
      validationErrors: [{ field: '__proto__.constructor', message: 'Untrusted path' }],
    });

    const mapped = applySuperadminGymsDirectoryFormApiErrors(error, setError, ['gymName'] as never);

    expect(mapped).toBe(0);
    expect(setError).toHaveBeenCalledWith('root.server', { type: 'server', message: 'Validation failed' });
  });
  it('hides raw transport exception details in the root error', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    applySuperadminGymsDirectoryFormApiErrors(new Error('internal host stack / credential detail'), setError, []);
    expect(setError).toHaveBeenCalledWith('root.server', { type: 'server', message: 'The request could not be completed.' });
  });
});
