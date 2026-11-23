'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { SuperadminGymsDirectoryTenantEditLocationFields } from './SuperadminGymsDirectoryTenantEditLocationFields';
import { SuperadminGymsDirectoryTenantEditPasswordFields } from './SuperadminGymsDirectoryTenantEditPasswordFields';
import type { Plan } from '../../types/SuperadminGymsDirectoryTenantTypes';

export interface SuperadminGymsDirectoryTenantEditFormFieldsProps {
  gymName: string;
  setGymName: (val: string) => void;
  ownerName: string;
  setOwnerName: (val: string) => void;
  adminEmail: string;
  setAdminEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  planId: string;
  setPlanId: (val: string) => void;
  planExpiresAt: string;
  setPlanExpiresAt: (val: string) => void;
  accessStatus: 'ACTIVE' | 'INACTIVE';
  setAccessStatus: (val: 'ACTIVE' | 'INACTIVE') => void;
  statusReason: string;
  setStatusReason: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  plans: Plan[];
  selectedPlan: Plan | undefined;
  errors: { [key: string]: string | undefined };
  touched: { [key: string]: boolean };
  validateField: (field: string) => void;
  originalAccessStatus: string;
  city?: string;
  setCity?: (val: string) => void;
  state?: string;
  setState?: (val: string) => void;
  address?: string;
  setAddress?: (val: string) => void;
  postalCode?: string;
  setPostalCode?: (val: string) => void;
  gstNumber?: string;
  setGstNumber?: (val: string) => void;
}

export function SuperadminGymsDirectoryTenantEditFormFields({
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
  statusReason,
  setStatusReason,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  plans,
  selectedPlan,
  errors,
  touched,
  validateField,
  originalAccessStatus,
  city = '',
  setCity,
  state = '',
  setState,
  address = '',
  setAddress,
  postalCode = '',
  setPostalCode,
  gstNumber = '',
  setGstNumber,
}: SuperadminGymsDirectoryTenantEditFormFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Gym Name */}
      <div>
        <label htmlFor="edit-gym-name" className="block text-sm font-semibold text-secondary mb-1">
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
        <label htmlFor="edit-owner-name" className="block text-sm font-semibold text-secondary mb-1">
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
        <label htmlFor="edit-admin-email" className="block text-sm font-semibold text-secondary mb-1">
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
        <label htmlFor="edit-phone" className="block text-sm font-semibold text-secondary mb-1">
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
          <label htmlFor="edit-plan-select" className="block text-sm font-semibold text-secondary mb-1">
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
          <label htmlFor="edit-member-limit" className="block text-sm font-semibold text-secondary mb-1">
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
        <label htmlFor="edit-plan-expiry" className="block text-sm font-semibold text-secondary mb-1">
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
        <label htmlFor="edit-access-status" className="block text-sm font-semibold text-secondary mb-1">
          Access Status
        </label>
        <select
          id="edit-access-status"
          value={accessStatus}
          onChange={(e) => setAccessStatus(e.target.value as 'ACTIVE' | 'INACTIVE')}
          onBlur={() => validateField('accessStatus')}
          className="w-full min-h-11 bg-input border border-border rounded-lg ps-3.5 pe-9 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

        {accessStatus !== originalAccessStatus && (
          <div className="mt-3 p-3 bg-page border border-warning rounded-lg space-y-2">
            <label htmlFor="edit-status-reason" className="block text-xs font-semibold text-warning">
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

      {/* Location & Tax Fields */}
      <SuperadminGymsDirectoryTenantEditLocationFields
        address={address}
        setAddress={setAddress}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        gstNumber={gstNumber}
        setGstNumber={setGstNumber}
      />

      {/* Reset Password (Optional) */}
      <SuperadminGymsDirectoryTenantEditPasswordFields
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        errors={errors}
        touched={touched}
        validateField={validateField}
      />
    </div>
  );
}

export default SuperadminGymsDirectoryTenantEditFormFields;
