// RESPONSIBILITY: Renders the Defaulters List / Overdue Dues Register for Manager Finance.
'use client';
import { AlertTriangle, MessageCircle, Banknote, Calendar } from 'lucide-react';
import { useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { useManagerFinancePaymentsAndSummaryUiStore } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/state/useManagerFinancePaymentsAndSummaryUiStore';
import { ManagerFinancePaymentsAndSummaryFormatCurrency } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryFormatters';

interface DefaulterRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  planName: string;
  dueAmount: number;
  dueDate: string;
  daysOverdue: number;
  lastReminderSent?: string;
}

const DEFAULT_DEFAULTERS: DefaulterRecord[] = [
  {
    id: 'def-1',
    memberId: 'mem-102',
    memberName: 'Karan Malhotra',
    memberPhone: '9876543210',
    planName: 'Gold Annual Membership',
    dueAmount: 5000,
    dueDate: '2026-10-25',
    daysOverdue: 16,
    lastReminderSent: '2026-11-05',
  },
  {
    id: 'def-2',
    memberId: 'mem-108',
    memberName: 'Deepak Chopra',
    memberPhone: '9812345678',
    planName: 'Quarterly Strength Pack',
    dueAmount: 3200,
    dueDate: '2026-11-01',
    daysOverdue: 9,
  },
  {
    id: 'def-3',
    memberId: 'mem-115',
    memberName: 'Simran Kaur',
    memberPhone: '9845678901',
    planName: 'Monthly Personal Training (10 Sessions)',
    dueAmount: 4500,
    dueDate: '2026-10-20',
    daysOverdue: 21,
    lastReminderSent: '2026-11-08',
  },
  {
    id: 'def-4',
    memberId: 'mem-122',
    memberName: 'Vikas Gupta',
    memberPhone: '9890123456',
    planName: 'Annual VIP All-Access',
    dueAmount: 8000,
    dueDate: '2026-10-10',
    daysOverdue: 31,
  },
];

export default function ManagerFinancePaymentsAndSummaryDefaultersList() {
  const locale = useLocale();
  const formatCurrency = (val: number) => ManagerFinancePaymentsAndSummaryFormatCurrency(val, ManagerEnvConfig.currencyCode, locale);
  const setShowModal = useManagerFinancePaymentsAndSummaryUiStore((s) => s.setShowModal);

  const totalOverdue = DEFAULT_DEFAULTERS.reduce((sum, d) => sum + d.dueAmount, 0);
  const TABLE_HEADERS = ['Member Name & Phone', 'Membership Plan', 'Overdue Amount', 'Due Date', 'Days Overdue', 'Actions'];

  const sendWhatsAppReminder = (def: DefaulterRecord) => {
    const text = encodeURIComponent(
      `Hello ${def.memberName}, this is a gentle reminder from Smart Gym regarding your pending balance of ${formatCurrency(def.dueAmount)} for ${def.planName}. Kindly clear your dues at the earliest.`
    );
    window.open(`https://wa.me/91${def.memberPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden" data-testid="manager_finance-defaulters-list">
      <div className="px-6 py-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-overlay">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-danger-text shrink-0" aria-hidden="true" />
            <h2 className="text-base font-bold text-text-primary">Defaulter List & Overdue Collection Register</h2>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">Members with unpaid balances, overdue installments, and payment recovery triggers.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-secondary font-medium">Total Overdue Dues</p>
          <p className="text-lg font-bold text-danger-text">{formatCurrency(totalOverdue)}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={TABLE_HEADERS}>
          <table className="w-full text-left">
            <thead className="bg-primary-subtle border-b border-border">
              <tr>
                {TABLE_HEADERS.map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DEFAULT_DEFAULTERS.map((d) => (
                <tr key={d.id} className="hover:bg-primary-subtle/30">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="text-sm font-semibold text-text-primary">{d.memberName}</p>
                    <p className="text-xs font-mono text-text-secondary">+91 {d.memberPhone}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-text-primary whitespace-nowrap">{d.planName}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-danger-text whitespace-nowrap">{formatCurrency(d.dueAmount)}</td>
                  <td className="px-5 py-3.5 text-xs text-text-secondary whitespace-nowrap">{d.dueDate}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      d.daysOverdue > 30 ? 'bg-danger text-on-danger' : 'bg-warning-bg text-warning-text'
                    }`}>
                      {d.daysOverdue} days overdue
                    </span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => sendWhatsAppReminder(d)}
                        title="Send WhatsApp Payment Reminder"
                        className="p-1.5 rounded-lg bg-success text-on-success hover:brightness-110 active:scale-95 transition-all"
                      >
                        <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        title="Collect Due Payment"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:brightness-110 active:scale-95 transition-all"
                      >
                        <Banknote size={14} strokeWidth={2} aria-hidden="true" />
                        Collect Due
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ManagerInfrastructureResponsiveTable>
      </div>
    </div>
  );
}
