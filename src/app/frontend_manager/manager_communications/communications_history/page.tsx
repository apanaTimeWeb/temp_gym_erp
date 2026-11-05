import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_communications/communications_history/components/ManagerCommunicationsHistoryMain';
import Loading from '@/app/frontend_manager/manager_communications/communications_history/loading';

export default function CommunicationsHistoryMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
