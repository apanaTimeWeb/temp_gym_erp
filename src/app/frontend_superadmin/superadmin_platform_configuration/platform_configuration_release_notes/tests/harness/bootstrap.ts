import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminFeaturesHandlers, resetSuperadminPlatformConfigurationFeaturesMockState } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes/mocks/handlers/SuperadminPlatformConfigurationReleaseNotesMockHandlers';
export const platform_configuration_release_notesMockServer=setupServer(...superadminFeaturesHandlers);
export function createSuperadminPlatformConfigurationReleaseNotesMainQueryClient() { return new QueryClient({ defaultOptions: {queries:{retry:false},mutations:{retry:false}} }); }
export function startSuperadminPlatformConfigurationReleaseNotesMainMocks() { platform_configuration_release_notesMockServer.listen({onUnhandledRequest:'error'}); }
export function resetSuperadminPlatformConfigurationReleaseNotesMainMocks() { platform_configuration_release_notesMockServer.resetHandlers();  resetSuperadminPlatformConfigurationFeaturesMockState(); }
export function stopSuperadminPlatformConfigurationReleaseNotesMainMocks() { platform_configuration_release_notesMockServer.close(); }
