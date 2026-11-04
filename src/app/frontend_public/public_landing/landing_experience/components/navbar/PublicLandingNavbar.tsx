'use client';
// RESPONSIBILITY: Renders public Landing navigation, canonical anchors, login destinations, theme control, and accessible mobile drawer.
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTranslations } from 'next-intl';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_experience/config/public_landing_experience.url_config';
import { LANDING_MOBILE_NAVIGATION_LINKS, LANDING_NAVIGATION_LINKS } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingNavigationConstants';
import { usePublicLandingNavbar } from '@/app/frontend_public/public_landing/landing_experience/hooks/usePublicLandingNavbar';

const PUBLIC_LANDING_NAVBAR_LINK_CLASS = 'rounded px-3 py-2 text-sm font-medium text-secondary motion-safe:transition-all motion-safe:duration-base hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page';

/**
 * Presents the PublicLanding navigation surface and delegates drawer state to its hook.
 * @dependencies ThemeToggle global primitive, PublicLanding navigation constants, URL config, and next-intl.
 * @edge-cases Mobile users must have visible controls without hover; the drawer traps focus and restores it to the trigger.
 */
/**
 * PublicLandingNavbar owns the presentation for its documented PublicLanding section and consumes only module-owned configuration or approved infrastructure.
 * @dependencies PublicLanding translations/configuration and approved global UI primitives where imported.
 * @edge-case The section must remain usable with localized text, narrow viewports, and reduced-motion preferences.
 */
export default function PublicLandingNavbar() {
  const t = useTranslations('LANDING');
  const { menuOpen, scrolled, menuPanelRef, menuTriggerRef, handleCloseMenu, handleToggleMenu, handleMenuKeyDown } = usePublicLandingNavbar();
  const links = menuOpen ? LANDING_MOBILE_NAVIGATION_LINKS : LANDING_NAVIGATION_LINKS;

  return (
    <>
      <header className={`landing-print-header fixed inset-x-0 top-0 z-20 border-b border-border bg-header-translucent backdrop-blur-md motion-safe:transition-all motion-safe:duration-base ${scrolled ? 'shadow-card' : ''}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href={PublicLandingUrlConfig.ANCHORS.HOME} data-testid="public_landing-navbar-brand" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            <Image src={PublicLandingUrlConfig.ASSETS.LOGO} alt={t('brand.name')} width={40} height={40} priority className="rounded-lg object-cover" />
            <div>
              <span className="text-lg font-bold tracking-tight text-primary">{t('brand.name')}</span>
              <span className="-mt-1 block text-xs uppercase tracking-widest text-warning">{t('brand.tagline')}</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label={t('shared.navigationMenu')}>
            {LANDING_NAVIGATION_LINKS.map(({ labelKey, href }) => (
              <Link key={labelKey} href={href} data-testid={`public_landing-navbar-${labelKey.split('.').pop() ?? 'item'}`} className={PUBLIC_LANDING_NAVBAR_LINK_CLASS}>
                {t(labelKey)}
              </Link>
            ))}
            <span data-testid="public_landing-navbar-theme-toggle"><ThemeToggle /></span>
            <Link href={PublicLandingUrlConfig.PAGES.SAAS_LOGIN} data-testid="public_landing-navbar-saas-login" className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-warning motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
              {t('footer.superadminLogin')}
            </Link>
            <Link href={PublicLandingUrlConfig.PAGES.ERP_LOGIN} data-testid="public_landing-navbar-erp-login" className={`${PUBLIC_LANDING_NAVBAR_LINK_CLASS} ms-1`}>
              {t('footer.erpPortal')}
            </Link>
            <Link href={PublicLandingUrlConfig.ANCHORS.BOOKING} data-testid="public_landing-navbar-join" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
              {t('footer.joinNow')}
            </Link>
          </nav>

          <button
            ref={menuTriggerRef}
            type="button"
            onClick={handleToggleMenu}
            aria-label={menuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            aria-controls="landing-mobile-navigation"
            data-testid="public_landing-navbar-menu-toggle"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-secondary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page md:hidden"
          >
            {menuOpen ? <X size={18} strokeWidth={2} aria-hidden="true" /> : <Menu size={18} strokeWidth={2} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          className="landing-mobile-menu-backdrop fixed inset-0 z-20 md:hidden"
          data-testid="public_landing-navbar-mobile-drawer"
          onMouseDown={(event) => { if (event.target === event.currentTarget) handleCloseMenu(); }}
          onTouchStart={(event) => { if (event.target === event.currentTarget) handleCloseMenu(); }}
        >
          <div id="landing-mobile-navigation" ref={menuPanelRef} role="dialog" aria-modal="true" aria-label={t('navigation.menuLabel')} onKeyDown={handleMenuKeyDown} onMouseDown={(event) => event.stopPropagation()} onTouchStart={(event) => event.stopPropagation()} className="absolute end-0 top-0 z-30 h-full w-screen max-w-md overflow-y-auto border-s border-border bg-overlay p-6 shadow-dialog">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-bold text-primary">{t('brand.name')}</span>
              <button type="button" aria-label={t('navigation.closeMenu')} data-testid="public_landing-navbar-menu-close" onClick={handleCloseMenu} className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-secondary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                <X size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
            <nav className="space-y-2" aria-label={t('shared.navigationMenu')}>
              {links.map(({ labelKey, href }) => (
                <Link key={labelKey} href={href} onClick={handleCloseMenu} data-testid={`public_landing-mobile-nav-${labelKey.split('.').pop() ?? 'item'}`} className="flex min-h-11 items-center rounded-lg border border-transparent px-4 py-3 text-secondary motion-safe:transition-all motion-safe:duration-base hover:border-border hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                  {t(labelKey)}
                </Link>
              ))}
              <span data-testid="public_landing-mobile-theme-toggle"><ThemeToggle /></span>
              <Link href={PublicLandingUrlConfig.PAGES.SAAS_LOGIN} onClick={handleCloseMenu} data-testid="public_landing-mobile-saas-login" className="flex min-h-11 items-center justify-center rounded-xl border border-border text-warning motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                {t('footer.superadminLogin')}
              </Link>
              <Link href={PublicLandingUrlConfig.PAGES.ERP_LOGIN} onClick={handleCloseMenu} data-testid="public_landing-mobile-erp-login" className="flex min-h-11 items-center justify-center rounded-xl border border-border text-secondary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                {t('footer.erpPortal')}
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
