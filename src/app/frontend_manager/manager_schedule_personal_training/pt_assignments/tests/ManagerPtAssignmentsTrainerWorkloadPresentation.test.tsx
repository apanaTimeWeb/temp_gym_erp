import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

describe('ManagerPtAssignmentsTrainerWorkload.tsx responsive table contract', () => {
  it('uses the shared density, labelled mobile-card, and existing-action adapter', () => {
    const componentSource = readFileSync(fileURLToPath(new URL('../components/ManagerPtAssignmentsTrainerWorkload.tsx', import.meta.url)), 'utf8');
    expect(componentSource).toContain('ManagerInfrastructureResponsiveTable');
    expect(componentSource).toContain('labels={');
  });
});
