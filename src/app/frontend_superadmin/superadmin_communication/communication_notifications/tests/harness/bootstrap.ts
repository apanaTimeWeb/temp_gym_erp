import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminCommunicationNotificationsHandlers,resetSuperadminCommunicationNotificationsMockState } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/mocks/handlers/SuperadminCommunicationNotificationsMockHandlers';
export const notificationsMockServer=setupServer(...superadminCommunicationNotificationsHandlers);
export const createNotificationsQueryClient=()=>new QueryClient({defaultOptions:{queries:{retry:false},mutations:{retry:false}}});
export const startNotificationsMockServer=()=>notificationsMockServer.listen({onUnhandledRequest:'error'});
export const resetNotificationsMockState=()=>{notificationsMockServer.resetHandlers();resetSuperadminCommunicationNotificationsMockState()};
export const stopNotificationsMockServer=()=>notificationsMockServer.close();
