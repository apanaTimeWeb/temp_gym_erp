import type { z } from 'zod';

import type { managerPasswordFormSchema, managerProfileFormSchema } from '@/app/frontend_manager/manager_dashboard/profile_and_security/schemas/manager_profile_and_security_form_forms.schemas';

export type ManagerProfileAndSecurityFormValues = z.infer<typeof managerProfileFormSchema>;
export type ManagerPasswordFormValues = z.infer<typeof managerPasswordFormSchema>;
