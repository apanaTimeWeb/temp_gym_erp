// RESPONSIBILITY: Renders the facility gallery using optimized Next.js Image assets and accessible captions.
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { LANDING_GALLERY_ITEMS } from '@/app/frontend_public/public_landing/landing_experience/constants/PublicLandingGalleryConstants';

export default async function PublicLandingGallery() {
  const t = await getTranslations('LANDING');
  return (
    <section id="gallery" className="bg-page px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-5 inline-block rounded-full border border-border bg-warning-bg px-4 py-2 text-xs font-bold uppercase tracking-widest text-warning">{t('gallery.eyebrow')}</div>
          <h2 className="mb-4 text-4xl font-black text-primary sm:text-5xl">{t('gallery.title')} <span className="text-primary">{t('gallery.titleHighlight')}</span></h2>
          <p className="mx-auto max-w-xl text-secondary">{t('gallery.description')}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LANDING_GALLERY_ITEMS.map((item) => (
            <figure key={item.src} className="group relative aspect-video overflow-hidden rounded-lg border border-border motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 md:aspect-square">
              <Image src={item.src} alt={t(item.altKey)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover motion-safe:transition-transform motion-safe:duration-slow motion-safe:group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-surface-highlight p-4"><span className="text-lg font-bold text-primary">{t(item.labelKey)}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
