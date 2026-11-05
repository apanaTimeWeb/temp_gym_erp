import { describe, expect, it } from 'vitest';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/config/manager_communications_communications_churn_recovery.url_config';

describe('Churn Recovery route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES.PATHS.LEAF).toContain('/communications_churn_recovery'); }); });
