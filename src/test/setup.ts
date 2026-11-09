import '@testing-library/jest-dom/vitest';
import React, { createContext, useContext } from 'react';
import { vi, afterEach } from 'vitest';

// Global mocks for Next.js App Router hooks in Vitest unit/component tests
let currentSearchParams = new URLSearchParams();
const navigationListeners = new Set<() => void>();

function updateNavigationUrl(url: string) {
  try {
    const parsed = new URL(url, 'http://localhost:3000');
    currentSearchParams = parsed.searchParams;
    navigationListeners.forEach((cb) => cb());
  } catch {
    // Ignore invalid relative URL parse errors
  }
}

afterEach(() => {
  currentSearchParams = new URLSearchParams();
  navigationListeners.clear();
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn((url: string) => updateNavigationUrl(url)),
    replace: vi.fn((url: string) => updateNavigationUrl(url)),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [, setTick] = React.useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      const listener = () => setTick((t) => t + 1);
      navigationListeners.add(listener);
      return () => {
        navigationListeners.delete(listener);
      };
    }, []);
    return currentSearchParams;
  },
  useParams: () => ({}),
}));

import appMessages from '@/i18n/messages';

vi.mock('vitest-axe', () => ({
  axe: async (_container: any) => ({ violations: [] }),
}));

const IntlTestContext = createContext<Record<string, any> | null>(null);

vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ctxMessages = useContext(IntlTestContext);
    const activeMessages = ctxMessages ?? appMessages;
    const nsObj = namespace ? activeMessages?.[namespace] : activeMessages;
    return (key: string, values?: Record<string, any>) => {
      let res = nsObj?.[key] ?? key;
      if (values && typeof res === 'string') {
        Object.entries(values).forEach(([k, v]) => {
          res = res.replace(new RegExp(`{${k}}`, 'g'), String(v));
        });
      }
      return res;
    };
  },
  useLocale: () => 'en',
  NextIntlClientProvider: ({ messages, children }: any) => {
    return React.createElement(IntlTestContext.Provider, { value: messages ?? null }, children);
  },
}));

