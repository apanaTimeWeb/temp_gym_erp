import { describe, expect, it, vi } from 'vitest';

import { applySuperadminCommunicationMessagingCenterFormApiErrors, createSuperadminCommunicationMessagingFormApiError } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/utils/SuperadminCommunicationMessagingCenterFormApiErrors';

import type { FieldValues, UseFormSetError } from 'react-hook-form';

describe('SuperadminCommunicationMessagingCenterFormApiErrors', () => {
  it('maps an allowlisted server field to its field-level message', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    const error = createSuperadminCommunicationMessagingFormApiError({ message: 'Validation failed',
      validationErrors: [{ field: 'subject', message: 'Server rejected this field' }],
    });

    const mapped = applySuperadminCommunicationMessagingCenterFormApiErrors(error, setError, ['subject'] as never);

    expect(mapped).toBe(1);
    expect(setError).toHaveBeenCalledWith('subject', { type: 'server', message: 'Server rejected this field' });
  });

  it('does not trust an unrecognized server field path and falls back to root.server', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    const error = createSuperadminCommunicationMessagingFormApiError({ message: 'Validation failed',
      validationErrors: [{ field: '__proto__.constructor', message: 'Untrusted path' }],
    });

    const mapped = applySuperadminCommunicationMessagingCenterFormApiErrors(error, setError, ['subject'] as never);

    expect(mapped).toBe(0);
    expect(setError).toHaveBeenCalledWith('root.server', { type: 'server', message: 'Validation failed' });
  });
  it('hides raw transport exception details in the root error', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    applySuperadminCommunicationMessagingCenterFormApiErrors(new Error('internal host stack / credential detail'), setError, []);
    expect(setError).toHaveBeenCalledWith('root.server', { type: 'server', message: 'The request could not be completed.' });
  });
});
