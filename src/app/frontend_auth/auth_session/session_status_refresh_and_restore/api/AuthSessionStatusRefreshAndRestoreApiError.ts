// RESPONSIBILITY: Defines the safe Auth API error object exposed to module hooks without leaking raw transport details.

import type { ValidationErrorItem } from '@/lib/api';

/**
 * Represents an Auth API failure using a safe backend message, machine-readable error code, and optional field validation details.
 * @description Prevents raw transport/error objects from crossing into the Login UI.
 * @dependencies Global ApiResponse validation types.
 * @edge-case Missing backend messages are handled by the Login-safe translation fallback.
 */
export class AuthApiError extends Error {
  public readonly errorCode?: string;
  public readonly validationErrors?: ValidationErrorItem[];

  public constructor(message = '', errorCode?: string, validationErrors?: ValidationErrorItem[]) {
    super(message);
    this.name = 'AuthApiError';
    this.errorCode = errorCode;
    this.validationErrors = validationErrors;
  }
}

