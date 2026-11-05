import type { SuperadminNotification } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/types/superadmin_communication_notifications.types';
import type { ApiResponse } from '@/lib/api';



export type NotificationsQueryData = ApiResponse<SuperadminNotification[]>;
