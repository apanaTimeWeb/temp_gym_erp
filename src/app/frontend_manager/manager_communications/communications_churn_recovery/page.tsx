import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_communications/communications_churn_recovery/components/ManagerCommunicationsChurnRecoveryMain';
import Loading from '@/app/frontend_manager/manager_communications/communications_churn_recovery/loading';

export default function CommunicationsChurnRecoveryMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
