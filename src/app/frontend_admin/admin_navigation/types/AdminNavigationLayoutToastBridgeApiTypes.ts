// RESPONSIBILITY: Defines the AdminNavigationLayoutToastBridgeApiTypes route, lifecycle boundary, or module support artifact for admin_navigation shell types; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutToastBridgeApiTypes.ts)

import { toast } from 'react-hot-toast';
export type ToastBridgeApi = {
  success: typeof toast.success;
  error: typeof toast.error;
}
