'use client';

import React from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface SuperadminGymsDirectoryTenantEditPasswordFieldsProps {
  password: string;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  errors: { [key: string]: string | undefined };
  touched: { [key: string]: boolean };
  validateField: (field: string) => void;
}

export function SuperadminGymsDirectoryTenantEditPasswordFields({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  errors,
  touched,
  validateField,
}: SuperadminGymsDirectoryTenantEditPasswordFieldsProps) {
  return (
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
  );
}

export default SuperadminGymsDirectoryTenantEditPasswordFields;
