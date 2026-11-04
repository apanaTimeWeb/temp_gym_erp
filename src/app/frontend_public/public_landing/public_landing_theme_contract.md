# PublicLanding Theme Contract

**Source of truth:** the host application's global Smart Gym 360 `globals.css` and Tailwind v4 `@theme inline` mapping. This module must not define replacement global theme tokens. The host mapping is outside this isolated archive and remains `NOT VERIFIED` until integrated.

## Semantic colors consumed
- Primary/action: `primary`, `primary-hover`, `primary-subtle`, `text-on-primary`, `text-primary`, `text-secondary`, `text-disabled`.
- Semantic status: `success`, `success-bg`, `success-text`, `warning`, `warning-bg`, `warning-text`, `danger`, `danger-bg`, `danger-text`, `info`, `info-bg`, `info-text`, `purple-bg`, `purple-text`.
- Surface: `bg-page`, `bg-card`, `bg-input`, `bg-header-translucent`, `bg-overlay`, `surface-hover`, `surface-highlight`, `surface-zebra`, `overlay-backdrop`, `border`, `border-focus`, `focus-ring`.
- Elevation: `shadow-card`, `shadow-dialog`.
- Loading: `skeleton-base`, `skeleton-highlight`; skeletons use `bg-skeleton-base` / `bg-skeleton-highlight` and `motion-safe:animate-pulse`.
- Motion: `duration-fast`, `duration-base`, `duration-slow`; transitions and animations must be gated by `motion-safe:`. The stylesheet also honors `prefers-reduced-motion`.
- Radius: `radius-md`, `radius-lg`, `radius-xl`, `radius-full`.
- Typography: Inter inherited from the host; body scale is 14px.

## Layout and accessibility contract
- Authenticated-shell geometry is not owned here; this is an unauthenticated marketing route.
- Interactive controls should use at least 44px minimum target dimensions where practical.
- Directional placement should use logical properties/utilities (`start`/`end`, `border-s`, `ms-*`, `ps-*`) where direction matters.
- Loading skeletons should preserve the page structure and announce loading with a screen-reader-only status.

## Justified local visual exceptions
- Native official social brand colors are retained exactly for external social links (`#1877F2`, `#E4405F`, `#000000`, `#FF0000`). They are not global theme tokens.
- Hero overlay/CTA aliases are local to `.landing-module`, use semantic theme tokens, and are limited to the landing hero.
- Print-mode black/white overrides are restricted to print media.

## Not used / not owned by this module
No chart tokens, payment tokens, context-menu surfaces, drag/drop colors, density-mode tokens, or shared status-badge registry are owned by PublicLanding. No global token mapping is declared by this module.

## Host verification required
Confirm every token above exists in `globals.css` and is mapped by Tailwind v4 `@theme inline`; confirm dark/light theme values and contrast in the host app. Missing global definitions must be reported, not patched by inventing module-local replacements.
