# Manager Dashboard Overview — Theme Contract

## Status
Updated through RBG15. This contract records source-level token, responsive, motion, and accessibility expectations for the Dashboard Overview leaf. Host theme-token resolution and browser execution are still unverified because the supplied overlay does not contain the host global stylesheet or build configuration.

## Semantic token usage required after migration
- Page and surface backgrounds must use the host design system's semantic page/surface tokens.
- Body, secondary, muted and danger text must use semantic text tokens rather than raw palette values.
- Primary actions and focus states must use semantic primary/focus tokens.
- Borders, separators, chart series and status colors must use approved semantic tokens or documented chart palette mappings.
- Loading skeletons must follow the approved skeleton token/animation contract and respect reduced-motion preferences.
- No raw hex/RGB values, arbitrary Tailwind palette colors or inline style objects are permitted.

## Existing source evidence
The current `ManagerDashboardOverviewMain.tsx` uses classes including `bg-primary`, `text-on-primary`, `text-danger-text`, `focus-visible:ring-focus-ring`, `bg-page` and `focus-visible:ring-offset-page`. RBG6 must audit all moved child components, not assume this list covers the complete token inventory.

## Responsive and accessibility contract
The overview must remain usable at 320, 375, 425, 768, 1024, 1440 and 1920 CSS pixels without horizontal page overflow. Charts require readable summaries/labels; tables/lists require meaningful headings; controls require keyboard access and visible focus. Browser viewport/axe verification is pending host runtime.

## RBG13 additions
- Loading skeletons use responsive page gutters, explicit minimum dimensions, `aria-busy`, localized status text and `aria-hidden` decorative blocks.
- Chart empty states consume semantic surface/text/focus tokens and expose a keyboard-operable action.
- Responsive containers use `min-w-0`; the recent-members table remains in its own horizontally scrollable, named region.
- Actual 320/768/1280px browser verification and automated axe results remain `NOT_VERIFIED` pending host runtime.

## Contract gaps
The complete host token registry and global stylesheet are not included as verified executable host configuration in this checkpoint. The tokens above are source-derived examples; confirm them against the host token registry during final integration.


## RBG14 accessibility verification contract
- Component tests use `vitest-axe` for loading, chart-empty, dashboard-success, dashboard-empty-collection and dashboard-error states.
- Playwright coverage uses `@axe-core/playwright` with WCAG A/AA tags and includes keyboard Tab/focus behavior plus 320px/768px/1280px page-overflow checks.
- Host dependency availability and execution remain `NOT_VERIFIED`; manual keyboard and real 200% browser-zoom checks are still required before release.


## RBG15 responsive, locale, and motion audit
- Primary-record member data uses a mobile card stack below 768 CSS pixels and the semantic table from 768 CSS pixels upward, matching the canonical table decision matrix.
- Mobile card fields preserve member identity, localized status, plan, joined date and formatted amount.
- Search icon positioning and input inset spacing use logical start/end utilities for RTL readiness. Text-bearing row content uses shrinkable containers and wrapping where long translations/data are possible.
- English/Hindi catalog key parity and interpolation-placeholder parity are guarded by a leaf test. The Hindi catalog has been normalized to Hindi rather than mixed English/Hinglish labels.
- Existing animation/transition utilities are guarded with `motion-safe:`. The canonical global `prefers-reduced-motion` override cannot be verified or added safely because `globals.css` is not part of this source overlay; host integration must confirm the global override from UI/UX Section 29.
- Browser test source enumerates 320, 375, 425, 768, 1024, 1440 and 1920 CSS-pixel widths and checks mobile/table rendering. Root-font-size doubling is only a scaling proxy; it is not a substitute for true 200% browser zoom.
- Browser execution, axe results, and manual zoom/focus QA remain `NOT_VERIFIED`.
