// RESPONSIBILITY: Defines the callback contract used by the Superadmin Coupons mutation orchestrator.
import type { ApiResponse } from '@/lib/api';

export interface SuperadminBillingCouponsMutationOptions {
  toastId: string;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

export type SuperadminBillingCouponsMutationExecutor<T> = () => Promise<ApiResponse<T>>;
