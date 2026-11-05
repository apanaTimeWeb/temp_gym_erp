import { z } from 'zod';

import { WhiteLabelDomainSchema, WhiteLabelDomainsDataSchema, UpdateDomainStatusSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/schemas/superadmin_platform_configuration_white_labeling_settings_aliases.schemas';

import type { ApiResponse } from '@/lib/api';



export type WhiteLabelDomain = z.infer<typeof WhiteLabelDomainSchema>;
export type WhiteLabelDomainsListResponse = ApiResponse<z.infer<typeof WhiteLabelDomainsDataSchema>>;
export type UpdateDomainStatusDto = z.infer<typeof UpdateDomainStatusSchema>;
export type UpdateDomainStatusResponse = ApiResponse<WhiteLabelDomain>;
export type SuperadminPlatformConfigurationWhiteLabelingStatus = UpdateDomainStatusDto['status'];
