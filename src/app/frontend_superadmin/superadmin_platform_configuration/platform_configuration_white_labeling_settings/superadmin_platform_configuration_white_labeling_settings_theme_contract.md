# Theme Contract — `white_labeling_settings`

## Ownership and precedence
- Global semantic colors, surfaces, typography, radius, shadows, spacing, breakpoints, focus-ring visuals, motion visuals, and zero-business UI primitives are owned by `WEB_FRONTEND_UI_UX_DESIGN.md` and the host canonical `globals.css` → Tailwind `@theme inline` mapping.
- This leaf owns its business labels, statuses, data, icon choices, behavior, and status-to-semantic-token mapping; it must not promote business-aware UI into global primitives.
- Security/privacy and verified API contracts precede visual preference; WCAG 2.2 AA and keyboard/screen-reader safety are mandatory.

## Exact semantic token utilities detected in leaf UI source
- `bg-card` → `--bg-card` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-danger` → `--danger` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-danger-bg` → `--danger-bg` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-input` → `--bg-input` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-overlay` → `--bg-overlay` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-page` → `--bg-page` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-primary` → `--primary` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-primary-subtle` → `--primary-subtle` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-skeleton-base` → `--skeleton-base` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-success` → `--success` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-success-bg` → `--success-bg` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-surface-highlight` → `--surface-highlight` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-surface-hover` → `--surface-hover` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `bg-warning-bg` → `--warning-bg` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `border-border` → `--border` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `ring-primary` → `--focus-ring` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `shadow-dialog` → `--shadow-dialog` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `text-danger` → `--danger-text` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `text-disabled` → `--text-disabled` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `text-on-danger` → `--text-on-danger` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `text-on-primary` → `--text-on-primary` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `text-on-success` → `--text-on-success` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `text-primary` → `--text-primary` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `text-secondary` → `--text-secondary` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `text-success` → `--success-text` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).
- `text-warning` → `--warning-text` (source-derived from leaf JSX; value mapping must remain in the global theme stylesheet).

## Responsive contract
- Observed responsive breakpoints: `md`, `sm`.
- Preserve semantic HTML structure, content reflow, readable focus order, and non-overflowing controls at narrow viewport widths.

## Accessibility and interaction contract
- Meet WCAG 2.2 AA for contrast, keyboard operation, focus visibility, screen-reader naming, error identification, and responsive reflow.
- Interactive targets must meet the global design minimum (44px target class sizing for web UI); use explicit accessible names for icon-only controls.
- Respect `prefers-reduced-motion` through `motion-safe:` behavior; do not make animation necessary to understand or operate the interface.
- Forms must expose field errors and pending/disabled state; dialogs must have correct role, modal semantics, focus containment/restoration, Escape/close behavior, and unsaved-change protection where applicable.

## Forbidden visual patterns
- No inline `style={{...}}` for business UI, raw hex/RGB colors, arbitrary CSS-variable utilities, or duplicate local theme palettes.
- Never use semantic background opacity modifiers such as `bg-success/10` or `bg-primary/20`; use explicit `*-bg` or `*-subtle` tokens.
- When using a solid semantic background (`bg-primary`, `bg-danger`, `bg-success`, `bg-warning`, or `bg-info`), pair it with the corresponding `text-on-*` utility.
- Aggressive gradients are restricted to unauthenticated landing-page hero CTAs; do not use them in authenticated ERP pages.

## Verification boundary
- The utility list above is a static scan of authored, non-test TSX and is not proof that the host `globals.css` defines/mappings are correct.
- Host `globals.css`/Tailwind token mapping and visual browser behavior remain `NOT_VERIFIED` without the host stylesheet and runtime.
