// RESPONSIBILITY: Renders ManagerMembersDirectoryProfilePayments's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Printer, MessageCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';

import { MANAGER_MEMBERS_DIRECTORY_PAYMENT_STATUS_PAID } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';
import { useFetchPayments } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryQueries';
import { ManagerMembersDirectoryFormatDate, ManagerMembersDirectoryFormatCurrency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';


/** @description Renders the ManagerMembersDirectoryProfilePayments component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerMembersDirectoryProfilePayments() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const locale = useLocale();

  const { handlePrint, handleSharePaymentWhatsApp, setShowRenewModal, setShowPaymentModal, selectedMember } = useManagerMembersDirectoryLogic();
  const { data: payments = [] } = useFetchPayments(selectedMember?.id ?? null);

  const safePayments = payments || [];
  const totalPaid = safePayments.filter(p => p.status === MANAGER_MEMBERS_DIRECTORY_PAYMENT_STATUS_PAID).reduce((s, p) => s + p.amount, 0);
  const totalDue = selectedMember?.pendingAmount || 0;

  // Sort payments chronologically (newest first)
  const sortedPayments = [...safePayments].sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime());

  return (
  <div>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
  <div data-testid="manager_members-member-profile-payments-status-total-paid" className="bg-success-bg rounded-xl p-4 border border-success">
  <p className="text-xs text-success-text">{t("COPY_TOTAL_PAID_3")}</p>
  <p className="text-xl font-bold text-success-text">{ManagerMembersDirectoryFormatCurrency(totalPaid, ManagerEnvConfig.currencyCode, locale)}</p>
  </div>
  <div data-testid="manager_members-member-profile-payments-status-total-due" className="bg-danger-bg rounded-xl p-4 border border-border">
  <p className="text-xs text-danger-text">{t("COPY_TOTAL_DUE")}</p>
  <p className="text-xl font-bold text-danger-text">{ManagerMembersDirectoryFormatCurrency(totalDue, ManagerEnvConfig.currencyCode, locale)}</p>
  </div>
  <div className="bg-primary-subtle rounded-xl p-4 border border-border">
  <p className="text-xs text-text-primary">{t("COPY_ADVANCE")}</p>
  <p className="text-xl font-bold text-text-primary">{ManagerMembersDirectoryFormatCurrency(selectedMember?.advanceAmount || 0, ManagerEnvConfig.currencyCode, locale)}</p>
  </div>
  <div data-testid="manager_members-member-profile-payments-status-count" className="bg-info-bg rounded-xl p-4 border border-info">
  <p className="text-xs text-info-text">{t("COPY_TRANSACTIONS")}</p>
  <p className="text-xl font-bold text-info-text">{safePayments.length}</p>
  </div>
  </div>
  <div className="flex justify-end mb-4 gap-3">
    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-4 py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary-subtle motion-safe:transition-all shadow-card motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-payments-button-add-payment" onClick={() => setShowPaymentModal(true)}  type="button">{t("COPY_RECORD_PAYMENT_3")}</button>
    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover motion-safe:transition-all shadow-card motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-member-profile-payments-button-renew" onClick={() => setShowRenewModal(true)}  type="button">{t("COPY_RENEW_MEMBERSHIP")}</button>
  </div>
  <div className="space-y-3">
  {sortedPayments.length === 0 && (
  <p className="text-center text-text-secondary text-sm py-4">{t("COPY_NO_PAYMENT_RECORDS_FOUND")}</p>
  )}
  {sortedPayments.map((p, mapIndex) => (
  <div key={p.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
  <div>
  <p className="text-sm font-medium text-text-primary">{p.invoiceNumber}</p>
  <p className="text-xs text-text-secondary">{t(({ UPI: 'COPY_UPI', CARD: 'COPY_CARD', CASH: 'COPY_CASH', NET_BANKING: 'COPY_NET_BANKING', NetBanking: 'COPY_NET_BANKING', Card: 'COPY_CARD', Cash: 'COPY_CASH' } as Record<string, string>)[p.method] || 'COPY_PAYMENT_METHOD_1')} · {ManagerMembersDirectoryFormatDate(p.paidAt)}</p>
 </div>
 <div className="flex items-center gap-3">
 <div className="text-right">
 <p className="text-sm font-bold text-success-text">{ManagerMembersDirectoryFormatCurrency(p.amount, ManagerEnvConfig.currencyCode, locale)}</p>
 <span className={`text-xs px-2 py-0.5 rounded-full ${
 p.status === MANAGER_MEMBERS_DIRECTORY_PAYMENT_STATUS_PAID ? 'bg-success text-on-success' 
 : 'bg-danger text-on-danger'
 }`} data-testid="manager_members-managermembersprofilepayments-status-badge-1">
 {t(({ PAID: 'COPY_PAID', PENDING: 'COPY_PENDING', DUE: 'COPY_PENDING_DUES', PARTIAL: 'COPY_PARTIAL', REFUNDED: 'COPY_REFUNDED' } as Record<string, string>)[p.status] || 'COPY_STATUS')}
 </span>
 </div>
 <div className="flex items-center gap-2">
 <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-2 rounded-lg bg-input hover:bg-success-bg text-text-secondary hover:text-success-text motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managerprofilepayments-button-share-via-whatsapp-${mapIndex}`} 
 onClick={() => handleSharePaymentWhatsApp(p)} 
 
 title={t("COPY_SHARE_VIA_WHATSAPP")}
  type="button">
 <MessageCircle size={18} strokeWidth={2}/>
 </button>
 <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-2 rounded-lg bg-input hover:bg-primary-subtle text-text-secondary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managerprofilepayments-button-print-receipt-${mapIndex}`} 
 onClick={() => handlePrint(p)} 
 
 title={t("COPY_PRINT_RECEIPT")}
  type="button">
 <Printer size={18} strokeWidth={2}/>
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}
