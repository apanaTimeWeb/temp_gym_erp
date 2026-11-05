import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminProfileHandlers, resetSuperadminAccountProfileMockState } from '@/app/frontend_superadmin/superadmin_account/account_security/mocks/handlers/SuperadminAccountSecurityMockHandlers';
export const account_securityMockServer=setupServer(...superadminProfileHandlers);
export function createSuperadminAccountSecurityMainQueryClient() { return new QueryClient({ defaultOptions: {queries:{retry:false},mutations:{retry:false}} }); }
export function startSuperadminAccountSecurityMainMocks() { account_securityMockServer.listen({onUnhandledRequest:'error'}); }
export function resetSuperadminAccountSecurityMainMocks() { account_securityMockServer.resetHandlers();  resetSuperadminAccountProfileMockState(); }
export function stopSuperadminAccountSecurityMainMocks() { account_securityMockServer.close(); }
