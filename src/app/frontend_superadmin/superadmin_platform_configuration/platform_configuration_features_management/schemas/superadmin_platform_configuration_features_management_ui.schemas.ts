/** UI-only Zod contracts. User-visible messages are supplied by the active locale. */
import { z } from 'zod';

export interface SuperadminPlatformConfigurationFeaturesReleaseNoteValidationMessages {
  versionRequired: string;
  titleRequired: string;
  contentRequired: string;
}

const defaultMessages: SuperadminPlatformConfigurationFeaturesReleaseNoteValidationMessages = {
  versionRequired: 'Version is required',
  titleRequired: 'Title is required',
  contentRequired: 'Content is required',
};

export const createSuperadminPlatformConfigurationFeaturesReleaseNoteSchema = (messages: SuperadminPlatformConfigurationFeaturesReleaseNoteValidationMessages = defaultMessages) => z.object({
  version: z.string().trim().min(1, messages.versionRequired),
  title: z.string().trim().min(1, messages.titleRequired),
  content: z.string().trim().min(1, messages.contentRequired),
});

export const releaseNoteSchema = createSuperadminPlatformConfigurationFeaturesReleaseNoteSchema();
