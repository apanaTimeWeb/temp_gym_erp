'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, ChevronRight, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { usePlans, useUpdateTenant } from '../../services/tenantService';
import { ConfirmDialog } from './SuperadminGymsDirectoryConfirmDialog';
import {
  validateGymName,
  validateEmail,
  validateIndianPhone,
  validatePassword,
} from '../../utils/validators';
import { formatIstDate } from '../../utils/tenant';
import type { Tenant, UpdateTenantInput } from '../../types/tenant';

export interface SuperadminGymsDirectoryTenantEditModalProps {
  isOpen: boolean;
  tenant: Tenant | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export type TenantEditModalProps = SuperadminGymsDirectoryTenantEditModalProps;

function TenantEditModalContent({
  tenant,
  onClose,
  onSuccess,
}: {
  tenant: Tenant;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { data: plans = [] } = usePlans();
  const updateMutation = useUpdateTenant();

  // Form State initialized directly from tenant (React 19 pattern: keyed inner component)
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

  // Status change reason state
  const [statusReason, setStatusReason] = useState('');

  // Before -> After confirmation state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmChanges, setConfirmChanges] = useState<
    Array<{ field: string; from: string; to: string }>
  >([]);

  // Errors state
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Escape key & focus trap
  useEffect(() => {
    if (showConfirmDialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConfirmDialog, onClose]);

  // Derived member limit from selected plan
  const selectedPlan = useMemo(
    () => plans.find((p) => p.id === planId || p.name.toLowerCase() === planId.toLowerCase()),
    [plans, planId]
  );

  // Field validation on blur
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
        if (password) {
          const res = validatePassword(password);
          newErrors.password = res.isValid ? undefined : res.error;
        } else {
          newErrors.password = undefined;
        }
        break;
      }
      case 'accessStatus': {
        if (accessStatus !== tenant.accessStatus && !statusReason.trim()) {
          newErrors.statusReason = 'A reason is required when changing access status';
        } else {
          newErrors.statusReason = undefined;
        }
        break;
      }
    }

    setErrors(newErrors);
  };

  // Check dirtiness (has anything changed)
  const changedFields = useMemo(() => {
    const changes: Partial<UpdateTenantInput> = {};

    if (gymName.trim() !== tenant.gymName) changes.gymName = gymName.trim();
    if (ownerName.trim() !== tenant.ownerName) changes.ownerName = ownerName.trim();
    if (adminEmail.trim().toLowerCase() !== tenant.ownerEmail.toLowerCase())
      changes.adminEmail = adminEmail.trim().toLowerCase();
    if (phone.trim() !== tenant.phone.trim()) changes.phone = phone.trim();
    if (planId !== tenant.planId) changes.planId = planId;

    const currentExpiryDatePart = tenant.planExpiresAt ? tenant.planExpiresAt.split('T')[0] : '';
    if (planExpiresAt && planExpiresAt !== currentExpiryDatePart) {
      changes.planExpiresAt = new Date(`${planExpiresAt}T23:59:59.000Z`).toISOString();
    }

    if (accessStatus !== tenant.accessStatus) {
      changes.accessStatus = accessStatus;
      changes.statusChangeReason = statusReason.trim();
    }

    if (password.trim()) {
      changes.temporaryPassword = password.trim();
    }

    return changes;
  }, [
    tenant,
    gymName,
    ownerName,
    adminEmail,
    phone,
    planId,
    planExpiresAt,
    accessStatus,
    statusReason,
    password,
  ]);

  const isDirty = Object.keys(changedFields).length > 0;

  // Form validity check
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;

    // Check if sensitive changes require before -> after confirm
    const sensitiveComparison: Array<{ field: string; from: string; to: string }> = [];

    if (changedFields.planId) {
      const fromPlan = plans.find((p) => p.id === tenant.planId)?.name || tenant.planId;
      const toPlan = plans.find((p) => p.id === changedFields.planId)?.name || changedFields.planId;
      sensitiveComparison.push({ field: 'SaaS Plan', from: fromPlan, to: toPlan });
    }

    if (changedFields.accessStatus) {
      sensitiveComparison.push({
        field: 'Access Status',
        from: tenant.accessStatus,
        to: changedFields.accessStatus,
      });
    }

    if (changedFields.planExpiresAt) {
      sensitiveComparison.push({
        field: 'Plan Expiry',
        from: formatIstDate(tenant.planExpiresAt),
        to: formatIstDate(changedFields.planExpiresAt),
      });
    }

    if (changedFields.temporaryPassword) {
      sensitiveComparison.push({
        field: 'Password',
        from: '••••••••',
        to: 'New Password Set',
      });
    }

    if (sensitiveComparison.length > 0) {
      setConfirmChanges(sensitiveComparison);
      setShowConfirmDialog(true);
    } else {
      executeSave(changedFields);
    }
  };

  const executeSave = async (payload: Partial<UpdateTenantInput>, confirmReason?: string) => {
    const finalPayload = { ...payload };
    if (confirmReason) {
      finalPayload.statusChangeReason = confirmReason;
    }

    try {
      await updateMutation.mutateAsync({
        id: tenant.id,
        payload: finalPayload,
      });
      toast.success(`Successfully updated details for ${tenant.gymName}`);
      setShowConfirmDialog(false);
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update gym details';
      toast.error(msg);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-xs motion-safe:animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-gym-modal-title"
        ref={modalRef}
      >
        <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-dialog flex flex-col max-h-[85vh] overflow-hidden">
          {/* Fixed Header */}
          <div className="p-4 sm:p-5 pb-3.5 border-b border-border flex items-start justify-between shrink-0 bg-card">
            <div>
              <div className="flex items-center gap-1.5 text-base sm:text-lg font-bold">
                <span className="text-secondary">Gyms & Tenants</span>
                <ChevronRight size={16} className="text-disabled shrink-0" aria-hidden="true" />
                <h2 id="edit-gym-modal-title" className="text-primary font-bold inline">
                  Edit Gym Details
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-secondary mt-0.5 font-normal">
                Update the configuration for <span className="font-semibold text-primary">{tenant.gymName}</span>.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={updateMutation.isPending}
              aria-label="Close dialog"
              className="h-8 w-8 min-h-8 min-w-8 p-1.5 rounded-lg border border-border/80 text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center cursor-pointer disabled:opacity-50 shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Gym Name */}
            <div>
              <label
                htmlFor="edit-gym-name"
                className="block text-sm font-semibold text-secondary mb-1"
              >
                Gym Name <span className="text-danger">*</span>
              </label>
              <input
                id="edit-gym-name"
                type="text"
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                onBlur={() => validateField('gymName')}
                required
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {touched.gymName && errors.gymName && (
                <p className="text-xs text-danger mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.gymName}
                </p>
              )}
            </div>

            {/* Owner Name */}
            <div>
              <label
                htmlFor="edit-owner-name"
                className="block text-sm font-semibold text-secondary mb-1"
              >
                Owner Name <span className="text-danger">*</span>
              </label>
              <input
                id="edit-owner-name"
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                onBlur={() => validateField('ownerName')}
                required
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {touched.ownerName && errors.ownerName && (
                <p className="text-xs text-danger mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.ownerName}
                </p>
              )}
            </div>

            {/* Admin Email */}
            <div>
              <label
                htmlFor="edit-admin-email"
                className="block text-sm font-semibold text-secondary mb-1"
              >
                Admin Email <span className="text-danger">*</span>
              </label>
              <input
                id="edit-admin-email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                onBlur={() => validateField('adminEmail')}
                required
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap overflow-x-auto"
              />
              {touched.adminEmail && errors.adminEmail && (
                <p className="text-xs text-danger mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.adminEmail}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="edit-phone"
                className="block text-sm font-semibold text-secondary mb-1"
              >
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                id="edit-phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => validateField('phone')}
                placeholder="+91 98765 43210"
                required
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {touched.phone && errors.phone && (
                <p className="text-xs text-danger mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.phone}
                </p>
              )}
            </div>

            {/* Subscription Plan & Member Limit (read-only) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="edit-plan-select"
                  className="block text-sm font-semibold text-secondary mb-1"
                >
                  Subscription Plan <span className="text-danger">*</span>
                </label>
                <select
                  id="edit-plan-select"
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                  className="w-full min-h-11 bg-input border border-border rounded-lg ps-3.5 pe-9 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (₹{p.price.toLocaleString('en-IN')}/mo)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="edit-member-limit"
                  className="block text-sm font-semibold text-secondary mb-1"
                >
                  Member Limit
                </label>
                <input
                  id="edit-member-limit"
                  type="text"
                  readOnly
                  disabled
                  value={selectedPlan ? `${selectedPlan.memberLimit} members` : '—'}
                  className="w-full min-h-11 bg-page border border-border rounded-lg px-4 py-2 text-sm font-medium text-disabled cursor-not-allowed"
                />
              </div>
            </div>

            {/* Plan Expiry Date */}
            <div>
              <label
                htmlFor="edit-plan-expiry"
                className="block text-sm font-semibold text-secondary mb-1"
              >
                Plan Expiry Date
              </label>
              <input
                id="edit-plan-expiry"
                type="date"
                value={planExpiresAt}
                onChange={(e) => setPlanExpiresAt(e.target.value)}
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            {/* Access Status & Reason if changed */}
            <div>
              <label
                htmlFor="edit-access-status"
                className="block text-sm font-semibold text-secondary mb-1"
              >
                Access Status
              </label>
              <select
                id="edit-access-status"
                value={accessStatus}
                onChange={(e) => {
                  setAccessStatus(e.target.value as 'ACTIVE' | 'INACTIVE');
                }}
                onBlur={() => validateField('accessStatus')}
                className="w-full min-h-11 bg-input border border-border rounded-lg ps-3.5 pe-9 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>

              {accessStatus !== tenant.accessStatus && (
                <div className="mt-3 p-3 bg-page border border-warning/40 rounded-lg space-y-2">
                  <label
                    htmlFor="edit-status-reason"
                    className="block text-xs font-semibold text-warning"
                  >
                    Reason for changing access status <span className="text-danger">*</span>
                  </label>
                  <input
                    id="edit-status-reason"
                    type="text"
                    value={statusReason}
                    onChange={(e) => setStatusReason(e.target.value)}
                    onBlur={() => validateField('accessStatus')}
                    placeholder="e.g. Terms violation, payment dispute, scheduled maintenance..."
                    required
                    className="w-full min-h-11 bg-input border border-border rounded-lg px-3 py-2 text-xs text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                  {touched.accessStatus && errors.statusReason && (
                    <p className="text-xs text-danger">{errors.statusReason}</p>
                  )}
                </div>
              )}
            </div>

            {/* Reset Password (Optional) */}
            <div>
              <label
                htmlFor="edit-password"
                className="block text-sm font-semibold text-secondary mb-1"
              >
                Reset Password <span className="font-normal text-disabled">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  id="edit-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validateField('password')}
                  placeholder="Leave blank to keep current password"
                  className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 pe-11 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute end-2 top-1/2 -translate-y-1/2 min-h-9 min-w-9 p-2 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-xs text-danger mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.password}
                </p>
              )}
            </div>
          </form>

          {/* Fixed Footer */}
          <div className="p-3.5 px-5 border-t border-border flex items-center justify-end gap-2.5 shrink-0 bg-card rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              disabled={updateMutation.isPending}
              className="h-9 px-4 py-1.5 rounded-lg border border-border text-xs sm:text-sm font-medium text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSave}
              className="inline-flex h-9 items-center gap-1.5 px-4.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-all shadow-xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending && (
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
              )}
              <span>{updateMutation.isPending ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sensitive Changes Before -> After Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Confirm Significant Changes"
        description={`You are making modifications to key account settings for ${tenant.gymName}.`}
        beforeAfterComparison={confirmChanges}
        requireReason={true}
        onConfirm={({ reason }) => executeSave(changedFields, reason)}
        onClose={() => setShowConfirmDialog(false)}
        isLoading={updateMutation.isPending}
        confirmLabel="Confirm & Apply Changes"
      />
    </>
  );
}

export function SuperadminGymsDirectoryTenantEditModal({
  isOpen,
  tenant,
  onClose,
  onSuccess,
}: SuperadminGymsDirectoryTenantEditModalProps) {
  if (!isOpen || !tenant) return null;
  return (
    <TenantEditModalContent
      key={tenant.id}
      tenant={tenant}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}

export const TenantEditModal = SuperadminGymsDirectoryTenantEditModal;
