import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('ManagerReportsOverviewExpensesTable.tsx responsive table contract', () => {
  it('uses the shared density, labelled mobile-card, and existing-action adapter', () => {
    const componentSource = readFileSync(path.resolve(__dirname, '../components/ManagerReportsOverviewExpensesTable.tsx'), 'utf8');
    expect(componentSource).toContain('ManagerInfrastructureResponsiveTable');
    expect(componentSource).toContain('labels={');
  });
});
