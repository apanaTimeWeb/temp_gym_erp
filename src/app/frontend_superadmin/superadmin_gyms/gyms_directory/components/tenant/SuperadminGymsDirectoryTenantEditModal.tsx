'use client';

import React, { useRef, useEffect } from 'react';
import { X, ChevronRight, Loader2 } from 'lucide-react';
import { usePlans } from '../../services/SuperadminGymsDirectoryTenantService';
import { ConfirmDialog } from './SuperadminGymsDirectoryConfirmDialog';
import { useSuperadminGymsDirectoryTenantEditForm } from '../../hooks/useSuperadminGymsDirectoryTenantEditForm';
import { SuperadminGymsDirectoryTenantEditFormFields } from './SuperadminGymsDirectoryTenantEditFormFields';
import type { Tenant } from '../../types/SuperadminGymsDirectoryTenantTypes';

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

  const form = useSuperadminGymsDirectoryTenantEditForm({
    tenant,
    plans,
    onClose,
    onSuccess,
  });

  // Escape key & focus trap
  useEffect(() => {
    if (form.showConfirmDialog) return;

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
  }, [form.showConfirmDialog, onClose]);

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
              disabled={form.updateMutation.isPending}
              aria-label="Close dialog"
              className="h-8 w-8 min-h-8 min-w-8 p-1.5 rounded-lg border border-border text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center cursor-pointer disabled:opacity-50 shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable Body */}
          <form onSubmit={form.handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
            <SuperadminGymsDirectoryTenantEditFormFields
              gymName={form.gymName}
              setGymName={form.setGymName}
              ownerName={form.ownerName}
              setOwnerName={form.setOwnerName}
              adminEmail={form.adminEmail}
              setAdminEmail={form.setAdminEmail}
              phone={form.phone}
              setPhone={form.setPhone}
              planId={form.planId}
              setPlanId={form.setPlanId}
              planExpiresAt={form.planExpiresAt}
              setPlanExpiresAt={form.setPlanExpiresAt}
              accessStatus={form.accessStatus}
              setAccessStatus={form.setAccessStatus}
              statusReason={form.statusReason}
              setStatusReason={form.setStatusReason}
              password={form.password}
              setPassword={form.setPassword}
              showPassword={form.showPassword}
              setShowPassword={form.setShowPassword}
              plans={plans}
              selectedPlan={form.selectedPlan}
              errors={form.errors}
              touched={form.touched}
              validateField={form.validateField}
              originalAccessStatus={tenant.accessStatus}
              city={form.city}
              setCity={form.setCity}
              state={form.state}
              setState={form.setState}
              address={form.address}
              setAddress={form.setAddress}
              postalCode={form.postalCode}
              setPostalCode={form.setPostalCode}
              gstNumber={form.gstNumber}
              setGstNumber={form.setGstNumber}
            />
          </form>

          {/* Fixed Footer */}
          <div className="p-3.5 px-5 border-t border-border flex items-center justify-end gap-2.5 shrink-0 bg-card rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              disabled={form.updateMutation.isPending}
              className="h-9 px-4 py-1.5 rounded-lg border border-border text-xs sm:text-sm font-medium text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={form.handleSubmit}
              disabled={!form.canSave}
              className="inline-flex h-9 items-center gap-1.5 px-4.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-all shadow-xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {form.updateMutation.isPending && (
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
              )}
              <span>{form.updateMutation.isPending ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sensitive Changes Before -> After Confirmation Dialog */}
      <ConfirmDialog
        isOpen={form.showConfirmDialog}
        title="Confirm Significant Changes"
        description={`You are making modifications to key account settings for ${tenant.gymName}.`}
        beforeAfterComparison={form.confirmChanges}
        requireReason={true}
        onConfirm={({ reason }) => form.executeSave(form.changedFields, reason)}
        onClose={() => form.setShowConfirmDialog(false)}
        isLoading={form.updateMutation.isPending}
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
export default SuperadminGymsDirectoryTenantEditModal;
