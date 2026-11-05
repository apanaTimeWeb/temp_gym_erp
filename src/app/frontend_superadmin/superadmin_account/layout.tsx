'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { ReactNode } from 'react';


export default function Layout({children}:{children:ReactNode}){
 const t=useTranslations('superadmin_account_profile');const pathname=usePathname();
 return <><nav aria-label={t('ui.personal_information')} className="mb-5 flex flex-wrap gap-2 border-b border-border pb-3"><Link href="/frontend_superadmin/superadmin_account/account_profile_overview" aria-current={pathname.endsWith('/account_profile_overview')?'page':undefined} className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-primary focus-visible:ring-2 focus-visible:ring-primary">{t('ui.personal_information')}</Link>
<Link href="/frontend_superadmin/superadmin_account/account_security" aria-current={pathname.endsWith('/account_security')?'page':undefined} className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-primary focus-visible:ring-2 focus-visible:ring-primary">{t('ui.security')}</Link></nav>{children}</>;
}
