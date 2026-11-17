import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('ManagerStaffDirectoryStaffTable.tsx responsive table contract', () => {
  it('uses the shared density, labelled mobile-card, and existing-action adapter', () => {
    const componentPath = path.resolve(__dirname, '../components/ManagerStaffDirectoryStaffTable.tsx');
    const componentSource = readFileSync(componentPath, 'utf8');
    expect(componentSource).toContain('ManagerInfrastructureResponsiveTable');
    expect(componentSource).toContain('labels={');
  });
});
