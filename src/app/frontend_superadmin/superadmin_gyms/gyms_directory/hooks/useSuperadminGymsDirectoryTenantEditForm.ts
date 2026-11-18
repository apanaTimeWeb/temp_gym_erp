'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { useUpdateTenant } from '../services/SuperadminGymsDirectoryTenantService';
import {
  validateGymName,
  validateEmail,
  validateIndianPhone,
  validatePassword,
} from '../utils/SuperadminGymsDirectoryValidators';
import {
  computeTenantChanges,
  buildSensitiveComparison,
} from '../utils/SuperadminGymsDirectoryTenantDiff';
import type { Tenant, Plan, UpdateTenantInput } from '../types/SuperadminGymsDirectoryTenantTypes';

export interface UseSuperadminGymsDirectoryTenantEditFormProps {
  tenant: Tenant;
  plans: Plan[];
  onClose: () => void;
  onSuccess?: () => void;
}

export function useSuperadminGymsDirectoryTenantEditForm({
  tenant,
  plans,
  onClose,
  onSuccess,
}: UseSuperadminGymsDirectoryTenantEditFormProps) {
  const updateMutation = useUpdateTenant();

  const [gymName, setGymName] = useState(tenant.gymName);
  const [ownerName, setOwnerName] = useState(tenant.ownerName);
  const [adminEmail, setAdminEmail] = useState(tenant.ownerEmail);
  const [phone, setPhone] = useState(tenant.phone);
  const [planId, setPlanId] = useState(tenant.planId);
  const [planExpiresAt, setPlanExpiresAt] = useState(
    tenant.planExpiresAt ? tenant.planExpiresAt.split('T')[0] : ''
  );
  const [accessStatus, setAccessStatus] = useState<'ACTIVE' | 'INACTIVE'>(tenant.accessStatus);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusReason, setStatusReason] = useState('');

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmChanges, setConfirmChanges] = useState<
    Array<{ field: string; from: string; to: string }>
  >([]);

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const selectedPlan = useMemo(
    () => plans.find((p) => p.id === planId || p.name.toLowerCase() === planId.toLowerCase()),
    [plans, planId]
  );

  const validateField = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = { ...errors };

    switch (field) {
      case 'gymName': {
        const res = validateGymName(gymName);
        newErrors.gymName = res.isValid ? undefined : res.error;
        break;
      }
      case 'ownerName': {
        newErrors.ownerName =
          !ownerName || ownerName.trim().length < 2
            ? 'Owner name must be at least 2 characters'
            : undefined;
        break;
      }
      case 'adminEmail': {
        const res = validateEmail(adminEmail);
        newErrors.adminEmail = res.isValid ? undefined : res.error;
        break;
      }
      case 'phone': {
        const res = validateIndianPhone(phone);
        newErrors.phone = res.isValid ? undefined : res.error;
        break;
      }
      case 'password': {
        newErrors.password = password ? validatePassword(password).error : undefined;
        break;
      }
      case 'accessStatus': {
        newErrors.statusReason =
          accessStatus !== tenant.accessStatus && !statusReason.trim()
            ? 'A reason is required when changing access status'
            : undefined;
        break;
      }
    }
    setErrors(newErrors);
  };

  const changedFields = useMemo(
    () =>
      computeTenantChanges(tenant, {
        gymName,
        ownerName,
        adminEmail,
        phone,
        planId,
        planExpiresAt,
        accessStatus,
        statusReason,
        password,
      }),
    [tenant, gymName, ownerName, adminEmail, phone, planId, planExpiresAt, accessStatus, statusReason, password]
  );

  const isDirty = Object.keys(changedFields).length > 0;
  const isFormValid = useMemo(() => {
    if (!gymName || gymName.trim().length < 3 || gymName.trim().length > 80) return false;
    if (!ownerName || ownerName.trim().length < 2) return false;
    if (!adminEmail || !validateEmail(adminEmail).isValid) return false;
    if (!phone || !validateIndianPhone(phone).isValid) return false;
    if (!planId) return false;
    if (password && !validatePassword(password).isValid) return false;
    if (accessStatus !== tenant.accessStatus && !statusReason.trim()) return false;
    return true;
  }, [gymName, ownerName, adminEmail, phone, planId, password, tenant, accessStatus, statusReason]);

  const canSave = isDirty && isFormValid && !updateMutation.isPending;

  const executeSave = async (payload: Partial<UpdateTenantInput>, confirmReason?: string) => {
    const finalPayload = { ...payload };
    if (confirmReason) finalPayload.statusChangeReason = confirmReason;

    try {
      await updateMutation.mutateAsync({ id: tenant.id, payload: finalPayload });
      toast.success(`Successfully updated details for ${tenant.gymName}`);
      setShowConfirmDialog(false);
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update gym details';
      toast.error(msg);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;

    const sensitiveComparison = buildSensitiveComparison(changedFields, tenant, plans);
    if (sensitiveComparison.length > 0) {
      setConfirmChanges(sensitiveComparison);
      setShowConfirmDialog(true);
    } else {
      executeSave(changedFields);
    }
  };

  return {
    gymName,
    setGymName,
    ownerName,
    setOwnerName,
    adminEmail,
    setAdminEmail,
    phone,
    setPhone,
    planId,
    setPlanId,
    planExpiresAt,
    setPlanExpiresAt,
    accessStatus,
    setAccessStatus,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    statusReason,
    setStatusReason,
    showConfirmDialog,
    setShowConfirmDialog,
    confirmChanges,
    errors,
    touched,
    validateField,
    selectedPlan,
    changedFields,
    canSave,
    handleSubmit,
    executeSave,
    updateMutation,
  };
}

export default useSuperadminGymsDirectoryTenantEditForm;
