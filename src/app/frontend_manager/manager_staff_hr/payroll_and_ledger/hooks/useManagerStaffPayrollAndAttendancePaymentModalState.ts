// DATA FLOW: Payroll payment selection → useManagerStaffPayrollAndAttendancePaymentModalState → HR payment modal fields.
'use client';

import { useEffect, useState } from 'react';

import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureFromManagerMinorUnits';

/**
 * @description Owns the editable payment amount and submitting flag for the HR salary-payment modal.
 * @dependencies ManagerInfrastructureToManagerMinorUnits and ManagerInfrastructureFromManagerMinorUnits conversion plus React state/lifecycle.
 * @edge-case Rehydrates the draft amount whenever a different payroll payment modal opens.
 */
export function useManagerStaffPayrollAndAttendancePaymentModalState(paymentModal: { payrollId: string; staffName: string; pendingAmount: number } | null) {
  const [amount, setAmount] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EFFECT: Rehydrate the editable amount when the selected payroll payment modal identity/value changes.
  useEffect(() => {
    if (paymentModal) setAmount(ManagerInfrastructureFromManagerMinorUnits(paymentModal.pendingAmount));
  }, [paymentModal]);

  return { amount, setAmount, isSubmitting, setIsSubmitting };
}
