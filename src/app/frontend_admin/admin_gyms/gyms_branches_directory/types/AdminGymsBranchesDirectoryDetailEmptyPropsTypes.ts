// RESPONSIBILITY: Defines feature-local TypeScript contracts for branches_directory; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_branches/branches_directory/types/AdminGymsBranchesDirectoryDetailEmptyPropsTypes.ts)

// Type contract owned by this module; extracted from the component signature for AI isolation.
import type { Branch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes';
import type { DetailView } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryUiTypes';

export interface AdminBranchesDetailEmptyProps {
  label: string;
}
