/** Runtime validation schemas for platform-setting records and update requests. */
import { z } from 'zod';
/** Secret values are write-only in this UI; never retain server-returned secret material in query state. */
export function isSensitivePlatformSettingKey(key: string): boolean {
  return /(?:SECRET|TOKEN|PASSWORD|PASSWD|API[_-]?KEY|PRIVATE[_-]?KEY|CREDENTIAL)/i.test(key);
}

export function isSuperadminSettingValueValid(dataType: 'string' | 'number' | 'boolean', value: string): boolean {
  if (dataType === 'number') return value.trim().length > 0 && Number.isFinite(Number(value));
  if (dataType === 'boolean') return value === 'true' || value === 'false';
  return typeof value === 'string';
}
export const PlatformSettingSchema = z.object({
  id: z.string().min(1), key: z.string().min(1), value: z.string(), description: z.string(), category: z.string(), dataType: z.enum(['string', 'number', 'boolean']),
}).superRefine((setting, context) => {
  if (!isSuperadminSettingValueValid(setting.dataType, setting.value)) context.addIssue({ code: z.ZodIssueCode.custom, path: ['value'], message: 'ui.setting_value_invalid' });
});
export const SettingUpdateSchema = z.object({ value: z.string() });


/** Strip server-returned credential material before settings enter client query/cache state. */
export function redactSensitivePlatformSettingValues<T extends { key: string; value: string }>(settings: T[]): T[] {
  return settings.map((setting) => isSensitivePlatformSettingKey(setting.key) ? { ...setting, value: '' } : setting);
}
