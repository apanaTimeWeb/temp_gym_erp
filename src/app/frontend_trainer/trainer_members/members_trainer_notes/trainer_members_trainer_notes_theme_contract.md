# Trainer Members — Trainer Notes — Theme Contract

Global authority: `WEB_FRONTEND_UI_UX_DESIGN.md` with `WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md` precedence.

Consumes: `bg-page`, `bg-card`, `bg-input`, `bg-overlay`, `bg-skeleton-base`, `text-primary`, `text-secondary`, `text-danger`, `text-on-primary`, `border-border`, `ring-primary`, `bg-primary`, `bg-primary-hover`, `bg-primary-subtle`, `bg-danger-bg`, `text-success`, `bg-success-bg`, `bg-warning-bg`, `shadow-card`, `shadow-dialog`. Values are owned exclusively by host `globals.css` + `@theme inline` mapping.

Fonts: Inter via `next/font`. Base font size 14px. Layout: responsive mobile-first 320px to desktop, viewport-safe modals, horizontal overflow for dense tables, accessible mobile cards, focus-visible, aria labels, keyboard close/focus-trap where applicable. Touch targets ≥44px. No aggressive dashboard gradients, no hardcoded JSX hex, no opacity modifiers on semantic status backgrounds. Respect `prefers-reduced-motion`.

State: SOURCE_FIX_STAGED_RBG_11_15. Browser color contrast and keyboard behavior NOT_VERIFIED.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger` | `--danger` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-input` | `--bg-input` |
| `bg-overlay` | `--bg-overlay` |
| `bg-overlay-backdrop` | `--overlay-backdrop` |
| `bg-primary` | `--primary` |
| `bg-skeleton-base` | `--skeleton-base` |
| `border-border` | `--border` |
| `ring-primary` | `--primary` |
| `shadow-dialog` | `--shadow-dialog` |
| `text-danger` | `--danger` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-primary` | `--text-on-primary` |
| `text-page-title` | `--font-size-page-title` |
| `text-primary` | `--primary` |

**Utility mapping qualification:** the source also references `text-secondary`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger` | `--danger` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-input` | `--bg-input` |
| `bg-overlay` | `--bg-overlay` |
| `bg-overlay-backdrop` | `--overlay-backdrop` |
| `bg-primary` | `--primary` |
| `bg-skeleton-base` | `--skeleton-base` |
| `border-border` | `--border` |
| `ring-primary` | `--primary` |
| `shadow-dialog` | `--shadow-dialog` |
| `text-danger` | `--danger` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-primary` | `--text-on-primary` |
| `text-page-title` | `--font-size-page-title` |
| `text-primary` | `--primary` |

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

## RBG 5 — verified consumed-token inventory

This inventory is derived from the leaf submodule `.ts`/`.tsx` source and the `@theme inline` declarations in `frontend_trainer/globals.css`. It records existing consumption only; RBG 5 does not add, rename, or change CSS variables, Tailwind mappings, or runtime styles.

| Consumed Tailwind utility | `globals.css` mapping |
|---|---|
| `bg-card` | `--bg-card` |
| `bg-danger` | `--danger` |
| `bg-danger-bg` | `--danger-bg` |
| `bg-input` | `--bg-input` |
| `bg-overlay` | `--bg-overlay` |
| `bg-overlay-backdrop` | `--overlay-backdrop` |
| `bg-primary` | `--primary` |
| `bg-skeleton-base` | `--skeleton-base` |
| `border-border` | `--border` |
| `ring-primary` | `--primary` |
| `shadow-dialog` | `--shadow-dialog` |
| `text-danger` | `--danger` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-primary` | `--text-on-primary` |
| `text-page-title` | `--font-size-page-title` |
| `text-primary` | `--primary` |

**Utility mapping qualification:** the source also references `text-secondary`. `globals.css` declares the corresponding `--text-secondary` / `--text-disabled` variables and maps them as `--color-text-secondary` / `--color-text-disabled`; the supplied `@theme inline` therefore exposes `text-text-secondary` / `text-text-disabled`, not the shorter utility names found in source. No alias was invented or added in this documentation-only batch; host Tailwind resolution remains to be verified.

The class `text-primary`, where present, maps to `--primary` (the primary accent); the separate foreground variable `--text-primary` is exposed by `@theme inline` as `text-text-primary`.

