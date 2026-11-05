// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/hooks/useManagerStoreProductsCatalogLocalUnsavedChangesGuard';
import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/utils/ManagerStoreProductsCatalogLocalFromMinorUnits';

import { EMPTY_PRODUCT_FORM } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/manager_store_products_form_defaults.constants';
import { useManagerStoreProductsLogic } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/hooks/useManagerStoreProductsLogic';
import { managerStoreProductFormSchema } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/schemas/manager_store_products_product_form.schemas';
import type { ProductFormInput, ProductFormValues } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_store_products_product_form.types';


/** Coordinates the Store product form lifecycle without placing submission logic in the view component. */
/**
 * @description Coordinates store feature state and its documented UI/API boundary through useManagerStoreProductsProductForm.
 * @dependencies Uses ManagerInfrastructureToManagerMinorUnits and ManagerInfrastructureFromManagerMinorUnits, ManagerUnsavedChangesGuard, useManagerStoreProductsLogic, ManagerStoreProductsProductFormSchema.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStoreProductsProductForm owns the store feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStoreProductsProductForm() {
  const { showProductModal, setShowProductModal, editProductId, editProductData, saving, saveProduct } = useManagerStoreProductsLogic();
  const form = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(managerStoreProductFormSchema),
    defaultValues: editProductData ?? EMPTY_PRODUCT_FORM,
  });

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!showProductModal) return;
    const values = editProductData
      ? { ...editProductData, price: ManagerInfrastructureFromManagerMinorUnits(editProductData.price) }
      : EMPTY_PRODUCT_FORM;
    form.reset(values);
  }, [editProductData, form, showProductModal]);

  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(showProductModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowProductModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    await saveProduct(values as ProductFormValues);
    form.reset(values);
    setShowProductModal(false);
  });

  return {
    form,
    showProductModal,
    editProductId,
    saving,
    handleClose,
    submit,
  };
}
