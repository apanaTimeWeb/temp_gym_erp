import { describe, expect, it, vi } from 'vitest';

import { createSuperadminBillingPlansFormApiError, applySuperadminBillingPlansManagementFormApiErrors } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementFormApiErrors';

import type { FieldValues, UseFormSetError } from 'react-hook-form';

describe('SuperadminBillingPlansManagementFormApiErrors', () => {
  it('maps an allowlisted server field to its field-level message', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    const error = createSuperadminBillingPlansFormApiError({ message: 'Validation failed',
      validationErrors: [{ field: 'name', message: 'Server rejected this field' }],
    });

    const mapped = applySuperadminBillingPlansManagementFormApiErrors(error, setError, ['name'] as never);

    expect(mapped).toBe(1);
    expect(setError).toHaveBeenCalledWith('name', { type: 'server', message: 'Server rejected this field' });
  });

  it('does not trust an unrecognized server field path and falls back to root.server', () => {
    const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
    const error = createSuperadminBillingPlansFormApiError({ message: 'Validation failed',
      validationErrors: [{ field: '__proto__.constructor', message: 'Untrusted path' }],
    });

    const mapped = applySuperadminBillingPlansManagementFormApiErrors(error, setError, ['name'] as never);

    expect(mapped).toBe(0);
    expect(setError).toHaveBeenCalledWith('root.server', { type: 'server', message: 'Validation failed' });
  });
});


it('maps dynamic feature-row field paths only when the wildcard is allowlisted', () => {
  const setError = vi.fn() as unknown as UseFormSetError<FieldValues>;
  const error = createSuperadminBillingPlansFormApiError({ message: 'Feature label invalid', validationErrors: [{ field: 'features.4.value', message: 'Invalid label' }] });
  const mapped = applySuperadminBillingPlansManagementFormApiErrors(error, setError, ['features.*.value']);
  expect(mapped).toBe(1);
  expect(setError).toHaveBeenCalledWith('features.4.value', { type: 'server', message: 'Invalid label' });
});
