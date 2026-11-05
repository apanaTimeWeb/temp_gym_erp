// RESPONSIBILITY: Defines regression tests for AdminBillingCouponsManagementModalAccessibility.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/components/modal/AdminBillingCouponsManagementModalAccessibility.test.tsx)

import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminCouponsModal from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/modal/AdminBillingCouponsManagementModal';

const { mockForm } = vi.hoisted(() => ({
  mockForm: {
    showModal: true,
    editId: null as string | null,
    saving: false,
    register: vi.fn((name: string) => ({ name })),
    handleSubmit: vi.fn(() => vi.fn()),
    errors: {} as Record<string, never>,
    selectedGyms: [] as string[],
    toggleGym: vi.fn(),
    handleClose: vi.fn(),
    saveCoupon: vi.fn(),
  },
}));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementModalForm', () => ({
  useAdminCouponsModalForm: () => mockForm,
}));

describe('AdminCouponsModal accessible form labels', () => {
  beforeEach(() => {
    mockForm.showModal = true;
    mockForm.editId = null;
    mockForm.saving = false;
    mockForm.errors = {};
  });

  it('associates each type and amount field with its own visible label', () => {
    render(<AdminCouponsModal />);

    expect(screen.getByLabelText(/text_ab547ca1cd/).getAttribute('id')).toBe('admin-coupon-type');
    expect(screen.getByLabelText(/text_8dce170de2/).getAttribute('id')).toBe('admin-coupon-value');
    expect(screen.getByLabelText(/text_6bd88b8a35/).getAttribute('id')).toBe('admin-coupon-min-order-amount');
    expect(screen.getByLabelText(/text_222c927402/).getAttribute('id')).toBe('admin-coupon-max-discount');
    expect(screen.getByLabelText(/text_b456dc42d2/).getAttribute('id')).toBe('admin-coupon-usage-limit');
    expect(screen.getByLabelText(/text_5366942a24/).getAttribute('id')).toBe('admin-coupon-valid-from');
    expect(screen.getByLabelText(/text_a144230d85/).getAttribute('id')).toBe('admin-coupon-valid-until');
  });

  it('exposes gym selection as a named group with pressed-state controls', () => {
    render(<AdminCouponsModal />);
    const gymGroup = screen.getByRole('group', { name: /text_85d7edabb6/ });
    const firstGym = gymGroup.querySelector('button');
    expect(firstGym).toBeTruthy();
    expect(firstGym?.getAttribute('aria-pressed')).toBe('false');
  });
});
