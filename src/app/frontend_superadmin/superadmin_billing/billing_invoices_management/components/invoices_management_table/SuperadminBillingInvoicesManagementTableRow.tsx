// RESPONSIBILITY: Renders/orchestrates SuperadminBillingInvoicesTableRow within its owning Superadmin feature module; no direct backend implementation.
'use client';


import { MessageCircle, Mail, Receipt } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import CopyButton from '@/components/ui/CopyButton';
import { SUPERADMIN_INVOICE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';
// RESPONSIBILITY: Renders and composes SuperadminBillingInvoicesTableRow for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import { SUPERADMIN_BILLING_INVOICES_MANAGEMENT_EXTERNAL } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';
import { useSuperadminBillingInvoicesManagementInvoiceActions } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementInvoiceActions';
import { displaySuperadminInvoiceValue, formatSuperadminInvoiceDate } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementDisplayUtils';
import { formatCurrency as SuperadminBillingInvoicesFormatCurrency } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormatCurrency';
import * as WhatsAppFormatter from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementWhatsappReceiptFormatter';

import type { SuperadminBillingInvoicesTableRowProps } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_table_row.types';
import type { SaaSInvoice } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types';
import type { MouseEvent } from 'react';

const STATUS_COLORS: Record<SaaSInvoice['status'], string> = {
    PAID: 'text-success bg-success-bg',
    PENDING: 'text-warning bg-warning-bg',
    FAILED: 'text-danger bg-danger-bg',
    OVERDUE: 'text-danger bg-danger-bg',
};

/** @description Renders a single invoice table row and its permitted row actions. @dependencies Receives a feature-owned invoice record and action callbacks. @edge-case Nullable paid-at and payment fields render safely without breaking row semantics. */
export default function SuperadminBillingInvoicesManagementTableRow({ invoice: inv, isSelected = false, onToggleSelect }: SuperadminBillingInvoicesTableRowProps) {
  const t = useTranslations('superadmin_billing_invoices');
    const locale = useLocale();

    const { downloadInvoice, resendInvoice, isDownloading, isResending } = useSuperadminBillingInvoicesManagementInvoiceActions();
    const handleShareWhatsApp = (e: MouseEvent) => {
        e.stopPropagation();
        const dateStr = formatSuperadminInvoiceDate(inv.issuedAt, locale);
        const waText = WhatsAppFormatter.formatReceipt({
            title: t('ui.whatsapp_invoice_title'),
            subtitle: t('ui.whatsapp_invoice_subtitle'),
            date: dateStr,
            dateLabel: t('ui.whatsapp_date_label'),
            customerInformationTitle: t('ui.whatsapp_customer_information'),
            customerInfo: {
                [t('ui.whatsapp_gym')]: inv.tenantName,
                [t('ui.whatsapp_invoice_id')]: inv.id,
            },
            sections: [
                {
                    items: {
                        [t('ui.whatsapp_plan')]: inv.planName,
                        [t('ui.whatsapp_amount')]: SuperadminBillingInvoicesFormatCurrency(inv.amount, inv.currency, locale),
                        [t('ui.whatsapp_status')]: t(`ui.status_${String(inv.status).toLowerCase()}`),
                    },
                },
            ],
            footer: inv.status === SUPERADMIN_INVOICE_STATUS_CODES.PAID ? t('ui.whatsapp_thank_you') : t('ui.whatsapp_payment_reminder'),
        });
        window.open(SUPERADMIN_BILLING_INVOICES_MANAGEMENT_EXTERNAL.WHATSAPP_SHARE(waText), '_blank', 'noopener,noreferrer');
    };
    const handleDownload = async (e: MouseEvent) => {
        e.stopPropagation();
        await downloadInvoice(inv.id);
    };
    const handleResendEmail = async (e: MouseEvent) => {
        e.stopPropagation();
        await resendInvoice(inv.id);
    };
    return (<tr
      tabIndex={0}
      className={`hover:bg-card focus-visible:bg-card motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${isSelected ? 'bg-primary-subtle border-l-4 border-l-primary' : ''}`}
      data-testid={`superadmin_billing_invoices-table-row-${inv.id}`}
    >
      {/* 1. Multi-Select Checkbox Column */}
      <td
        className="w-12 px-4 py-3 text-center sticky start-0 z-10 bg-card group-hover:bg-surface-hover border-b border-border transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          aria-label={`Select invoice ${inv.id}`}
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelect?.(inv.id);
          }}
          onClick={(e) => e.stopPropagation()}
          className="h-4 w-4 rounded border-border text-primary accent-primary cursor-pointer focus:ring-2 focus:ring-primary"
        />
      </td>

      {/* 2. Frozen Sticky Invoice ID Column */}
      <td className="sticky start-12 z-10 bg-card group-hover:bg-surface-hover group-focus-within:bg-surface-hover border-b border-e border-border px-4 py-3.5 transition-colors font-mono text-sm">
        <div className="flex items-center gap-1.5 font-mono text-sm font-semibold text-primary">
          <span>{displaySuperadminInvoiceValue(inv.id)}</span>
          <CopyButton value={inv.id} label={`Copy invoice ID ${inv.id}`} />
        </div>
      </td>

      {/* 3. Gym Name */}
      <td className="p-4 text-sm font-bold text-primary border-b border-border">
        <Link
          href={`/frontend_superadmin/superadmin_gyms/gyms_detail/${inv.tenantId}`}
          onClick={(e) => e.stopPropagation()}
          className="truncate block max-w-48 text-primary hover:text-primary-hover hover:underline transition-colors"
          title={`View ${inv.tenantName} details`}
        >
          {displaySuperadminInvoiceValue(inv.tenantName)}
        </Link>
      </td>

      {/* 4. Tax ID */}
      <td className="p-4 text-sm text-secondary font-mono border-b border-border">
        <div className="flex items-center gap-1">
          <span>{displaySuperadminInvoiceValue(inv.taxId)}</span>
          {inv.taxId ? <CopyButton value={inv.taxId} label={`Copy Tax ID ${inv.taxId}`} /> : null}
        </div>
      </td>

      {/* 5. Plan */}
      <td className="p-4 text-sm text-secondary border-b border-border">
        {inv.planName ? (
          <Link
            href={`/frontend_superadmin/superadmin_billing/billing_plans_management?search=${encodeURIComponent(inv.planName)}`}
            onClick={(e) => e.stopPropagation()}
            className="text-secondary hover:text-primary hover:underline transition-colors"
            title={`View plan ${inv.planName}`}
          >
            {displaySuperadminInvoiceValue(inv.planName)}
          </Link>
        ) : (
          '—'
        )}
      </td>

      {/* 6. Invoice Type */}
      <td className="p-4 text-sm text-secondary capitalize border-b border-border">{inv.invoiceType ? t(`ui.invoice_type_${String(inv.invoiceType).toLowerCase()}`) : '—'}</td>

      {/* 7. Amount */}
      <td className="p-4 text-sm font-bold text-primary border-b border-border">{SuperadminBillingInvoicesFormatCurrency(inv.amount, inv.currency, locale)}</td>

      {/* 8. Status */}
      <td className="p-4 border-b border-border">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${STATUS_COLORS[inv.status] || 'bg-surface-highlight text-secondary'}`}>
          {t(`ui.status_${String(inv.status || 'unknown').toLowerCase()}`)}
        </span>
      </td>

      {/* 9. Issued Date */}
      <td className="p-4 text-sm text-secondary border-b border-border">{inv.issuedAt ? formatSuperadminInvoiceDate(inv.issuedAt, locale) : '—'}</td>

      {/* 10. Actions (Rule 64 Desktop Hover Reveal) */}
      <td className="p-4 text-end border-b border-border whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 motion-safe:transition-opacity">
          <button type="button" title={t('ui.resend_to_email_737e04cb')} onClick={handleResendEmail} disabled={isResending} className="text-secondary hover:text-primary motion-safe:transition-colors p-1.5 bg-input hover:bg-primary-subtle rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-9 min-w-9 flex items-center justify-center cursor-pointer" aria-label={t('ui.resend_invoice_aria', { id: inv.id })} data-testid="superadmin_billing_invoices-superadmin-invoices-table-row-row-resend-to-email">
            <Mail size={16}/>
          </button>
          <button type="button" title={t('ui.share_via_whatsapp_3c1a812c')} onClick={handleShareWhatsApp} className="text-secondary hover:text-success motion-safe:transition-colors p-1.5 bg-input hover:bg-success-bg rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-9 min-w-9 flex items-center justify-center cursor-pointer" aria-label={t('ui.share_invoice_whatsapp_aria', { id: inv.id })} data-testid="superadmin_billing_invoices-superadmin-invoices-table-row-share-via-whats-app">
            <MessageCircle size={16}/>
          </button>
          <button type="button" onClick={handleDownload} disabled={isDownloading} className="text-xs font-semibold text-primary hover:bg-primary-subtle border border-border px-2.5 py-1.5 rounded-md flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-9 cursor-pointer motion-safe:transition-colors" aria-label={t('ui.download_invoice_pdf_aria', { id: inv.id })} data-testid="superadmin_billing_invoices-superadmin-invoices-table-row-table-row-download-pdf">
            <Receipt size={16} strokeWidth={2}/> <span>{t('ui.download_pdf_26072986')}</span>
          </button>
        </div>
      </td>
    </tr>);
}

