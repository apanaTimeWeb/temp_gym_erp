import { describe, expect, it } from 'vitest';

import { SUPERADMIN_SYSTEM_OPS_OVERVIEW_ROUTES as SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES_URL_CONTRACT, SUPERADMIN_SYSTEM_OPS_OVERVIEW_ROUTES as SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_ROUTES_URL_CONTRACT, SUPERADMIN_SYSTEM_OPS_OVERVIEW_ROUTES as SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES_URL_CONTRACT, SUPERADMIN_SYSTEM_OPS_OVERVIEW_ROUTES as SUPERADMIN_SYSTEM_OPS_ROUTES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/config/superadmin_system_ops_overview.url_config';

const root = '/frontend_superadmin/superadmin_system_ops';

describe('Superadmin System Ops canonical view routes', () => {
  it('routes each screen to its canonical module-owned page or overview view', () => {
    expect(SUPERADMIN_SYSTEM_OPS_ROUTES.VIEW('overview')).toBe(`${root}/system_ops_overview`);
    expect(SUPERADMIN_SYSTEM_OPS_ROUTES.VIEW('backups')).toBe(`${root}/system_ops_backups`);
    expect(SUPERADMIN_SYSTEM_OPS_ROUTES.VIEW('infrastructure')).toBe(`${root}/system_ops_infrastructure`);
    expect(SUPERADMIN_SYSTEM_OPS_ROUTES.VIEW('jobs')).toBe(`${root}/system_ops_jobs`);
    expect(SUPERADMIN_SYSTEM_OPS_ROUTES.VIEW('migrations')).toBe(`${root}/system_ops_migrations`);
  });

  it('uses canonical MAIN entries for autonomous leaf modules', () => {
    expect(SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES.MAIN).toBe(`${root}/system_ops_backups`);
    expect(SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES.CANONICAL_LEAF).toBe(`${root}/system_ops_backups`);
    expect(SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES.MAIN).toBe(`${root}/system_ops_jobs`);
    expect(SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES.CANONICAL_LEAF).toBe(`${root}/system_ops_jobs`);
    expect(SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_ROUTES_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_ROUTES.MAIN).toBe(`${root}/system_ops_infrastructure`);
    expect(SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_ROUTES_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_ROUTES.LEGACY).toBe(`${root}/system_ops_overview?view=infrastructure`);
    expect(SUPERADMIN_SYSTEM_OPS_ROUTES.MIGRATIONS).toBe(`${root}/system_ops_migrations`);
  });

  it('does not expose deleted parallel route paths as active route constants', () => {
    expect(JSON.stringify(SUPERADMIN_SYSTEM_OPS_ROUTES)).not.toContain('LEGACY_PATH');
    expect(JSON.stringify(SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES)).not.toContain('superadmin_system_ops_backups');
    expect(JSON.stringify(SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES)).not.toContain('superadmin_system_ops_jobs');
  });
});
