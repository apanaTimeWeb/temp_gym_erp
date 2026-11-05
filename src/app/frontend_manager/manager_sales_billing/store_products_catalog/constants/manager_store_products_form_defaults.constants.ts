// RESPONSIBILITY: Owns canonical initial/default values for module form state.
import type { ProductFormValues } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_store_products_product_form.types';

export const EMPTY_PRODUCT_FORM: ProductFormValues = {
  name: '',
  category: 'Supplements',
  price: 0,
  stock: 0,
  description: '',
  unit: '',
};
