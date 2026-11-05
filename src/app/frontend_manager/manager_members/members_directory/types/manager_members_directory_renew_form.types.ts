import type { z } from 'zod';

import type { managerMembersRenewFormSchema } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_renew_form.schemas';


export type ManagerMembersDirectoryRenewFormValues = z.infer<typeof managerMembersRenewFormSchema>;
