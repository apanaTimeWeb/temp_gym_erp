// Editable app links must reject unsafe protocols even when URLs are syntactically valid.
import { describe, expect, it } from 'vitest';
import { AppIntegrationSettingsSchema } from '@/app/frontend_admin/admin_settings/settings_management/schemas/AdminSettingsManagementSchemas';
const base = { memberAppEnabled:false,qrCheckInEnabled:false,onlinePaymentsEnabled:false,dietPlanEnabled:false,workoutPlanEnabled:false,progressTrackingEnabled:false,pushNotificationsEnabled:false,apiKey:'',webhookUrl:'' };
describe('app link URL protocol',()=>{
  it('accepts HTTPS and empty optional links',()=>{expect(AppIntegrationSettingsSchema.safeParse({...base,appStoreLink:'https://apps.apple.com/',playStoreLink:''}).success).toBe(true);});
  it('rejects javascript, HTTP and data protocols',()=>{for(const link of ['javascript:alert(1)','http://example.com','data:text/html,hello','https://user:pass@example.com/path','https://user@example.com/path','https://example.com/\nnext']) expect(AppIntegrationSettingsSchema.safeParse({...base,appStoreLink:link,playStoreLink:''}).success).toBe(false);});
});
