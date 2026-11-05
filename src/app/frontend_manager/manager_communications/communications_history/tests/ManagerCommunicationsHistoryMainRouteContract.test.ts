import { describe, expect, it } from 'vitest';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES } from '@/app/frontend_manager/manager_communications/communications_history/config/manager_communications_communications_history.url_config';

describe('Communication History route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES.PATHS.LEAF).toContain('/communications_history'); }); });
