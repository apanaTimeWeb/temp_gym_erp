// RESPONSIBILITY: Renders the Daily Collection Report / Cashier Day-End Tally for the Manager Finance module.
'use client';
import { DollarSign, Smartphone, CreditCard, Banknote, FileSpreadsheet, Printer } from 'lucide-react';
import { useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { useManagerFinancePaymentsAndSummaryLogic } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryLogic';
import { ManagerFinancePaymentsAndSummaryFormatCurrency, ManagerFinancePaymentsAndSummaryFormatDate } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryFormatters';

export default function ManagerFinancePaymentsAndSummaryDailyCollectionReport() {
  const locale = useLocale();
  const formatCurrency = (val: number) => ManagerFinancePaymentsAndSummaryFormatCurrency(val, ManagerEnvConfig.currencyCode, locale);
  const { payments } = useManagerFinancePaymentsAndSummaryLogic();

  // Aggregate collections by method for today / loaded dataset
  const upiTotal = payments.filter((p) => p.method === 'UPI').reduce((sum, p) => sum + p.amount, 0);
  const cashTotal = payments.filter((p) => p.method === 'Cash').reduce((sum, p) => sum + p.amount, 0);
  const cardTotal = payments.filter((p) => p.method === 'Card').reduce((sum, p) => sum + p.amount, 0);
  const netbankingTotal = payments.filter((p) => p.method === 'NetBanking' || p.method === 'Cheque').reduce((sum, p) => sum + p.amount, 0);
  const dayTotal = payments.reduce((sum, p) => sum + p.amount, 0);

  const TABLE_HEADERS = ['Invoice #', 'Member', 'Payment Method', 'Amount', 'Status', 'Date & Time'];

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden" data-testid="manager_finance-daily-collection-report">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-overlay">
        <div>
          <h2 className="text-base font-bold text-text-primary">Daily Collection Register & Cashier Day-End Tally</h2>
          <p className="text-xs text-text-secondary mt-0.5">Real-time daily transaction breakdown by tender mode (Cash drawer, UPI, POS Card, Bank).</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-input text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-hover"
          >
            <Printer size={14} aria-hidden="true" />
            Print Day-End Tally
          </button>
        </div>
      </div>

      {/* KPI Breakdown Cards */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border-b border-border bg-surface/50">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <DollarSign size={16} aria-hidden="true" />
            Total Day Collection
          </div>
          <p className="text-xl font-bold text-text-primary">{formatCurrency(dayTotal)}</p>
          <p className="text-[11px] text-text-muted mt-0.5">{payments.length} transactions total</p>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Banknote size={16} aria-hidden="true" />
            Cash In Drawer
          </div>
          <p className="text-xl font-bold text-success-text">{formatCurrency(cashTotal)}</p>
          <p className="text-[11px] text-text-muted mt-0.5">Physical cashier tally</p>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Smartphone size={16} aria-hidden="true" />
            UPI / QR Dynamic
          </div>
          <p className="text-xl font-bold text-info">{formatCurrency(upiTotal)}</p>
          <p className="text-[11px] text-text-muted mt-0.5">Direct bank transfer</p>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-1">
            <CreditCard size={16} aria-hidden="true" />
            Card / POS Terminal
          </div>
          <p className="text-xl font-bold text-amber-600">{formatCurrency(cardTotal)}</p>
          <p className="text-[11px] text-text-muted mt-0.5">EDC machine swipe</p>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-text-secondary text-xs font-bold uppercase tracking-wider mb-1">
            <FileSpreadsheet size={16} aria-hidden="true" />
            NetBanking / Cheque
          </div>
          <p className="text-xl font-bold text-text-primary">{formatCurrency(netbankingTotal)}</p>
          <p className="text-[11px] text-text-muted mt-0.5">NEFT / RTGS settlement</p>
        </div>
      </div>

      {/* Transaction List */}
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
              {payments.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-primary-subtle/30">
                  <td className="px-5 py-3.5 text-sm font-mono font-bold text-text-primary">{p.invoiceNumber}</td>
                  <td className="px-5 py-3.5 text-sm text-text-primary">{p.member?.name || `Member #${p.memberId}`}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-input text-text-primary border border-border">
                      {p.method}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-success-text whitespace-nowrap">{formatCurrency(p.amount)}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success-text">
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-text-secondary whitespace-nowrap">{ManagerFinancePaymentsAndSummaryFormatDate(p.paidAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ManagerInfrastructureResponsiveTable>
      </div>
    </div>
  );
}

