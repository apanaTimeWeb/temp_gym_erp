/** Runtime validation contract for the tenant-level message composer. Presentation strings are resolved at the form boundary. */
import { z } from 'zod';
export const SuperadminCommunicationMessagingComposeSchema = z.object({
  tenantId: z.string().min(1, 'ui.validation_select_tenant'),
  channel: z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'IN_APP']),
  subject: z.string().trim().min(1, 'ui.validation_subject_required').max(200, 'ui.validation_subject_max'),
  body: z.string().trim().min(1, 'ui.validation_body_required').max(5000, 'ui.validation_body_max'),
});
