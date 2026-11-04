import type { ValidationErrorItem } from '@/lib/api';

import type { ZodIssue } from 'zod';



export const AuthValidationUtilities = {
  /**
   * Maps Zod field paths to backend-compatible validation error items.
   * @param issues Zod issues produced by a request-boundary schema.
   * @returns Stable field/message pairs without leaking internal issue metadata.
   */
  toValidationErrors(issues: ZodIssue[]): ValidationErrorItem[] {
    return issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
  },
};
