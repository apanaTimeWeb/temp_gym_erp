import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

function readLocaleFile(fileName: string): unknown {
  return JSON.parse(readFileSync(new URL(`../auth_login_locales/${fileName}`, import.meta.url), 'utf-8')) as unknown;
}

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return [prefix];
  return Object.entries(value).flatMap(([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key));
}

describe('Auth Login active locale parity', () => {
  it('keeps Hindi translation keys exactly aligned with English', () => {
    const english = readLocaleFile('auth_login_en.json');
    const hindi = readLocaleFile('auth_login_hi.json');
    expect(flattenKeys(hindi).sort()).toEqual(flattenKeys(english).sort());
  });
});
