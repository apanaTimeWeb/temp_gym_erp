// RESPONSIBILITY: Login-only request idempotency, intent fingerprint and Zod error normalization.
import type { ZodIssue } from 'zod';
import type { ValidationErrorItem } from '@/lib/api';
import { AuthLoginSessionConstants } from '../constants/AuthLoginCredentialsAndDemoAccessServerConstants';
import type { AuthLoginServerCredentials, AuthLoginServerRole } from '../types/AuthLoginCredentialsAndDemoAccessServerTypes';
export const AuthLoginRequestHeaderUtilities = {
  getIdempotencyKey(request:Pick<Request,'headers'>):string|null {
    const key=request.headers.get(AuthLoginSessionConstants.HEADERS.IDEMPOTENCY_KEY)?.trim();
    const uuidV4=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return key && uuidV4.test(key)?key:null;
  },
} as const;
export const AuthLoginIdempotencyFingerprintUtilities = {
  async forLogin(credentials:AuthLoginServerCredentials):Promise<string> {
    const input=`${credentials.email.trim().toLowerCase()}\u0000${credentials.password}`;
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(input));
    return Array.from(new Uint8Array(digest),byte=>byte.toString(16).padStart(2,'0')).join('');
  },
  forDemoRole(role:AuthLoginServerRole):string {return `demo:${role}`;},
} as const;
export const AuthLoginValidationUtilities = {
  toValidationErrors(issues:ZodIssue[]):ValidationErrorItem[] {return issues.map(issue=>({field:issue.path.join('.'),message:issue.message}));},
} as const;
