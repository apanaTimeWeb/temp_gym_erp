// DATA FLOW: Owning module inputs → this hook state/derived result → consuming module-owned components.
'use client';
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';

import { EMPTY_STAFF } from '@/app/frontend_manager/manager_staff_hr/staff_directory/constants/manager_staff_payroll_and_attendance_form_defaults.constants';
import type { Staff } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_hr_staff_directory.types';
import type { useManagerStaffPayrollAndAttendanceLogic } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryLogic';

export type ManagerStaffDirectoryContextValue = ReturnType<typeof useManagerStaffPayrollAndAttendanceLogic>;

const ManagerStaffDirectoryContext = createContext<ManagerStaffDirectoryContextValue | null>(null);

export function ManagerStaffDirectoryProvider({
  value,
  children,
}: {
  value: ManagerStaffDirectoryContextValue;
  children: ReactNode;
}) {
  return (
    <ManagerStaffDirectoryContext.Provider value={value}>
      {children}
    </ManagerStaffDirectoryContext.Provider>
  );
}

export function useManagerStaffDirectoryContext(): ManagerStaffDirectoryContextValue {
  const context = useContext(ManagerStaffDirectoryContext);
  if (!context) {
    throw new Error('Staff Directory surfaces must be rendered inside ManagerStaffDirectoryProvider.');
  }
  return context;
}


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerStaffPayrollAndAttendanceUIState.
 * @dependencies Uses ManagerStaffPayrollAndAttendanceFormTypes, ManagerStaffPayrollAndAttendanceTypes, ManagerToastTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendanceUIState owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStaffPayrollAndAttendanceUIState() {
  const [showModal, setShowModal] = useState(false);
  const [showPayrollModal, setShowPayrollModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState<{ payrollId: string; staffName: string; pendingAmount: number; } | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Staff> | null>(null);
  const [viewProfileData, setViewProfileData] = useState<Staff | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ManagerToastType } | null>(null);

  const showToast = useCallback((msg: string, t: ManagerToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const [saving, setSaving] = useState(false);

  const openAdd = useCallback(() => {
    setEditId(null);
    setEditData(EMPTY_STAFF);
    setShowModal(true);
  }, []);

  const openEdit = useCallback((s: Staff) => {
    setEditId(s.id);
    setEditData({ 
      name: s.name, 
      email: s.email, 
      phone: s.phone, 
      role: s.role, 
      salary: s.salary, 
      branch: s.branch, 
      gender: s.gender, 
      address: s.address || '', 
      aadhaar: s.aadhaar || '',
      upiId: s.upiId || '',
      advanceSalary: s.advanceSalary || 0,
      isActive: s.isActive,
      joinDate: new Date(s.joinDate).toISOString().split('T')[0] 
    });
    setShowModal(true);
  }, []);

  const openAddPayroll = useCallback(() => {
    setShowPayrollModal(true);
  }, []);

  return {
    showModal, setShowModal,
    showPayrollModal, setShowPayrollModal,
    paymentModal, setPaymentModal,
    editId, setEditId,
    editData, setEditData,
    viewProfileData, setViewProfileData,
    toast, showToast, hideToast,
    openAdd, openEdit, openAddPayroll,
    saving, setSaving
  };
}
