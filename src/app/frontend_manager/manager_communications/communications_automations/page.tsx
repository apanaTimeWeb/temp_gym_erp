import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_communications/communications_automations/components/ManagerCommunicationsAutomationsMain';
import Loading from '@/app/frontend_manager/manager_communications/communications_automations/loading';

export const dynamic = 'force-dynamic';
export default function CommunicationsAutomationsMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
