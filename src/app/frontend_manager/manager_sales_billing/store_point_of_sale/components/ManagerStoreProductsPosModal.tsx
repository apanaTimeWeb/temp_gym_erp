// RESPONSIBILITY: Renders ManagerStoreProductsPosModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';
import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import { Loader2, X, Printer, Plus, Minus, Send } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import ManagerStorePointOfSaleEmptyState from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/components/ManagerStorePointOfSaleEmptyState';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { PAYMENT_METHODS } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/constants/manager_store_products_shared.constants';
import { useManagerStoreProductsLogic } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/hooks/useManagerStoreProductsLogic';
import { ManagerStoreProductsFormatCurrency } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/utils/ManagerStoreProductsFormatters';


/** @description Renders the ManagerStoreProductsPosModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerStoreProductsPosModal() {
  const t = useTranslations('MANAGER_STORE_PRODUCTS');
  const locale = useLocale();

 const { 
 showOrderModal, closeOrderModal, 
 products, 
 orderItems, addToOrder, removeFromOrder, updateOrderQty, orderTotal, 
 orderMethod, setOrderMethod, 
 customerPhone, setCustomerPhone, sendViaWhatsapp, setSendViaWhatsapp,
 saving, placeOrder 
 } = useManagerStoreProductsLogic();
  const dialogRef = useRef<HTMLDivElement>(null);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: showOrderModal, onClose: closeOrderModal });

  if (!showOrderModal) return null;

 return (
 <div className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4 overflow-y-auto">
 <div ref={dialogRef} tabIndex={-1} className="my-auto bg-overlay rounded-2xl shadow-dialog w-full max-w-2xl max-h-dialog-desktop flex flex-col overflow-hidden border-2 border-warning" role="dialog" aria-modal="true" aria-labelledby="managerstoreposmodal-dialog-title">
 <div className="shrink-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between">
 <h3 className="text-lg font-bold text-text-primary" id="managerstoreposmodal-dialog-title">{t("COPY_NEW_SALE_POS")}</h3>
 <button data-testid="manager_store-manager-store-pos-modal-order-modal" 
 type="button"
 aria-label={t("COPY_CLOSE_POINT_SALE")}
 onClick={closeOrderModal} 
 className="min-h-11 min-w-11 flex items-center justify-center p-2 rounded-lg hover:bg-primary-subtle text-text-secondary motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
 >
 <X size={18} strokeWidth={2} aria-hidden="true"/>
 </button>
 </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 custom-scrollbar">
 
 {/* Product Grid */}
  <div>
  <div className="flex flex-col mb-3">
    <p className="text-sm font-medium text-text-secondary mb-2">{t("COPY_SELECT_PRODUCTS_ADD")}</p>
    <ManagerSearchableDropdown dataTestId="manager_store-managerstoreposmodal-managersearchabledropdown-1"
      value={''}
      onChange={(val) => {
        const p = products.find(prod => String(prod.id) === String(val));
        if (p) addToOrder(p);
      }}
      options={products.filter(p => p.stock > 0).map(p => ({ 
        label: `${p.name} ${p.unit ? `(${p.unit})` : ''} - ${ManagerStoreProductsFormatCurrency(p.price, ManagerEnvConfig.currencyCode, locale)} (Stock: ${p.stock})`, 
        value: String(p.id) 
      }))}
      placeholder={t("COPY_SEARCH_SELECT_PRODUCTS")}
     data-testid="manager_store-managerstoreposmodal-searchable-dropdown-1"/>
  </div>
  </div>
 
 {/* Cart */}
 <div>
 <p className="text-sm font-medium text-text-secondary mb-3">{t("COPY_CART")}</p>
 <div className="space-y-2 min-h-25">
 {orderItems.length === 0 && (
 <ManagerStorePointOfSaleEmptyState message={t("COPY_NO_ITEMS_ADDED")} />
 )}
 {orderItems.map((i, mapIndex) => (
 <div key={i.productId} className="flex items-center justify-between p-2 bg-input rounded-lg border border-border">
 <div className="flex-1">
 <p className="text-xs font-medium text-text-primary">{i.name} {i.unit && <span className="text-text-secondary font-normal">({i.unit})</span>}</p>
 <p className="text-xs text-text-secondary">{ManagerStoreProductsFormatCurrency(i.price, ManagerEnvConfig.currencyCode, locale)}{t("COPY_EACH")}</p>
 </div>
 <div className="flex flex-wrap items-center gap-2">
   <div className="flex items-center bg-overlay rounded border border-border">
     <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 inline-flex items-center justify-center p-1 text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreposmodal-button-decrease-quantity-for-${mapIndex}`} type="button" aria-label={t("TEXT_DECREASE_QTY", { value: i.name })}
       onClick={() => updateOrderQty(i.productId, i.qty - 1)}
       
     >
       <Minus size={18} strokeWidth={2} aria-hidden="true"/>
     </button>
     <span className="text-xs font-medium w-6 text-center">{i.qty}</span>
     <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 inline-flex items-center justify-center p-1 text-text-secondary hover:text-primary disabled:opacity-50 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreposmodal-button-increase-quantity-for-${mapIndex}`} type="button" aria-label={t("TEXT_INCREASE_QTY", { value: i.name })}
       onClick={() => {
         const product = products.find(p => p.id === i.productId);
         if (product && i.qty < product.stock) {
           updateOrderQty(i.productId, i.qty + 1);
         }
       }}
       disabled={!products.find(p => p.id === i.productId) || i.qty >= (products.find(p => p.id === i.productId)?.stock || 0)}
       
     >
       <Plus size={18} strokeWidth={2} aria-hidden="true"/>
     </button>
   </div>
   <p className="text-xs font-bold text-text-primary w-16 text-right">{ManagerStoreProductsFormatCurrency(i.price * i.qty, ManagerEnvConfig.currencyCode, locale)}</p>
   <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 inline-flex items-center justify-center p-1 text-danger-text hover:text-danger-text motion-safe:transition-all ml-1 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreposmodal-button-remove-from-order-${mapIndex}`} type="button" aria-label={t("TEXT_REMOVE_FROM_ORDER", { value: i.name })}
     onClick={() => removeFromOrder(i.productId)} 
     
   >
     <X size={18} strokeWidth={2} aria-hidden="true"/>
   </button>
 </div>
 </div>
 ))}
 </div>
 
 <div className="mt-4 pt-4 border-t border-border">
 <div className="flex justify-between mb-3">
 <span className="font-semibold text-text-primary">{t("COPY_TOTAL_1")}</span>
 <span className="font-bold text-lg text-success-text ">{ManagerStoreProductsFormatCurrency(orderTotal, ManagerEnvConfig.currencyCode, locale)}</span>
 </div>
 
 <ManagerSearchableDropdown dataTestId="manager_store-managerstoreposmodal-managersearchabledropdown-2"
 value={orderMethod}
 onChange={(val) => setOrderMethod(String(val))}
 className="mb-3"
 options={PAYMENT_METHODS.map(m => ({ label: m, value: m }))}
  data-testid="manager_store-managerstoreposmodal-searchable-dropdown-2"/>

 <label className="flex items-center gap-2 mb-3 cursor-pointer text-sm text-text-primary font-medium">
   <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-4 h-4 rounded border-border accent-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_store-manager-store-pos-modal-input-checkbox-toggle" 
     type="checkbox" 
     checked={sendViaWhatsapp}
     onChange={e => setSendViaWhatsapp(e.target.checked)}
     
   />{t("COPY_WHATSAPP_BILL")}</label>

 {sendViaWhatsapp && (
   <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full border border-border rounded-xl px-4 py-2.5 text-sm mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning bg-input text-text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_store-manager-store-pos-modal-input-value" 
     type="tel" maxLength={10} onKeyDown={(e) => { if (!/[0-9]|Backspace|Tab|Enter|Delete|Arrow/.test(e.key)) e.preventDefault(); }}
     placeholder={t("COPY_10_DIGIT_WHATSAPP_NUMBER")}
     value={customerPhone}
     onChange={e => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
     
    aria-label={t("COPY_10_DIGIT_WHATSAPP_NUMBER")}/>
 )}

 <button data-testid="manager_store-manager-store-pos-modal-place-order" 
 onClick={placeOrder} 
 disabled={saving || orderItems.length === 0 || (sendViaWhatsapp && customerPhone.length !== 10)} 
 className="min-w-32 w-full py-3 rounded-xl text-sm font-bold text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all bg-primary hover:bg-primary-hover motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" 
  type="button">
 {(() => { if (saving) { return <Loader2 size={18} strokeWidth={2} className="text-on-primary motion-safe:animate-spin" />; } return (sendViaWhatsapp ? <><Send size={18} strokeWidth={2} aria-hidden="true"/>{t("COPY_SEND_WHATSAPP")}</> : <><Printer size={18} strokeWidth={2} aria-hidden="true"/>{t("COPY_PRINT_BILL")}</>); })()}
 </button>
 </div>
 </div>
 
 </div>
 </div>
 </div>
 );
}
