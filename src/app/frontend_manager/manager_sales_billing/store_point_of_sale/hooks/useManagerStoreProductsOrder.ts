// DATA FLOW: POS UI → confirmed order mutation → authoritative Store API response → print/WhatsApp/reset UI.
'use client';
import { MANAGER_STORE_PRODUCTS_API } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/config/manager_sales_billing_store_point_of_sale.url_config';
import { useLocale, useTranslations } from 'next-intl';

import { MANAGER_STORE_PRODUCTS_ORDERS_VIEW } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/constants/manager_store_products_view.constants';

import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import type { ManagerConfirmType } from '@/components/ui/manager_confirm_modal/ManagerConfirmModalTypes';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { GYM_DETAILS } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGymIdentity';



import { useManagerStoreProductsOrderMutations } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/hooks/useManagerStoreProductsOrderMutations';
import { useManagerStoreProductsUiStore } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/state/useManagerStoreProductsUiStore';
import { ManagerStoreProductsFormatCurrency, ManagerStoreProductsFormatDate } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/utils/ManagerStoreProductsFormatters';
import type { ManagerStoreProductsReceiptData } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/types/manager_store_products_thermal_receipt.types';
import type { OrderItem } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/types/manager_sales_billing_store_point_of_sale.types';

/**
 * @description Owns the Store POS draft and delegates order server mutation behavior to a dedicated mutation hook.
 * @dependencies Uses Store UI state, confirmation guard, locale-aware formatters, and useManagerStoreProductsOrderMutations.
 * @edge-case Reuses the same idempotency key across a retry of one confirmed order intent and clears it only after authoritative success or abandonment.
 */
export function useManagerStoreProductsOrder(
  setTab: (tab: typeof MANAGER_STORE_PRODUCTS_ORDERS_VIEW) => void,
  showToast: (message: string, type: ManagerToastType) => void,
  setPrintData: (data: ManagerStoreProductsReceiptData) => void,
  confirm: (args: { title: string; message: string; confirmText: string; cancelText: string; type: ManagerConfirmType }) => Promise<boolean>,
) {
  const ui = useManagerStoreProductsUiStore();
  const t = useTranslations('MANAGER_STORE_PRODUCTS');
  const locale = useLocale();
  const hasDraftChanges = ui.orderItems.length > 0 || ui.customerPhone.length > 0 || ui.sendViaWhatsapp;
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(hasDraftChanges);
  const orderTotal = ui.orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const mutations = useManagerStoreProductsOrderMutations(
    ui.orderItems,
    ui.orderMethod,
    '',
    ui.sendViaWhatsapp,
    orderTotal,
    async (response) => {
      setTab(MANAGER_STORE_PRODUCTS_ORDERS_VIEW);
      showToast(response.message, 'success');
      if (ui.sendViaWhatsapp && ui.customerPhone) {
        const itemsRecord = ui.orderItems.reduce<Record<string, string>>((acc, item) => {
          acc[`${item.qty}x ${item.name}`] = ManagerStoreProductsFormatCurrency(item.price * item.qty, ManagerEnvConfig.currencyCode, locale);
          return acc;
        }, {});
        const waText = WhatsAppFormatter.formatReceipt({
          title: GYM_DETAILS.name,
          subtitle: t('TEXT_RETAIL_INVOICE'),
          date: ManagerStoreProductsFormatDate(new Date().toISOString()),
          customerInfo: { Phone: ui.customerPhone, 'Order ID': response.data?.id || t('TEXT_PENDING') },
          sections: [{ title: 'Items', items: itemsRecord }, { items: { Total: ManagerStoreProductsFormatCurrency(orderTotal, ManagerEnvConfig.currencyCode, locale), Payment: ui.orderMethod } }],
          footer: t('TEXT_THANK_YOU_VISIT_AGAIN'),
        });
        const rawPhone = ui.customerPhone.replace(/\D/g, '');
        const cleanPhone = rawPhone.startsWith('91') && rawPhone.length === 12
          ? rawPhone
          : rawPhone.length === 10
          ? `91${rawPhone}`
          : rawPhone;
        const target = cleanPhone ? `/${cleanPhone}` : '';
        const popup = window.open(`${MANAGER_STORE_PRODUCTS_API.INTEGRATIONS.WHATSAPP_WEB_BASE}${target}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');
        if (popup) popup.opener = null;
      } else {
        setPrintData({
          gymName: GYM_DETAILS.name,
          gymPhone: GYM_DETAILS.phone,
          receiptNo: response.data?.id || t('TEXT_PENDING'),
          date: ManagerStoreProductsFormatDate(new Date().toISOString()),
          customerName: ui.customerPhone || t('TEXT_WALK_IN'),
          items: ui.orderItems.map((item: OrderItem) => ({ name: item.unit ? `${item.name} (${item.unit})` : item.name, price: item.price, amount: item.price * item.qty })),
          total: orderTotal,
          paymentMethod: ui.orderMethod,
        });
        window.setTimeout(() => window.print(), 100);
      }
      ui.resetOrder();
    },
  );

  const addToOrder = (product: { id: string; name: string; price: number; unit?: string }) => ui.setOrderItems((prev) => prev.some((item) => item.productId === product.id) ? prev : [...prev, { productId: product.id, qty: 1, name: product.name, price: product.price, unit: product.unit }]);
  const removeFromOrder = (productId: string) => ui.setOrderItems((prev) => prev.filter((item) => item.productId !== productId));
  const updateOrderQty = (productId: string, qty: number) => { if (qty <= 0) return removeFromOrder(productId); ui.setOrderItems((prev) => prev.map((item) => item.productId === productId ? { ...item, qty } : item)); };
  const placeOrder = async () => {
    if (!ui.orderItems.length) return;
    const confirmed = await confirm({
      title: t('CONFIRM_SALE_TITLE'),
      message: t('CONFIRM_SALE_MESSAGE'),
      confirmText: t('CONFIRM_SALE'),
      cancelText: t('KEEP_EDITING'),
      type: 'warning',
    });
    if (confirmed) await mutations.placeOrder();
  };
  const closeOrderModal = async () => { await confirmAndClose(() => { mutations.resetIdempotency(); ui.resetOrder(); }); };
  return {
    showOrderModal: ui.showOrderModal,
    setShowOrderModal: ui.setShowOrderModal,
    closeOrderModal,
    orderItems: ui.orderItems,
    setOrderItems: ui.setOrderItems,
    orderMethod: ui.orderMethod,
    setOrderMethod: ui.setOrderMethod,
    customerPhone: ui.customerPhone,
    setCustomerPhone: ui.setCustomerPhone,
    sendViaWhatsapp: ui.sendViaWhatsapp,
    setSendViaWhatsapp: ui.setSendViaWhatsapp,
    addToOrder,
    removeFromOrder,
    updateOrderQty,
    orderTotal,
    placeOrder,
    isPlacingOrder: mutations.isPlacingOrder,
  };
}
