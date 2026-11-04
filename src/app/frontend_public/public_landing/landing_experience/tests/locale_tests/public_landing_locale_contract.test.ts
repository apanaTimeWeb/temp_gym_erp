import { describe, expect, it } from 'vitest';
import enMessages from '@/app/frontend_public/public_landing/landing_experience/locales/public_landing_en.json';
import hiMessages from '@/app/frontend_public/public_landing/landing_experience/locales/public_landing_hi.json';

function flattenMessageTree(value: unknown, prefix = ''): Map<string, string> {
  const entries = new Map<string, string>();
  if (typeof value === 'string') {
    entries.set(prefix, 'string');
    return entries;
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      const path = prefix ? `${prefix}.${key}` : key;
      for (const [nestedPath, type] of flattenMessageTree(child, path)) entries.set(nestedPath, type);
    }
  }
  return entries;
}

describe('PublicLanding locale contract', () => {
  it('keeps English and Hindi translation paths and value types aligned', () => {
    expect([...flattenMessageTree(enMessages).entries()].sort()).toEqual([...flattenMessageTree(hiMessages).entries()].sort());
  });
});
