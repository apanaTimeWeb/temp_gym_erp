import { describe, expect, it } from 'vitest';

import { SUPERADMIN_GYMS_DIRECTORY_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';

describe('Superadmin Gyms route contract', () => {
  it('routes primary navigation to the module-owned App Router page', () => {
    expect(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.MAIN).toBe('/frontend_superadmin/superadmin_gyms');
  });

  it('declares the canonical directory and detail leaf routes without replacing public aliases', () => {
    expect(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.DIRECTORY_LEAF).toBe(
      '/frontend_superadmin/superadmin_gyms/gyms_directory',
    );
    expect(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.DETAIL_LEAF('gym/a b')).toBe(
      '/frontend_superadmin/superadmin_gyms/gyms_detail/gym%2Fa%20b',
    );
  });

  it('preserves the supplied public legacy aliases', () => {
    expect(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.ADD).toBe('/superadmin/gyms/add');
    expect(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.DETAIL('gym-123')).toBe('/superadmin/gyms/gym-123');
  });

  it('encodes gym identity and validates it through the detail view URL factory', () => {
    expect(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('detail', 'gym/a b')).toBe(
      '/frontend_superadmin/superadmin_gyms/gyms_detail/gym%2Fa%20b',
    );
  });
});
