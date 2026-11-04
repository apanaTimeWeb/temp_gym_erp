// RESPONSIBILITY: Validates the newsletter email before the module's mail-client handoff.
import { z } from 'zod';
export const PublicLandingNewsletterSchema = z.object({ email: z.string().trim().email('validation.email') });
