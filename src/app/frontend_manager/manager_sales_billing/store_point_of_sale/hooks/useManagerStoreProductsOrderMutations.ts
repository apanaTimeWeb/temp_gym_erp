// DATA FLOW: Confirmed POS intent → mutation hook → ManagerStoreProductsApi → authoritative response → query invalidation.
'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';

import { ManagerStoreProductsApi } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/api/manager_sales_billing_store_point_of_sale.api';
import { ManagerStoreProductsQueryKeys } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/api/manager_sales_billing_store_point_of_sale.query_keys';
import { STORE_COMPLETED_ORDER_STATUS } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/constants/manager_store_products_shared.constants';
import type { OrderItem } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/types/manager_sales_billing_store_point_of_sale.types';

/**
 * @description Owns Store POS order creation and retry-safe idempotency lifecycle.
 * @dependencies Uses ManagerStoreProductsApi, ManagerStoreProductsQueryKeys, ManagerIdempotency, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast.
 * @edge-case Reuses one idempotency key for a confirmed intent until success or abandonment.
 */
export function useManagerStoreProductsOrderMutations(
  orderItems: OrderItem[],
  orderMethod: string,
  customerPhone: string,
  sendViaWhatsapp: boolean,
  orderTotal: number,
  onSuccess: (response: Awaited<ReturnType<typeof ManagerStoreProductsApi.createOrder>>) => Promise<void> | void,
) {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  const place = useMutation({
    mutationFn: async () => {
      const idempotencyKey = idempotencyKeyRef.current ?? ManagerInfrastructureIdempotency();
      idempotencyKeyRef.current = idempotencyKey;
      const response = await ManagerStoreProductsApi.createOrder({
        items: orderItems.map((item) => ({ productId: item.productId, qty: item.qty, price: item.price })),
        method: orderMethod,
        notes: sendViaWhatsapp && customerPhone ? `WhatsApp: ${customerPhone}` : undefined,
        customerName: customerPhone || 'Walk-in',
        total: orderTotal,
        status: STORE_COMPLETED_ORDER_STATUS,
      }, idempotencyKey);
      if (!response.success) throw new Error(response.message || 'Unable to create order');
      return response;
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries({ queryKey: ManagerStoreProductsQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ManagerStoreProductsQueryKeys.summary() });
      idempotencyKeyRef.current = null;
      await onSuccess(response);
    },
    onError: (error: unknown) => ManagerInfrastructureShowErrorToast(error, 'manager-store-order-error'),
  });
  return {
    placeOrder: () => place.mutateAsync(),
    isPlacingOrder: place.isPending,
    resetIdempotency: () => { idempotencyKeyRef.current = null; },
  };
}
