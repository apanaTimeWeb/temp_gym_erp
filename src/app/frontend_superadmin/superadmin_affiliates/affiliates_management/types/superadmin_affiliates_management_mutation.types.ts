// RESPONSIBILITY: Defines the callback contract used by the Superadmin Affiliates mutation orchestrator.
import type { ApiResponse } from '@/lib/api';

export interface SuperadminAffiliatesMutationOptions {
  toastId: string;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

export type SuperadminAffiliatesMutationExecutor<T> = () => Promise<ApiResponse<T>>;
