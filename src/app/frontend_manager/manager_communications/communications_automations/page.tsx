import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_communications/communications_automations/components/ManagerCommunicationsAutomationsMain';
import Loading from '@/app/frontend_manager/manager_communications/communications_automations/loading';

export default function CommunicationsAutomationsMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
