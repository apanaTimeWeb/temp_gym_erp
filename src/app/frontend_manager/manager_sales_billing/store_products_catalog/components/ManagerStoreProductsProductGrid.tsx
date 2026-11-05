// RESPONSIBILITY: Renders ManagerStoreProductsProductGrid's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Edit2, Trash2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import ManagerStoreProductsCatalogEmptyState from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/components/ManagerStoreProductsCatalogEmptyState';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/ManagerStoreProductsCatalogLocalEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/ManagerStoreProductsCatalogLocalPaginationDefaults';

import { useManagerStoreProductsLogic } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/hooks/useManagerStoreProductsLogic';
import { ManagerStoreProductsFormatCurrency } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/utils/ManagerStoreProductsFormatters';


/** @description Renders the ManagerStoreProductsProductGrid component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerStoreProductsProductGrid() {
  const t = useTranslations('MANAGER_STORE_PRODUCTS');
  const locale = useLocale();

  const { confirm } = useConfirm();
  const { products, summary, isPending, isError, errorMessage, debouncedSearch, currentPage, setCurrentPage, openEditProduct, deleteProduct, loadAll } = useManagerStoreProductsLogic();

  
  const totalProducts = summary?.totalProducts || products.length;
  const totalPages = Math.ceil(totalProducts / MANAGER_ITEMS_PER_PAGE) || 1;

  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={`skeleton-${i}`} className="motion-safe:animate-pulse bg-card rounded-xl border border-border p-4 h-64 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
            <div className="h-32 bg-input rounded-lg mb-4"></div>
            <div className="h-4 bg-input rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-input rounded w-1/2 mb-4"></div>
            <div className="flex justify-between items-center mt-auto">
              <div className="h-6 bg-input rounded w-1/3"></div>
              <div className="h-8 bg-input rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger mt-4 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-danger-text font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <p className="text-sm text-text-secondary">{t("COPY_RETRY_REQUEST_1")}</p><button type="button" onClick={() => void loadAll()} className="mt-4 min-h-11 min-w-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t("COPY_RETRY")}</button>
      </div>
    );
  }

  if (products.length === 0) {
    const message = debouncedSearch
      ? `${t("COPY_NO_PRODUCTS_FOUND_MATCHING_QUOT")}${debouncedSearch}${t("COPY_QUOT")}`
      : t("COPY_NO_PRODUCTS_ADDED_YET");
    return <ManagerStoreProductsCatalogEmptyState message={message} />;
  }

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 content-start">
        {products.map((p, mapIndex) => (
          <div 
            key={p.id} 
            className="border border-border rounded-xl p-4 hover:shadow-card motion-safe:transition-all bg-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-text-primary">
                  {p.name} {p.unit && <span className="text-sm font-normal text-text-secondary ml-1">({p.unit})</span>}
                </p>
                <span data-testid={`manager_store-store-managerstoreproductgrid-status-edit-${mapIndex}`} className="text-xs bg-info text-on-info px-2 py-0.5 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="flex gap-1">
                <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 flex items-center justify-center rounded-lg bg-input text-text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreproductgrid-button-edit-${mapIndex}`} 
                  onClick={() => openEditProduct(p)} 
                  
                  aria-label={t("TEXT_EDIT_PRODUCT", { value: p.name })}
                 type="button">
                  <Edit2 size={18} strokeWidth={2}/>
                </button>
                <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 flex items-center justify-center rounded-lg bg-danger text-on-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreproductgrid-button-delete-product-${mapIndex}`} 
                  onClick={async () => {
                    const ok = await confirm({
                      title: t("COPY_DELETE_PRODUCT"),
                      message: t("TEXT_DELETE_PRODUCT_CONFIRM_MESSAGE", { value: p.name }),
                      type: 'danger',
                      confirmText: t("COPY_DELETE")
                    });
                    if (ok) deleteProduct(p.id);
                  }}
                  
                  aria-label={t("TEXT_DELETE_PRODUCT", { value: p.name })}
                 type="button">
                  <Trash2 size={18} strokeWidth={2}/>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-text-primary">
                {ManagerStoreProductsFormatCurrency(p.price, ManagerEnvConfig.currencyCode, locale)}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                (() => { if (p.stock <= (p.reorderThreshold ?? 10)) return 'bg-danger text-on-danger '; return (() => { if (p.stock <= Math.max((p.reorderThreshold ?? 10) * 2, 25)) return 'bg-warning text-on-warning '; return 'bg-success text-on-success '; })(); })()
              }`} data-testid={`manager_store-managerstoreproductgrid-status-badge-${p.id}`}>
                {p.stock}{t("COPY_STOCK_1")}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <ManagerPagination data-testid="manager_store-managerstoreproductgrid-managerpagination-1" 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={totalProducts} 
          itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
