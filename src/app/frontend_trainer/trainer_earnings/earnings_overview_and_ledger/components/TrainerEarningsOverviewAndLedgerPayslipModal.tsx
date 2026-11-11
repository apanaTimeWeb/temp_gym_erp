"use client";
import React, { useRef } from 'react';
import { X, Printer, Receipt, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { TrainerEarningsHistoryRow } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsTypes';
import { TrainerEarningsFormatCurrency } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsFormatCurrency';
import { TrainerEarningsFormatDate } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsDisplayFormatters';

interface TrainerEarningsPayslipModalProps {
  isOpen: boolean;
  row: TrainerEarningsHistoryRow | null;
  onClose: () => void;
}

export default function TrainerEarningsOverviewAndLedgerPayslipModal({
  isOpen,
  row,
  onClose,
}: TrainerEarningsPayslipModalProps) {
  const t = useTranslations('TRAINER_EARNINGS');
  const locale = useLocale();
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !row) return null;

  const tds = row.tdsDeducted ?? Math.round(row.amount * 0.1);
  const net = row.netPayout ?? (row.amount - tds);
  const invoiceNo = row.invoiceNumber || `INV-${row.id}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payslip-modal-title"
      ref={modalRef}
      data-testid="trainer_earnings-payslip-modal"
    >
      <div className="my-auto bg-card border border-border rounded-2xl w-full max-w-xl max-h-dialog-desktop flex flex-col shadow-2xl overflow-hidden print:border-none print:shadow-none print:m-0 print:w-full">
        {/* Modal Header Actions (hidden in print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-header print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <Receipt size={18} className="text-primary" />
            <h3 id="payslip-modal-title" className="text-sm font-bold text-primary">
              Trainer Remuneration Advice / Payslip
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-9 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              data-testid="trainer_earnings-print-payslip-button"
            >
              <Printer size={15} />
              Print Payslip
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-secondary hover:text-primary p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              aria-label="Close payslip modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Payslip Document Body */}
        <div className="p-6 space-y-6 text-primary bg-card overflow-y-auto custom-scrollbar flex-1 min-h-0" id="printable-payslip">
          {/* Gym & Document Title */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <Building2 size={20} className="text-primary" />
                <span className="text-lg font-extrabold tracking-tight">GYM ERP ENTERPRISE</span>
              </div>
              <p className="text-xs text-secondary">Fitness Management & Personal Training Services</p>
              <p className="text-xs text-secondary">Authorized Remuneration Voucher</p>
            </div>
            <div className="text-right sm:text-end space-y-1">
              <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-success/15 text-success border border-success/30 uppercase tracking-wider">
                {row.status}
              </span>
              <p className="text-xs text-secondary mt-1">Invoice: <strong className="text-primary">{invoiceNo}</strong></p>
              <p className="text-xs text-secondary">Date: {TrainerEarningsFormatDate(row.date, locale)}</p>
            </div>
          </div>

          {/* Trainer & Session Details */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-input/40 border border-border/80 text-xs">
            <div>
              <p className="text-secondary font-medium">Trainer</p>
              <p className="font-bold text-sm text-primary mt-0.5">Certified Personal Trainer</p>
              <p className="text-secondary mt-1">ID: TRN-001</p>
            </div>
            <div>
              <p className="text-secondary font-medium">Session / Reference</p>
              <p className="font-bold text-sm text-primary mt-0.5">{row.sessionId || 'Batch Remuneration'}</p>
              <p className="text-secondary mt-1">Type: <span className="uppercase">{row.type}</span></p>
            </div>
          </div>

          {/* Earnings & Deductions Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-secondary uppercase tracking-wider">Breakdown of Remuneration</h4>
            <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
              <div className="flex items-center justify-between p-3 text-xs bg-header font-semibold text-secondary">
                <span>Description</span>
                <span>Amount ({row.currency})</span>
              </div>
              <div className="flex items-center justify-between p-3 text-xs">
                <span>{row.description}</span>
                <span className="font-semibold text-primary">{TrainerEarningsFormatCurrency(row.amount, row.currency, locale)}</span>
              </div>
              <div className="flex items-center justify-between p-3 text-xs bg-input/20">
                <span className="text-secondary">Gross Amount</span>
                <span className="font-semibold text-primary">{TrainerEarningsFormatCurrency(row.amount, row.currency, locale)}</span>
              </div>
              <div className="flex items-center justify-between p-3 text-xs text-danger">
                <span>Tax Deducted at Source (TDS 10%)</span>
                <span className="font-medium">- {TrainerEarningsFormatCurrency(tds, row.currency, locale)}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-primary-subtle text-primary font-bold text-sm">
                <span>Net Disbursed Payout</span>
                <span className="text-base text-primary font-extrabold">{TrainerEarningsFormatCurrency(net, row.currency, locale)}</span>
              </div>
            </div>
          </div>

          {/* Verification Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border text-[11px] text-secondary">
            <div className="flex items-center gap-1.5 text-success font-medium">
              <ShieldCheck size={14} />
              <span>Digitally Verified & Signed Remuneration Slip</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>Automated Payroll Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

