import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { TRAINER_NAVIGATION_GROUPS } from '@/app/frontend_trainer/trainer_navigation/config/TrainerNavigationConstants';
import { TRAINER_NAVIGATION_URL_CONFIG } from '@/app/frontend_trainer/trainer_navigation/config/trainer_navigation.url_config';

describe('Trainer navigation URL contracts', () => {
  it('exposes a typed socket consumer without taking ownership of host transport', () => {
    const hook = readFileSync(resolve(process.cwd(), 'src/app/frontend_trainer/trainer_navigation/hooks/useTrainerNavigationSocket.ts'), 'utf8');
    const provider = readFileSync(resolve(process.cwd(), 'src/app/frontend_trainer/trainer_navigation/components/TrainerNavigationSocketProvider.tsx'), 'utf8');
    const client = readFileSync(resolve(process.cwd(), 'src/app/frontend_trainer/trainer_navigation/api/TrainerNavigationSocketClient.ts'), 'utf8');
    expect(hook).toContain('useTrainerNavigationSocket');
    expect(hook).toContain('TrainerNavigationSocketContext');
    expect(provider).toMatch(/export\s*\/\*[\s\S]*?\*\/\s*const TrainerNavigationSocketContext/);
    expect(client).toContain('Never disconnect the host-owned shared connection');
  });

  it('retains the eleven supported destination URLs under six trainer domains', () => {
    const hrefs = TRAINER_NAVIGATION_GROUPS.flatMap((group) => group.items.map((item) => item.href));
    const contractHrefs = Object.values(TRAINER_NAVIGATION_URL_CONFIG.ROUTES);

    expect(TRAINER_NAVIGATION_GROUPS.map((group) => group.groupKey)).toEqual([
      'TEXT_NAV_OVERVIEW',
      'TEXT_NAV_MEMBERS',
      'TEXT_NAV_COACHING',
      'TEXT_NAV_OPERATIONS',
      'TEXT_NAV_EARNINGS_DOMAIN',
      'TEXT_NAV_ACCOUNT',
    ]);
    expect(hrefs).toHaveLength(11);
    expect(new Set(hrefs).size).toBe(11);
    expect(new Set(contractHrefs)).toEqual(new Set(hrefs));
  });
});
