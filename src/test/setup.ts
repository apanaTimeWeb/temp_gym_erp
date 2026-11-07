import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Global mocks for Next.js App Router hooks in Vitest unit/component tests
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

import appMessages from '@/i18n/messages';

vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => {
    const nsObj = namespace ? appMessages[namespace] : appMessages;
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
  NextIntlClientProvider: ({ children }: any) => children,
}));

