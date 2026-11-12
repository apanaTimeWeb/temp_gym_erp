// RESPONSIBILITY: Renders ManagerStoreProductsProductModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';

import { X, Save, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/hooks/useManagerStoreProductsCatalogLocalDialogFocusTrap';

import { CATEGORIES } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/manager_store_products_shared.constants';
import { useManagerStoreProductsProductForm } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/hooks/useManagerStoreProductsProductForm';
import type { ProductFormValues } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_store_products_product_form.types';
import type { ManagerStoreProductsProductFieldType } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_sales_billing_store_products_catalog.types';


/**
 * @description Renders/orchestrates the ManagerStoreProductsProductModal user interface for the store module without owning sibling business logic.
 * @dependencies @/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown; @/app/frontend_manager/manager_sales_billing/manager_store_hooks/useManagerStoreProductsProductForm; @/app/frontend_manager/manager_sales_billing/manager_store_constants/ManagerStoreProductsSharedConstants; @/app/frontend_manager/manager_sales_billing/manager_store_types/ManagerStoreProductsProductFormTypes; @/app/frontend_manager/manager_sales_billing/manager_store_types/ManagerStoreProductsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const PRODUCT_FIELDS: ReadonlyArray<{ labelKey: string; key: keyof ProductFormValues; type: ManagerStoreProductsProductFieldType }> = [
  { labelKey: 'COPY_PRODUCT_NAME', key: 'name', type: 'text' },
  { labelKey: 'COPY_UNIT_VARIANT_E_G_1_KG_500_ML', key: 'unit', type: 'text' },
  { labelKey: 'COPY_PRICE', key: 'price', type: 'number' },
  { labelKey: 'COPY_STOCK_QUANTITY', key: 'stock', type: 'number' },
  { labelKey: 'COPY_DESCRIPTION_2', key: 'description', type: 'text' },
];

/** @description Renders the ManagerStoreProductsProductModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerStoreProductsProductModal() {
  const t = useTranslations('MANAGER_STORE_PRODUCTS');

  const { form, showProductModal, editProductId, handleClose, submit } = useManagerStoreProductsProductForm();
  const dialogRef = useRef<HTMLDivElement>(null);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: showProductModal, onClose: handleClose });
  const { register, control, formState: { errors, isSubmitting } } = form;
  if (!showProductModal) return null;

  return (
    <div data-testid="manager_store-managerstoreproductmodal-presentation" className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4 overflow-y-auto" role="presentation">
      <div data-testid="manager_store-managerstoreproductmodal-dialog" ref={dialogRef} className="my-auto bg-overlay rounded-2xl shadow-dialog w-full max-w-md max-h-dialog-desktop flex flex-col overflow-hidden border-2 border-warning" role="dialog" aria-modal="true" aria-labelledby="manager-store-product-title">
        <div className="shrink-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 id="manager-store-product-title" className="text-lg font-bold text-text-primary">{editProductId ? t('COPY_EDIT_PRODUCT') : t('COPY_ADD_PRODUCT')}</h3>
          <button data-testid="manager_store-manager-store-product-modal-close-1" type="button" aria-label={t("COPY_CLOSE_PRODUCT_FORM")} onClick={handleClose} className="min-h-11 min-w-11 flex items-center justify-center rounded-lg hover:bg-surface-hover text-text-secondary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"><X size={18} strokeWidth={2} aria-hidden="true"/></button>
        </div>
        <form data-testid="manager_store-managerstoreproductmodal-form-1" onSubmit={submit} className="min-h-0 flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {PRODUCT_FIELDS.map((field, mapIndex) => {
            const error = errors[field.key];
            return (
              <div key={field.key}>
                <label htmlFor={`manager-store-product-${String(field.key)}`} className="block text-sm font-medium text-text-secondary mb-1">{t(field.labelKey)}</label>
                <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 ${error ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-warning'} bg-input text-text-primary`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreproductmodal-input-primary-${mapIndex}`}
                  id={`manager-store-product-${String(field.key)}`}
                  type={field.type}
                  min={field.type === 'number' ? '0' : undefined}
                  step={(() => { if (field.key === 'price') return '0.01'; return (() => { if (field.type === 'number') return '1'; return undefined; })(); })()}
                  {...register(field.key, field.type === 'number' ? { valueAsNumber: true } : {})}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `manager-store-product-${String(field.key)}-error` : undefined}
                />
                {error && <p id={`manager-store-product-${String(field.key)}-error`} data-testid={`manager_store-store-storeproductmodal-alert-${String(field.key)}`} role="alert" className="text-danger-text text-xs mt-1">{String(error.message ?? '')}</p>}
              </div>
            );
          })}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_CATEGORY")}</label>
            <Controller name="category" control={control} render={({ field }) => <ManagerSearchableDropdown ariaLabel={t("COPY_CATEGORY")} ariaInvalid={Boolean(errors.category)} ariaDescribedBy={errors.category ? 'managerstoreproductmodal-category-error' : undefined} dataTestId="manager_store-managerstoreproductmodal-managersearchabledropdown-1" value={field.value} onChange={field.onChange} options={CATEGORIES.map((category) => ({ label: category, value: category }))}  data-testid="manager_store-managerstoreproductmodal-searchable-dropdown-1"/>} />
            {errors.category && <p id="managerstoreproductmodal-category-error" data-testid="manager_store-manager-store-product-modal-status" role="alert" className="text-danger-text text-xs mt-1">{String(errors.category.message ?? '')}</p>}
          </div>
          <div className="sticky bottom-0 bg-overlay border-t border-border pt-3 flex flex-col-reverse sm:flex-row gap-3 shrink-0">
            <button data-testid="manager_store-manager-store-product-modal-close-2" type="button" onClick={handleClose} className="flex-1 min-h-11 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{t("COPY_CANCEL")}</button>
            <button data-testid="manager_store-manager-store-product-modal-button-submit" type="submit" disabled={isSubmitting} className="min-w-32 flex-1 min-h-11 py-2.5 rounded-xl text-sm font-bold text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all bg-primary motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">
              {isSubmitting ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true"/> : <Save size={18} strokeWidth={2} aria-hidden="true"/>}
              <span>{(() => { if (isSubmitting) return t('COPY_SAVING'); return (() => { if (editProductId) return t('COPY_UPDATE'); return t('COPY_ADD_PRODUCT'); })(); })()}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
