import { describe, expect, it } from 'vitest';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES } from '@/app/frontend_manager/manager_communications/communications_compose/config/manager_communications_communications_compose.url_config';

describe('Compose Messages route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES.PATHS.LEAF).toContain('/communications_compose'); }); });
