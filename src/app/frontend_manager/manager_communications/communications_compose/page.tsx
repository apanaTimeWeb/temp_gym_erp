import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_communications/communications_compose/components/ManagerCommunicationsComposeMain';
import Loading from '@/app/frontend_manager/manager_communications/communications_compose/loading';

export default function CommunicationsComposeMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
