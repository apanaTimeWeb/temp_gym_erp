// RESPONSIBILITY: Renders ManagerStoreProductsOrderTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import ManagerStoreOrderManagementEmptyState from '@/app/frontend_manager/manager_sales_billing/store_order_management/components/ManagerStoreOrderManagementEmptyState';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { MANAGER_STORE_PRODUCTS_API } from '@/app/frontend_manager/manager_sales_billing/store_order_management/config/manager_sales_billing_store_order_management.url_config';
import { Printer, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructurePaginationDefaults';
import { GYM_DETAILS } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGymIdentity';



import { useManagerStoreProductsLogic } from '@/app/frontend_manager/manager_sales_billing/store_order_management/hooks/useManagerStoreProductsLogic';
import { ManagerStoreProductsFormatCurrency, ManagerStoreProductsFormatDate } from '@/app/frontend_manager/manager_sales_billing/store_order_management/utils/ManagerStoreProductsFormatters';
import type { Order } from '@/app/frontend_manager/manager_sales_billing/store_order_management/types/manager_sales_billing_store_order_management.types';
import { MANAGER_STORE_PRODUCTS_STATUS_VALUES } from '@/app/frontend_manager/manager_sales_billing/store_order_management/constants/manager_store_products.constants';
import { STORE_PENDING_ORDER_STATUS } from '@/app/frontend_manager/manager_sales_billing/store_order_management/constants/manager_store_products_shared.constants';


/**
 * @description Renders/orchestrates the ManagerStoreProductsOrderTable user interface for the store module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_sales_billing/manager_store_utils/ManagerStoreProductsFormatters; @/components/ui/manager_pagination/ManagerPagination; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerEnvConfig; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerGymIdentity; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerPaginationDefaults
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const STORE_ORDER_COLUMN_COUNT = 6;

/** @description Renders the ManagerStoreProductsOrderTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerStoreProductsOrderTable() {
  const t = useTranslations('MANAGER_STORE_PRODUCTS');
  const locale = useLocale();

  const { 
    orders, totalOrders, isPending, isError, errorMessage, currentPage, setCurrentPage, setPrintData, printData, search, setSearch
  } = useManagerStoreProductsLogic();

  const handlePrint = (o: Order) => {
    setPrintData({ 
      gymName: GYM_DETAILS.name, 
      gymPhone: GYM_DETAILS.phone, 
      receiptNo: `ORD-${o.id}`, 
      date: ManagerStoreProductsFormatDate(o.createdAt), 
      customerName: t('COPY_CUSTOMER'), 
      items: (o.items || []).map((i) => ({ 
        qty: i.qty,
        name: (() => { if (i.product?.name) { return (i.product?.unit ? `${i.product.name} (${i.product.unit})` : i.product.name); } return ''; })(), 
        price: i.price, 
        amount: i.price * i.qty 
      })), 
      total: o.total, 
      paymentMethod: o.method 
    });
  };

  useEffect(() => {
    if (!printData) return;
    const printTimer = window.setTimeout(() => {
      if (typeof window.print === 'function') window.print();
    }, 100);
    const clearReceipt = () => setPrintData(null);
    window.addEventListener('afterprint', clearReceipt);
    return () => {
      window.clearTimeout(printTimer);
      window.removeEventListener('afterprint', clearReceipt);
    };
  }, [printData, setPrintData]);

  const handleWhatsApp = (o: Order) => {
    const itemsText = (o.items || []).map(i => {
      const name = (() => { if (i.product?.name) { return (i.product?.unit ? `${i.product.name} (${i.product.unit})` : i.product.name); } return ''; })();
      return `- ${name}\n  ${i.qty} x ${ManagerStoreProductsFormatCurrency(i.price, ManagerEnvConfig.currencyCode, locale)} = ${ManagerStoreProductsFormatCurrency(i.qty * i.price, ManagerEnvConfig.currencyCode, locale)}`;
    }).join('\n');

    const text = `*${GYM_DETAILS.name.toUpperCase()}*\nPh: ${GYM_DETAILS.phone}\n\n*PAYMENT RECEIPT*\nReceipt No: ORD-${o.id}\nDate: ${ManagerStoreProductsFormatDate(o.createdAt)}\n\n*ITEMS:*\n${itemsText}\n\n*TOTAL: ${ManagerStoreProductsFormatCurrency(o.total, ManagerEnvConfig.currencyCode, locale)}*\nPaid via: ${o.method}\n\nThank You!`;
    const url = `${MANAGER_STORE_PRODUCTS_API.INTEGRATIONS.WHATSAPP_WEB_BASE}/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  
  const totalPages = Math.ceil(totalOrders / MANAGER_ITEMS_PER_PAGE);

  if (isPending) {
    return (
      <div className="motion-safe:animate-pulse bg-card rounded-xl border border-border mt-4">
        {[...Array(5)].map((_, i) => (
          <div key={`skeleton-${i}`} className="h-16 border-b border-border flex items-center px-4 gap-4">
            <div className="h-4 bg-input rounded w-16"></div>
            <div className="h-4 bg-input rounded w-24"></div>
            <div className="h-4 bg-input rounded w-20"></div>
            <div className="h-6 bg-input rounded-full w-20"></div>
            <div className="h-6 bg-input rounded-full w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger mt-4">
        <p className="text-danger-text font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <span className="text-sm text-text-secondary">{t("COPY_RETRY_REQUEST_2")}</span>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col h-full min-h-96 print:hidden">
      <label htmlFor="manager-store-orders-search" className="sr-only">{t('COPY_SEARCH')}</label>
      <input id="manager-store-orders-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('COPY_SEARCH')} className="min-h-11 w-full max-w-sm rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
      <div className="overflow-x-auto flex-1 bg-card rounded-xl border border-border">
        <ManagerInfrastructureResponsiveTable labels={[t('COPY_ORDER_ID'), t('COPY_TOTAL_1'), t('COPY_METHOD'), t('COPY_STATUS'), t('COPY_DATE_2'), t('COPY_RECEIPT')]}>
<table className="w-full">
          <thead className="bg-input">
            <tr>
              {[t('COPY_ORDER_ID'), t('COPY_TOTAL_1'), t('COPY_METHOD'), t('COPY_STATUS'), t('COPY_DATE_2'), t('COPY_RECEIPT')].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o, mapIndex) => (
              <tr
                data-testid={`manager_store-store-managerstoreordertable-row-${o.id}`}
                key={o.id} 
                className="hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-200 ease-in-out"
              >
                <td className="px-4 py-3 text-sm font-mono text-text-primary">{t("COPY_ORD")}{String(o.id).padStart(4, '0')}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-success-text ">
                  {ManagerStoreProductsFormatCurrency(o.total, ManagerEnvConfig.currencyCode, locale)}
                </td>
                <td className="px-4 py-3 text-sm text-text-primary">
                  {o.method}
                </td>
                <td className="px-4 py-3">
                  <span data-testid={`manager_store-store-managerstoreordertable-status-primary-${mapIndex}`} className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${o.status === MANAGER_STORE_PRODUCTS_STATUS_VALUES.COMPLETED ? 'bg-success text-on-success' : o.status === STORE_PENDING_ORDER_STATUS ? 'bg-warning-bg text-warning-text' : 'bg-surface text-text-secondary'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {ManagerStoreProductsFormatDate(o.createdAt)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 inline-flex items-center justify-center p-1.5 rounded-lg bg-success text-on-success hover:bg-success motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreordertable-button-whatsapp-receipt-${mapIndex}`} 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsApp(o);
                      }}
                      
                      aria-label={t("TEXT_WHATSAPP_RECEIPT_ORDER", { value: `ORD-${o.id}` })}
                      title={t("COPY_SEND_VIA_WHATSAPP")}
                     type="button">
                      <MessageCircle size={18} strokeWidth={2}/>
                    </button>
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 inline-flex items-center justify-center p-1.5 rounded-lg bg-input text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreordertable-button-print-receipt-${mapIndex}`} 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrint(o);
                      }}
                      
                      aria-label={t("TEXT_PRINT_RECEIPT_ORDER", { value: `ORD-${o.id}` })}
                      title={t("COPY_PRINT_RECEIPT")}
                     type="button">
                      <Printer size={18} strokeWidth={2}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={STORE_ORDER_COLUMN_COUNT}><ManagerStoreOrderManagementEmptyState message={t("COPY_NO_ORDERS_FOUND")} /></td>
              </tr>
            )}
          </tbody>
        </table>
</ManagerInfrastructureResponsiveTable>
      </div>
      <ManagerPagination data-testid="manager_store-managerstoreordertable-managerpagination-1" 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalOrders} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
    {printData && (
      <section id="store-order-print-receipt" aria-label={t('COPY_PAYMENT_RECEIPT')} className="hidden print:block mx-auto w-full max-w-[80mm] bg-page p-4 font-mono text-sm text-text-primary">
        <header className="mb-3 border-b border-border pb-3 text-center">
          <h1 className="text-lg font-bold uppercase">{printData.gymName}</h1>
          <p className="text-xs">{t('COPY_PH')}{printData.gymPhone}</p>
          <h2 className="mt-2 font-bold">{t('COPY_PAYMENT_RECEIPT')}</h2>
        </header>
        <div className="mb-3 space-y-1 text-xs">
          <p><strong>{t('COPY_RECEIPT_NO')}</strong> {printData.receiptNo}</p>
          <p><strong>{t('COPY_DATE_1')}</strong> {printData.date}</p>
          <p><strong>{t('COPY_MEMBER')}</strong> {printData.customerName}</p>
        </div>
        <table className="mb-3 w-full text-xs">
          <thead><tr><th className="py-1 text-left">{t('COPY_DESCRIPTION_1')}</th><th className="py-1 text-right">{t('COPY_AMOUNT')}</th></tr></thead>
          <tbody>{printData.items.map((item, index) => <tr key={`${item.name}-${item.price}-${index}`}><td className="py-1 pr-2">{item.name}{item.qty && item.qty > 1 ? <span className="block">{item.qty}{t('COPY_X')}{ManagerStoreProductsFormatCurrency(item.price, ManagerEnvConfig.currencyCode, locale)}</span> : null}</td><td className="py-1 text-right">{ManagerStoreProductsFormatCurrency(item.amount, ManagerEnvConfig.currencyCode, locale)}</td></tr>)}</tbody>
        </table>
        <div className="mb-3 flex justify-between border-t border-border pt-2 font-bold"><span>{t('COPY_TOTAL_2')}</span><span>{ManagerStoreProductsFormatCurrency(printData.total, ManagerEnvConfig.currencyCode, locale)}</span></div>
        <p className="text-xs"><strong>{t('COPY_PAID_VIA')}</strong> {printData.paymentMethod}</p>
        <footer className="mt-4 border-t border-border pt-3 text-center font-bold">{t('COPY_THANK_YOU')}</footer>
      </section>
    )}
    </>
  );
}
