// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationFeaturesTierMatrix within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the documented SaaS-tier availability matrix as a read-only configuration view. It performs no mutations.
import { Layers, Check, Minus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_FEATURE_DEFINITIONS, SUPERADMIN_FEATURE_TIER_DEFINITIONS, SUPERADMIN_FEATURE_TIER_MATRIX } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/constants/superadmin_platform_configuration_features_management_tier_matrix.constants';



/**
 * @description Renders the documented SaaS-tier availability matrix as a read-only configuration view. It performs no mutations.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */

const MOBILE_CARD_TABLE_CLASSES = [
  'w-full text-start border-collapse max-md:block max-md:min-w-0',
  'max-md:[&_thead]:sr-only max-md:[&_tbody]:block',
  'max-md:[&_tbody_tr]:mb-3 max-md:[&_tbody_tr]:grid max-md:[&_tbody_tr]:grid-cols-1 max-md:[&_tbody_tr]:w-full',
  'max-md:[&_tbody_tr]:rounded-lg max-md:[&_tbody_tr]:border max-md:[&_tbody_tr]:border-border max-md:[&_tbody_tr]:bg-card',
  'max-md:[&_tbody_td]:grid max-md:[&_tbody_td]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-md:[&_tbody_td]:gap-3',
  'max-md:[&_tbody_td]:w-full max-md:[&_tbody_td]:border-0 max-md:[&_tbody_td]:p-3',
  'max-md:[&_tbody_td::before]:content-[attr(data-mobile-label)] max-md:[&_tbody_td::before]:text-secondary',
  'max-md:[&_tbody_td::before]:text-xs max-md:[&_tbody_td::before]:font-semibold max-md:[&_tbody_td::before]:uppercase',
].join(' ');

export default function SuperadminPlatformConfigurationFeaturesManagementTierMatrix() {
  const t = useTranslations('superadmin_platform_configuration_features');
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-card" aria-labelledby="superadmin-feature-tier-matrix-title">
      <div className="border-b border-border p-6">
        <h2 id="superadmin-feature-tier-matrix-title" className="flex items-center gap-2 text-lg font-bold text-primary">
          <Layers size={18} className="text-primary" aria-hidden="true"/>  {t('ui.global_feature_tiering_5afd810')}
        </h2>
        <p className="mt-1 text-sm text-secondary">{t('ui.read_only_view_of_the_documented_feature_availab_dd0a5bb')}</p>
      </div>

      <div className="overflow-x-auto">
        <table className={`w-full border-collapse text-start ${MOBILE_CARD_TABLE_CLASSES}`}>
          <caption className="sr-only">{t('ui.feature_availability_by_saas_subscription_tier_dd0fc6b')}</caption>
          <thead>
            <tr className="border-b border-border bg-surface-highlight" data-testid="superadmin_platform_configuration_features-superadmin-features-tier-matrix-tier-matrix-action-1">
              <th scope="col" className="p-4 text-sm font-semibold text-primary">{t('ui.feature_9889145')}</th>
              {SUPERADMIN_FEATURE_TIER_DEFINITIONS.map((tier) => <th key={tier.id} scope="col" className="p-4 text-center text-sm font-semibold text-primary">{t(tier.labelKey)}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SUPERADMIN_FEATURE_DEFINITIONS.map((feature) => (
              <tr key={feature.id} className="motion-safe:transition-colors hover:bg-surface-hover" data-testid={`superadmin_platform_configuration_features-features-tier-matrix-item-feature-id-2-${String(feature.id)}`}>
                <th scope="row" className="border-e border-border p-4 text-start text-sm font-medium text-primary">{t(feature.labelKey)}</th>
                {SUPERADMIN_FEATURE_TIER_DEFINITIONS.map((tier) => {
                  const enabled = SUPERADMIN_FEATURE_TIER_MATRIX[feature.id][tier.id];
                  return (
                    <td key={tier.id} className="border-e border-border p-4 text-center last:border-e-0" data-mobile-label={t('ui.mobile_feature')}>
                      <span data-testid={`superadmin_platform_configuration_features-tier-${feature.id}-${tier.id}`} className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border ${enabled ? 'border-border bg-success-bg text-success' : 'border-border bg-surface-highlight text-disabled'}`} aria-label={t('ui.a11y_feature_tier', { feature: t(feature.labelKey), status: enabled ? t('ui.available') : t('ui.not_available'), tier: t(tier.labelKey) })}>
                        {enabled ? <Check size={18} aria-hidden="true"/> : <Minus size={18} aria-hidden="true"/>}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
