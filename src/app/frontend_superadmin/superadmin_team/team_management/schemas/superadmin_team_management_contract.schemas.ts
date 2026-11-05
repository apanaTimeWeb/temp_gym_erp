/** Runtime API contracts for the Team feature. Alert names are stable UI/mutation identity. */
import { z } from 'zod';
const AlertSchema = z.object({ name: z.string().trim().min(1), channel: z.string().trim().min(1), threshold: z.string().trim().min(1), enabled: z.boolean() });
const UniqueAlertNames = <T extends { name: string }>(items: T[], ctx: z.RefinementCtx) => {
  const seen = new Set<string>();
  items.forEach((item, index) => {
    if (seen.has(item.name)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [index, 'name'], message: 'Alert names must be unique.' });
    seen.add(item.name);
  });
};
export const SuperadminTeamResponseSchema = z.object({
  users: z.array(z.object({ id:z.string(), name:z.string(), email:z.string().email(), role:z.string(), status:z.string(), mfa:z.string().nullable(), lastLogin:z.string().nullable() })),
  roles: z.array(z.object({ name:z.string(), scope:z.string(), permissions:z.number() })),
  alerts: z.array(AlertSchema).superRefine(UniqueAlertNames),
});
export const SuperadminTeamAlertPreferencesUpdateRequestSchema = z.object({
  preferences: z.array(z.object({ name: z.string().trim().min(1), enabled: z.boolean() })).superRefine(UniqueAlertNames),
});
export const SuperadminTeamAlertPreferencesUpdateResponseSchema = z.object({ data: z.null() });
