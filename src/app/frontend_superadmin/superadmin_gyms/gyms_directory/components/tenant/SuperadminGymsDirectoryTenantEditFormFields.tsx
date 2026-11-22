'use client';

import React from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
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
          <div className="mt-3 p-3 bg-page border border-warning/40 rounded-lg space-y-2">
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

      {/* Address & Location */}
      {setAddress && (
        <div>
          <label htmlFor="edit-address" className="block text-sm font-semibold text-secondary mb-1">
            Facility Address
          </label>
          <input
            id="edit-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. 123 Fitness Ave, Sector 4"
            className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      )}

      {/* City & State */}
      {(setCity || setState) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {setCity && (
            <div>
              <label htmlFor="edit-city" className="block text-sm font-semibold text-secondary mb-1">
                City
              </label>
              <input
                id="edit-city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          )}
          {setState && (
            <div>
              <label htmlFor="edit-state" className="block text-sm font-semibold text-secondary mb-1">
                State
              </label>
              <input
                id="edit-state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Maharashtra"
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          )}
        </div>
      )}

      {/* Postal Code & GST Number */}
      {(setPostalCode || setGstNumber) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {setPostalCode && (
            <div>
              <label htmlFor="edit-postal-code" className="block text-sm font-semibold text-secondary mb-1">
                PIN / Postal Code
              </label>
              <input
                id="edit-postal-code"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="e.g. 400001"
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          )}
          {setGstNumber && (
            <div>
              <label htmlFor="edit-gst-number" className="block text-sm font-semibold text-secondary mb-1">
                GSTIN / Tax ID
              </label>
              <input
                id="edit-gst-number"
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                placeholder="e.g. 27AAAAA0000A1Z5"
                className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary uppercase placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono"
              />
            </div>
          )}
        </div>
      )}

      {/* Reset Password (Optional) */}
      <div>
        <label htmlFor="edit-password" className="block text-sm font-semibold text-secondary mb-1">
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
    </div>
  );
}

export default SuperadminGymsDirectoryTenantEditFormFields;
