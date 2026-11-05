import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminAffiliatesHandlers, resetSuperadminAffiliatesMockState } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/mocks/handlers/SuperadminAffiliatesPayoutHistoryMockHandlers';
export const affiliates_payout_historyMockServer=setupServer(...superadminAffiliatesHandlers);
export function createSuperadminAffiliatesPayoutHistoryMainQueryClient() { return new QueryClient({ defaultOptions: {queries:{retry:false},mutations:{retry:false}} }); }
export function startSuperadminAffiliatesPayoutHistoryMainMocks() { affiliates_payout_historyMockServer.listen({onUnhandledRequest:'error'}); }
export function resetSuperadminAffiliatesPayoutHistoryMainMocks() { affiliates_payout_historyMockServer.resetHandlers();  resetSuperadminAffiliatesMockState(); }
export function stopSuperadminAffiliatesPayoutHistoryMainMocks() { affiliates_payout_historyMockServer.close(); }
