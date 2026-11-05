import { Suspense } from 'react';

import SuperadminSystemOpsInfrastructureMain from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructureMain';
import SuperadminSystemOpsInfrastructurePageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/components/SuperadminSystemOpsInfrastructurePageSuspenseSkeleton';

import type { Metadata } from 'next';


export const metadata: Metadata = { title: 'Infrastructure | System Operations', description: 'Monitor infrastructure health and manage authorized Redis cache actions.' };
export default function SystemOpsInfrastructurePage() {
  return <Suspense fallback={<SuperadminSystemOpsInfrastructurePageSuspenseSkeleton />}><SuperadminSystemOpsInfrastructureMain /></Suspense>;
}
