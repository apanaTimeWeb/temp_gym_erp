import type { z } from 'zod';

import type { managerCommunicationsFormSchema } from '@/app/frontend_manager/manager_communications/communications_compose/schemas/manager_communications_campaigns_form.schemas';

export type CommFormValues = z.infer<typeof managerCommunicationsFormSchema>;
