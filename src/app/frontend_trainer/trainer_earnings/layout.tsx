import { getTranslations } from 'next-intl/server';
import { TRAINER_EARNINGS_URLS } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/config/trainer_earnings_overview_and_ledger.url_config';
import Link from 'next/link';
import type { ReactNode } from 'react';
// Domain shell owns secondary navigation; individual submodules own their business code.
export default async function TrainerDomainLayout({children}:{children:ReactNode}) {
 const t = await getTranslations('TRAINER_EARNINGS');
 return <div className="min-h-full"><nav aria-label="Trainer earnings secondary navigation" className="flex flex-wrap gap-2 border-b border-border px-3 py-2">
   <Link href={TRAINER_EARNINGS_URLS.ROUTES.LIST} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_EARNINGS_LEDGER')}</Link>
 </nav><div>{children}</div></div>;
}
