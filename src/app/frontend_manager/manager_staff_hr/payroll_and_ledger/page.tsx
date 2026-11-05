import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerPayrollAndLedgerMain';
import Loading from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/loading';

export const dynamic = 'force-dynamic';
export default function PayrollAndLedgerMainPage() { return <Suspense fallback={<Loading />}><Main /></Suspense>; }
