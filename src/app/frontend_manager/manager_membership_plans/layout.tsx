// RESPONSIBILITY: Preserves the Tier3 Plans domain boundary; business behavior stays in `membership_lifecycle/`.
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

export default async function ManagerPlansDomainLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');
  return <section aria-label={t('COPY_DOMAIN_LANDMARK')} className="min-h-full">{children}</section>;
}
