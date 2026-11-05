// RESPONSIBILITY: Loads the build-time merged Admin locale bundles while keeping locale source files owned by their feature modules.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/i18n/AdminNavigationLayoutI18nProvider.tsx)

import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import type { AdminNavigationLayoutI18nProviderProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutTypes';

const SUPPORTED_LOCALES = new Set(["en", "hi"]);

/**
 * AdminNavigationLayoutI18nProvider loads merged Admin locale bundles for the authenticated application shell.
 * @dependencies Uses next-intl server locale resolution and build-generated public locale files.
 * @edge-case Falls back to English for unsupported locales; missing bundles remain an explicit integration failure.
 */
export default async function AdminNavigationLayoutI18nProvider({ children }: AdminNavigationLayoutI18nProviderProps) {
  const resolvedLocale = await getLocale();
  const locale = SUPPORTED_LOCALES.has(resolvedLocale) ? resolvedLocale : "en";
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
