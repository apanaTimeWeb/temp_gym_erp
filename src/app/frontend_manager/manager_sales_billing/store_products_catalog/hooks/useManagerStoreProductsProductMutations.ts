// DATA FLOW: Feature input → module-owned mutation hook → ManagerStoreProductsApi → authoritative response → TanStack Query invalidation/UI reconciliation.
'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ManagerToastType } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/ManagerStoreProductsCatalogLocalToastTypes';

import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/utils/ManagerStoreProductsCatalogLocalIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/utils/ManagerStoreProductsCatalogLocalShowErrorToast';
import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/utils/ManagerStoreProductsCatalogLocalToMinorUnits';

import { ManagerStoreProductsApi } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/api/manager_sales_billing_store_products_catalog.api';
import { ManagerStoreProductsQueryKeys } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/api/manager_sales_billing_store_products_catalog.query_keys';
import type { ProductFormValues } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_store_products_product_form.types';
import type { Product, StoreSummary } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_sales_billing_store_products_catalog.types';

/**
 * @description Owns Store product create/update/delete mutations and server-state invalidation.
 * @dependencies Uses ManagerStoreProductsApi, ManagerStoreProductsQueryKeys, ManagerIdempotency, ManagerInfrastructureToManagerMinorUnits and ManagerInfrastructureFromManagerMinorUnits, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast.
 * @edge-case Reuses a caller-provided idempotency key for the current mutation intent and never stores server loading state in Zustand.
 */
export function useManagerStoreProductsProductMutations(
  setProducts: (updater: Product[] | ((previous: Product[]) => Product[])) => void,
  setSummary: (updater: StoreSummary | null | ((previous: StoreSummary | null) => StoreSummary | null)) => void,
  showToast: (message: string, type: ManagerToastType) => void,
  editProductId: string | null,
) {
  const queryClient = useQueryClient();
  const saveKeyRef = useRef<string | null>(null);
  const deleteKeyByIdRef = useRef(new Map<string, string>());
  const save = useMutation({
    mutationFn: async (data: Partial<ProductFormValues> & { idempotencyKey: string }) => {
      const payload: Partial<Product> = {
        ...data,
        price: data.price === undefined ? undefined : ManagerInfrastructureToManagerMinorUnits(data.price),
        stock: data.stock,
      };
      return editProductId
        ? ManagerStoreProductsApi.updateProduct(editProductId, payload, data.idempotencyKey)
        : ManagerStoreProductsApi.createProduct(payload, data.idempotencyKey);
    },
    onSuccess: (response) => {
      if (editProductId) {
        const updated = response.data || {};
        setProducts((prev) => prev.map((product) => String(product.id) === String(editProductId) ? { ...product, ...updated } : product));
      } else if (response.data) {
        setProducts((prev) => [response.data as Product, ...prev]);
        setSummary((prev) => prev ? { ...prev, totalProducts: prev.totalProducts + 1 } : prev);
      }
      queryClient.invalidateQueries({ queryKey: ManagerStoreProductsQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ManagerStoreProductsQueryKeys.summary() });
      saveKeyRef.current = null;
      showToast(response.message, 'success');
    },
    onError: (error: unknown) => ManagerInfrastructureShowErrorToast(error, 'manager-store-save-product-error'),
  });
  const remove = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerStoreProductsApi.deleteProduct(id, idempotencyKey),
    onSuccess: (response, variables) => {
      setProducts((prev) => prev.filter((product) => String(product.id) !== String(variables.id)));
      setSummary((prev) => prev ? { ...prev, totalProducts: Math.max(0, prev.totalProducts - 1) } : prev);
      queryClient.invalidateQueries({ queryKey: ManagerStoreProductsQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ManagerStoreProductsQueryKeys.summary() });
      deleteKeyByIdRef.current.delete(variables.id);
      showToast(response.message, 'success');
    },
    onError: (error: unknown, variables) => ManagerInfrastructureShowErrorToast(error, `manager-store-delete-product-error-${variables.id}`),
  });
  return {
    saveProduct: (data: Partial<ProductFormValues>) => { const idempotencyKey = saveKeyRef.current ?? ManagerInfrastructureIdempotency(); saveKeyRef.current = idempotencyKey; return save.mutateAsync({ ...data, idempotencyKey }); },
    deleteProduct: (id: string) => { const idempotencyKey = deleteKeyByIdRef.current.get(id) ?? ManagerInfrastructureIdempotency(); deleteKeyByIdRef.current.set(id, idempotencyKey); return remove.mutateAsync({ id, idempotencyKey }); },
    isSaving: save.isPending || remove.isPending,
  };
}
