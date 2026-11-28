// RESPONSIBILITY: Coordinates the payroll-and-ledger page’s local view selection and mounts the corresponding payroll, ledger, advance, and due surfaces; it does not own payroll calculations or payment transport.
"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ManagerPayrollAndLedgerPayrollTable from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerPayrollAndLedgerPayrollTable';
import ManagerPayrollAndLedgerLedgerTable from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerPayrollAndLedgerLedgerTable';
import ManagerPayrollAndLedgerAdvanceTable from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerPayrollAndLedgerAdvanceTable';
import ManagerPayrollAndLedgerDueTable from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerPayrollAndLedgerDueTable';
import ManagerPayrollAndLedgerPayrollModal from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerPayrollAndLedgerPayrollModal';
import ManagerPayrollAndLedgerPaymentModal from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/components/ManagerPayrollAndLedgerPaymentModal';
const VIEWS = ['payroll', 'ledger', 'advance', 'due'] as const;
export default function PayrollAndLedgerMain() {
 const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE'); const [view,setView] = useState<typeof VIEWS[number]>('payroll');
 return <section className="min-h-full p-4 sm:p-6 space-y-5"><h1 className="text-page-title font-extrabold text-text-primary">Payroll and Staff Ledger</h1><nav aria-label="Payroll and ledger views" className="flex w-full sm:w-fit overflow-x-auto gap-1.5 bg-card dark:bg-[#0E1526] border border-border dark:border-white/15 p-1.5 rounded-2xl shadow-card">{VIEWS.map((item) => <button key={item} type="button" aria-pressed={view===item} onClick={()=>setView(item)} className={`min-h-10 whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-xl motion-safe:transition-all cursor-pointer ${view===item?'bg-primary text-on-primary shadow-sm shadow-orange-500/25':'text-text-secondary hover:text-text-primary hover:bg-surface-hover'}`} data-testid={`manager_staff_hr-payroll-and-ledger-main-tab-${item}`}>{item==='payroll'?'Payroll':item==='ledger'?'Staff Ledger':item==='advance'?'Give Advance':'Pay Due'}</button>)}</nav>{view==='payroll' && <ManagerPayrollAndLedgerPayrollTable />}{view==='ledger' && <ManagerPayrollAndLedgerLedgerTable />}{view==='advance' && <ManagerPayrollAndLedgerAdvanceTable />}{view==='due' && <ManagerPayrollAndLedgerDueTable />}<ManagerPayrollAndLedgerPayrollModal /><ManagerPayrollAndLedgerPaymentModal /></section>;
}
