import { Suspense } from 'react';
import Main from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/components/SuperadminSystemOpsCacheManagementMain';
import Loading from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/loading';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Main />
    </Suspense>
  );
}
