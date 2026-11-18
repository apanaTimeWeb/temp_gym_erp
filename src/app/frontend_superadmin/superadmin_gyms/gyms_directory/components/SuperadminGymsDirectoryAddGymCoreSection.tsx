'use client';

import React from 'react';
import { Eye, EyeOff, Sparkles, Copy, Check, AlertCircle } from 'lucide-react';
import { formatAadhaar } from '../utils/SuperadminGymsDirectoryValidators';
import type { PasswordValidationResult } from '../utils/SuperadminGymsDirectoryValidators';

export interface SuperadminGymsDirectoryAddGymCoreSectionProps {
  gymName: string;
  setGymName: (val: string) => void;
  gymNameInputRef: React.RefObject<HTMLInputElement | null>;
  ownerName: string;
  setOwnerName: (val: string) => void;
  ownerNameInputRef: React.RefObject<HTMLInputElement | null>;
  adminEmail: string;
  setAdminEmail: (val: string) => void;
  adminEmailInputRef: React.RefObject<HTMLInputElement | null>;
  isCheckingEmail: boolean;
  emailExistsError: string | null;
  phone: string;
  setPhone: (val: string) => void;
  phoneInputRef: React.RefObject<HTMLInputElement | null>;
  rawAadhaar: string;
  setRawAadhaar: (val: string) => void;
  aadhaarInputRef: React.RefObject<HTMLInputElement | null>;
  temporaryPassword: string;
  setTemporaryPassword: (val: string) => void;
  temporaryPasswordInputRef: React.RefObject<HTMLInputElement | null>;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  copiedPassword: boolean;
  passwordResult: PasswordValidationResult;
  handleGeneratePassword: () => void;
  handleCopyPassword: () => void;
  isProvisioning: boolean;
  provisioningDone: boolean;
  errors: { [key: string]: string | undefined };
  touched: { [key: string]: boolean };
  handleBlur: (field: string) => void;
}

export function SuperadminGymsDirectoryAddGymCoreSection({
  gymName,
  setGymName,
  gymNameInputRef,
  ownerName,
  setOwnerName,
  ownerNameInputRef,
  adminEmail,
  setAdminEmail,
  adminEmailInputRef,
  isCheckingEmail,
  emailExistsError,
  phone,
  setPhone,
  phoneInputRef,
  rawAadhaar,
  setRawAadhaar,
  aadhaarInputRef,
  temporaryPassword,
  setTemporaryPassword,
  temporaryPasswordInputRef,
  showPassword,
  setShowPassword,
  copiedPassword,
  passwordResult,
  handleGeneratePassword,
  handleCopyPassword,
  isProvisioning,
  provisioningDone,
  errors,
  touched,
  handleBlur,
}: SuperadminGymsDirectoryAddGymCoreSectionProps) {
  return (
    <div>
      <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
        Core Facility & Owner Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Gym Name (*) */}
        <div>
          <label htmlFor="provision-gym-name" className="block text-sm font-semibold text-secondary mb-1">
            Gym Name <span className="text-danger">*</span>
          </label>
          <input
            ref={gymNameInputRef}
            id="provision-gym-name"
            type="text"
            value={gymName}
            onChange={(e) => setGymName(e.target.value)}
            onBlur={() => handleBlur('gymName')}
            placeholder="e.g. Titan Strength Club"
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          {touched.gymName && errors.gymName && (
            <p className="text-xs text-danger mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.gymName}
            </p>
          )}
        </div>

        {/* Owner Name (*) */}
        <div>
          <label htmlFor="provision-owner-name" className="block text-sm font-semibold text-secondary mb-1">
            Owner Name <span className="text-danger">*</span>
          </label>
          <input
            ref={ownerNameInputRef}
            id="provision-owner-name"
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            onBlur={() => handleBlur('ownerName')}
            placeholder="e.g. John Doe"
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          {touched.ownerName && errors.ownerName && (
            <p className="text-xs text-danger mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.ownerName}
            </p>
          )}
        </div>

        {/* Admin Email (*) */}
        <div>
          <label htmlFor="provision-admin-email" className="block text-sm font-semibold text-secondary mb-1">
            Admin Email <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <input
              ref={adminEmailInputRef}
              id="provision-admin-email"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              onBlur={() => handleBlur('adminEmail')}
              placeholder="admin@titangym.com"
              disabled={isProvisioning || provisioningDone}
              className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            {isCheckingEmail && (
              <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-disabled">
                Checking...
              </span>
            )}
          </div>
          {touched.adminEmail && errors.adminEmail && (
            <p className="text-xs text-danger mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.adminEmail}
            </p>
          )}
          {emailExistsError && !errors.adminEmail && (
            <p className="text-xs text-danger mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {emailExistsError}
            </p>
          )}
        </div>

        {/* Phone (*) */}
        <div>
          <label htmlFor="provision-phone" className="block text-sm font-semibold text-secondary mb-1">
            Phone Number <span className="text-danger">*</span>
          </label>
          <input
            ref={phoneInputRef}
            id="provision-phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="+91 98765 43210"
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          {touched.phone && errors.phone && (
            <p className="text-xs text-danger mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.phone}
            </p>
          )}
        </div>

        {/* Aadhaar Number (Optional) */}
        <div>
          <label htmlFor="provision-aadhaar" className="block text-sm font-semibold text-secondary mb-1">
            Aadhaar Number <span className="font-normal text-disabled">(Optional)</span>
          </label>
          <input
            ref={aadhaarInputRef}
            id="provision-aadhaar"
            type="text"
            value={formatAadhaar(rawAadhaar)}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '').slice(0, 12);
              setRawAadhaar(digits);
            }}
            onBlur={() => handleBlur('rawAadhaar')}
            placeholder="XXXX XXXX XXXX"
            maxLength={14}
            disabled={isProvisioning || provisioningDone}
            className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono"
          />
          {touched.rawAadhaar && errors.rawAadhaar && (
            <p className="text-xs text-danger mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.rawAadhaar}
            </p>
          )}
        </div>

        {/* Temporary Password (*) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="provision-password" className="text-sm font-semibold text-secondary">
              Temporary Password <span className="text-danger">*</span>
            </label>
            <button
              type="button"
              onClick={handleGeneratePassword}
              disabled={isProvisioning || provisioningDone}
              className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles size={12} /> Generate
            </button>
          </div>
          <div className="relative">
            <input
              ref={temporaryPasswordInputRef}
              id="provision-password"
              type={showPassword ? 'text' : 'password'}
              value={temporaryPassword}
              onChange={(e) => setTemporaryPassword(e.target.value)}
              onBlur={() => handleBlur('temporaryPassword')}
              placeholder="Min 10 chars (upper, lower, num, sym)"
              disabled={isProvisioning || provisioningDone}
              className="w-full min-h-11 bg-card border border-border text-primary rounded-lg px-4 py-2 pe-20 text-sm placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono"
            />
            <div className="absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {temporaryPassword && (
                <button
                  type="button"
                  onClick={handleCopyPassword}
                  title="Copy Password"
                  className="p-1.5 text-secondary hover:text-primary rounded"
                >
                  {copiedPassword ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="p-1.5 text-secondary hover:text-primary rounded"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Password Strength Meter */}
          {temporaryPassword && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Password Strength:</span>
                <span
                  className={`font-bold ${
                    passwordResult.strength === 'Strong'
                      ? 'text-success'
                      : passwordResult.strength === 'Good'
                        ? 'text-primary'
                        : passwordResult.strength === 'Fair'
                          ? 'text-warning'
                          : 'text-danger'
                  }`}
                >
                  {passwordResult.strength}
                </span>
              </div>
              <div className="h-1.5 w-full bg-input rounded-full overflow-hidden flex gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full flex-1 rounded-full transition-colors ${
                      passwordResult.score >= step
                        ? step === 4
                          ? 'bg-success'
                          : step === 3
                            ? 'bg-primary'
                            : step === 2
                              ? 'bg-warning'
                              : 'bg-danger'
                        : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {touched.temporaryPassword && errors.temporaryPassword && (
            <p className="text-xs text-danger mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.temporaryPassword}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuperadminGymsDirectoryAddGymCoreSection;
