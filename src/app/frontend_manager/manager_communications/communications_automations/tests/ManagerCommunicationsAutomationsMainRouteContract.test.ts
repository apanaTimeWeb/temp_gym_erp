import { describe, expect, it } from 'vitest';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES } from '@/app/frontend_manager/manager_communications/communications_automations/config/manager_communications_communications_automations.url_config';

describe('Communication Automations route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES.PATHS.LEAF).toContain('/communications_automations'); }); });
