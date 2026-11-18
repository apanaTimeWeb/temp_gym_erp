'use client';

import React from 'react';
import type { PasswordValidationResult } from '../utils/SuperadminGymsDirectoryValidators';

export interface SuperadminGymsDirectoryPasswordStrengthBarProps {
  passwordResult: PasswordValidationResult;
}

export function SuperadminGymsDirectoryPasswordStrengthBar({
  passwordResult,
}: SuperadminGymsDirectoryPasswordStrengthBarProps) {
  const strengthColor =
    passwordResult.strength === 'Strong'
      ? 'text-success'
      : passwordResult.strength === 'Good'
        ? 'text-primary'
        : passwordResult.strength === 'Fair'
          ? 'text-warning'
          : 'text-danger';

  return (
    <div className="mt-2 space-y-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-secondary">Password Strength:</span>
        <span className={`font-bold ${strengthColor}`}>{passwordResult.strength}</span>
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
  );
}

export default SuperadminGymsDirectoryPasswordStrengthBar;
