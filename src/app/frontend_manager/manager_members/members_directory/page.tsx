// Autonomous leaf route for manager_members.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryMain';
import Loading from '@/app/frontend_manager/manager_members/members_directory/loading';


export default function ManagerMembersDirectoryPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
