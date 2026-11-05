// DATA FLOW: API / URL state / module client state → useSuperadminSystemOpsMigrationsMainViewModel → superadmin_system_ops_migrations view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminSystemOpsMigrationsMainViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/hooks/useSuperadminSystemOpsMigrationsMainViewModel';



describe('useSuperadminSystemOpsMigrationsMainViewModel', () => {
  it('exports the module-owned migration page view-model', () => {
    expect(useSuperadminSystemOpsMigrationsMainViewModel).toBeTypeOf('function');
  });
});
