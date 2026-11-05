import { Suspense } from 'react';
import Main from './components/TrainerOperationsLeaveRequestsMain';
export default function TrainerPage() {return <Suspense fallback={<div role="status" className="min-h-40 bg-skeleton-base motion-safe:animate-pulse"/>}><Main/></Suspense>;}
