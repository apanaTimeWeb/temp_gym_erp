import type { SuperadminNotification } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/types/superadmin_communication_notifications.types';
/** Fixture values copied from the v12 Messaging Center. */
export const MOCK_SUPERADMIN_NOTIFICATIONS: SuperadminNotification[] = [
 { id:'n1',title:'System Load High',body:'Database CPU utilization at 90%',type:'WARNING',read:false,createdAt:'2026-09-15T08:00:00Z' },
 { id:'n2',title:'New Tenant Signup',body:'Fit Life Studio has joined.',type:'INFO',read:true,createdAt:'2026-09-14T14:30:00Z' },
 { id:'n3',title:'Backup Completed',body:'Nightly backup completed successfully.',type:'INFO',read:false,createdAt:'2026-09-12T06:20:00Z' },
 { id:'n4',title:'Invoice Failed',body:'An invoice payment failed and needs review.',type:'CRITICAL',read:false,createdAt:'2026-09-10T17:45:00Z' },
];
