// RESPONSIBILITY: Coordinates the payroll-and-ledger page’s local view selection and mounts the corresponding payroll, ledger, advance, and due surfaces; it does not own payroll calculations or payment transport.
"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ManagerStaffPayrollAndAttendancePayrollTable from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerStaffPayrollAndAttendancePayrollTable';
import ManagerStaffPayrollAndAttendanceLedgerTable from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerStaffPayrollAndAttendanceLedgerTable';
import ManagerStaffPayrollAndAttendanceAdvanceTable from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerStaffPayrollAndAttendanceAdvanceTable';
import ManagerStaffPayrollAndAttendanceDueTable from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerStaffPayrollAndAttendanceDueTable';
import ManagerStaffPayrollAndAttendancePayrollModal from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerStaffPayrollAndAttendancePayrollModal';
import ManagerStaffPayrollAndAttendancePaymentModal from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerStaffPayrollAndAttendancePaymentModal';
const VIEWS = ['payroll', 'ledger', 'advance', 'due'] as const;
export default function PayrollAndLedgerMain() {
 const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE'); const [view,setView] = useState<typeof VIEWS[number]>('payroll');
 return <section className="min-h-full p-6 space-y-5"><h1 className="text-2xl font-bold text-text-primary">Payroll and Staff Ledger</h1><nav aria-label="Payroll and ledger views" className="flex flex-wrap gap-2">{VIEWS.map((item) => <button key={item} type="button" aria-pressed={view===item} onClick={()=>setView(item)} className={`min-h-11 px-3 py-2 rounded-lg border border-border ${view===item?'bg-primary text-on-primary':'bg-card text-text-primary'}`} data-testid={`manager_staff_hr-payroll-and-ledger-main-tab-${item}`}>{item==='payroll'?'Payroll':item==='ledger'?'Staff Ledger':item==='advance'?'Give Advance':'Pay Due'}</button>)}</nav>{view==='payroll' && <ManagerStaffPayrollAndAttendancePayrollTable />}{view==='ledger' && <ManagerStaffPayrollAndAttendanceLedgerTable />}{view==='advance' && <ManagerStaffPayrollAndAttendanceAdvanceTable />}{view==='due' && <ManagerStaffPayrollAndAttendanceDueTable />}<ManagerStaffPayrollAndAttendancePayrollModal /><ManagerStaffPayrollAndAttendancePaymentModal /></section>;
}
