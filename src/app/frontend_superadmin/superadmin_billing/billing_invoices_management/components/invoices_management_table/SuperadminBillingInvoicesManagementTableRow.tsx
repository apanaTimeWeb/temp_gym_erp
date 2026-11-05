// RESPONSIBILITY: Renders/orchestrates SuperadminBillingInvoicesTableRow within its owning Superadmin feature module; no direct backend implementation.
'use client';


import { MessageCircle, Mail, Receipt } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

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
export default function SuperadminBillingInvoicesManagementTableRow({ invoice: inv }: SuperadminBillingInvoicesTableRowProps) {
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
    return (<tr className="hover:bg-input motion-safe:transition-colors">
      <td className="p-4 text-sm font-mono text-secondary">{displaySuperadminInvoiceValue(inv.id)}</td>
      <td className="p-4 text-sm font-bold text-primary">{displaySuperadminInvoiceValue(inv.tenantName)}</td>
      <td className="p-4 text-sm text-secondary font-mono">{displaySuperadminInvoiceValue(inv.taxId)}</td>
      <td className="p-4 text-sm text-secondary">{displaySuperadminInvoiceValue(inv.planName)}</td>
      <td className="p-4 text-sm text-secondary capitalize">{inv.invoiceType ? t(`ui.invoice_type_${String(inv.invoiceType).toLowerCase()}`) : '—'}</td>
      <td className="p-4 text-sm font-bold text-primary">{SuperadminBillingInvoicesFormatCurrency(inv.amount, inv.currency, locale)}</td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${STATUS_COLORS[inv.status] || 'bg-surface-highlight text-secondary'}`}>
          {t(`ui.status_${String(inv.status || 'unknown').toLowerCase()}`)}
        </span>
      </td>
      <td className="p-4 text-sm text-secondary">{inv.issuedAt ? formatSuperadminInvoiceDate(inv.issuedAt, locale) : '—'}</td>
      <td className="p-4 text-end flex items-center justify-end gap-2">
        <button type="button" title={t('ui.resend_to_email_737e04cb')} onClick={handleResendEmail} disabled={isResending} className="text-secondary hover:text-primary motion-safe:transition-colors p-1.5 bg-input hover:bg-primary-subtle rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" aria-label={t('ui.resend_invoice_aria', { id: inv.id })} data-testid="superadmin_billing_invoices-superadmin-invoices-table-row-row-resend-to-email">
          <Mail size={18}/>
        </button>
        <button type="button" title={t('ui.share_via_whatsapp_3c1a812c')} onClick={handleShareWhatsApp} className="text-secondary hover:text-success motion-safe:transition-colors p-1.5 bg-input hover:bg-success-bg rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" aria-label={t('ui.share_invoice_whatsapp_aria', { id: inv.id })} data-testid="superadmin_billing_invoices-superadmin-invoices-table-row-share-via-whats-app">
          <MessageCircle size={18}/>
        </button>
        <button type="button" onClick={handleDownload} disabled={isDownloading} className="text-sm font-medium text-primary hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" aria-label={t('ui.download_invoice_pdf_aria', { id: inv.id })} data-testid="superadmin_billing_invoices-superadmin-invoices-table-row-table-row-download-pdf">
          <Receipt size={18} strokeWidth={2}/> {t('ui.download_pdf_26072986')}</button>
      </td>
    </tr>);
}

