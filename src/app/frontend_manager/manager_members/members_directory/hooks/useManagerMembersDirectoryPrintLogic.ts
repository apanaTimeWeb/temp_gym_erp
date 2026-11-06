// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { MANAGER_MEMBERS_DIRECTORY_API } from '@/app/frontend_manager/manager_members/members_directory/config/manager_members_directory.url_config';
import { useCallback } from 'react';

import { useLocale } from 'next-intl';

import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import type { ManagerToastType } from '@/app/frontend_manager/manager_members/members_directory/types/ManagerMembersDirectoryLocalToastTypes';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';
import { GYM_DETAILS } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalGymIdentity';



import { useManagerMembersDirectoryUiStore } from '@/app/frontend_manager/manager_members/members_directory/state/useManagerMembersDirectoryUiStore';
import { ManagerMembersDirectoryFormatDate, ManagerMembersDirectoryFormatCurrency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';
import type { PaymentSnapshot } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_snapshot.types';
import type { Member } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

/** Manages UseMembersPrintLogic for the Manager module. */


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersDirectoryPrintLogic.
 * @dependencies Uses ManagerMembersDirectoryFormatters, ManagerEnvConfig, ManagerGymIdentity, useManagerMembersDirectoryUiStore.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersDirectoryPrintLogic owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersDirectoryPrintLogic(
  selectedMember: Member | null,
  showToast: (msg: string, t: ManagerToastType) => void
) {
  const setPrintData = useManagerMembersDirectoryUiStore((state) => state.setPrintData);
  const locale = useLocale();

  const handlePrint = useCallback((p: PaymentSnapshot) => {
    if (!selectedMember) return;
    const m = selectedMember;
    setPrintData({
      gymName: GYM_DETAILS.name, gymPhone: GYM_DETAILS.phone,
      receiptNo: p.invoiceNumber,
      date: ManagerMembersDirectoryFormatDate(p.paidAt),
      customerName: m.name,
      items: [{ name: `Membership - ${m.plan?.name || ''}`, price: p.amount, amount: p.amount }],
      total: p.amount, paymentMethod: p.method });
    if (typeof window !== 'undefined') setTimeout(() => window.print(), 100);
  }, [selectedMember]);

  const handleSharePaymentWhatsApp = useCallback((p: PaymentSnapshot) => {
    if (!selectedMember) return;
    const m = selectedMember;
    
    const waText = WhatsAppFormatter.formatReceipt({
      title: GYM_DETAILS.name,
      subtitle: 'Payment Receipt',
      date: ManagerMembersDirectoryFormatDate(p.paidAt),
      customerInfo: {
        'Member': m.name,
        'Invoice': p.invoiceNumber },
      sections: [
        {
          items: {
            'Membership': m.plan?.name || 'Standard',
            'Amount': ManagerMembersDirectoryFormatCurrency(p.amount, ManagerEnvConfig.currencyCode, locale),
            'Method': p.method
          }
        },
        {
          items: {
            'Status': p.status
          }
        }
      ],
      footer: 'Thank you for your payment!'
    });

    const rawPhone = m.phone?.replace(/\D/g, '') || '';
    const cleanPhone = rawPhone.startsWith('91') && rawPhone.length === 12
      ? rawPhone
      : rawPhone.length === 10
      ? `91${rawPhone}`
      : rawPhone;
    const target = cleanPhone ? `/${cleanPhone}` : '';
    const popup = window.open(`${MANAGER_MEMBERS_DIRECTORY_API.INTEGRATIONS.WHATSAPP_WEB_BASE}${target}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');
    if (popup) popup.opener = null;
  }, [locale, selectedMember, showToast]);

  return {
    printData: useManagerMembersDirectoryUiStore((state) => state.printData),
    setPrintData,
    handlePrint,
    handleSharePaymentWhatsApp
  };
}
