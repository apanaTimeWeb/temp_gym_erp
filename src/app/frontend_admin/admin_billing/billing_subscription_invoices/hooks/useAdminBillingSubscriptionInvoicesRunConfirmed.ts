"use client";

import { useCallback, useRef } from 'react';
import type { AdminConfirmOptions } from '../types/AdminBillingSubscriptionInvoicesConfirmTypes';

export function useAdminBillingSubscriptionInvoicesRunConfirmed(
  confirm: (options: AdminConfirmOptions) => Promise<boolean>,
  clearIntentKey: (intentId: string) => void,
  getIntentKey: (intentId: string) => string
) {
  const actionInFlight = useRef(false);

  return useCallback(async (
    intentId: string,
    options: AdminConfirmOptions,
    submit: (idempotencyKey: string) => Promise<unknown>,
  ) => {
    if (actionInFlight.current) return;
    actionInFlight.current = true;
    try {
      const accepted = await confirm(options);
      if (!accepted) {
        clearIntentKey(intentId);
        return;
      }
      await submit(getIntentKey(intentId));
    } catch {
      // Mutation onError owns user-visible feedback; keep the same key on retry.
    } finally {
      actionInFlight.current = false;
    }
  }, [confirm, clearIntentKey, getIntentKey]);
}
