'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { useUpdateTenant } from '../services/SuperadminGymsDirectoryTenantService';
import {
  computeTenantChanges,
  buildSensitiveComparison,
  validateTenantEditField,
  checkTenantEditFormValid,
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

  const formValues = useMemo(
    () => ({ gymName, ownerName, adminEmail, phone, planId, planExpiresAt, accessStatus, statusReason, password }),
    [gymName, ownerName, adminEmail, phone, planId, planExpiresAt, accessStatus, statusReason, password]
  );

  const validateField = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateTenantEditField(field, formValues, tenant.accessStatus) }));
  };

  const changedFields = useMemo(() => computeTenantChanges(tenant, formValues), [tenant, formValues]);
  const isDirty = Object.keys(changedFields).length > 0;
  const isFormValid = useMemo(() => checkTenantEditFormValid(formValues, tenant.accessStatus), [formValues, tenant.accessStatus]);
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
    gymName, setGymName, ownerName, setOwnerName, adminEmail, setAdminEmail, phone, setPhone,
    planId, setPlanId, planExpiresAt, setPlanExpiresAt, accessStatus, setAccessStatus, password,
    setPassword, showPassword, setShowPassword, statusReason, setStatusReason, showConfirmDialog,
    setShowConfirmDialog, confirmChanges, errors, touched, validateField, selectedPlan, changedFields,
    canSave, handleSubmit, executeSave, updateMutation,
  };
}

export default useSuperadminGymsDirectoryTenantEditForm;
