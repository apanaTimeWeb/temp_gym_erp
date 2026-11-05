# Admin Campaigns — Theme Contract

## Ownership
This module consumes the global semantic design system. Feature-specific status mapping, domain labels, and business behavior remain owned by this module.

## Exact Global Tokens Used by Current Production TSX
This is the current source-derived inventory, generated from non-test `.tsx` files in this feature. It describes source dependencies only; it does not prove that the absent host `globals.css` / Tailwind mapping is wired correctly.

- `--bg-card`
- `--bg-input`
- `--bg-page`
- `--border`
- `--border-focus`
- `--danger`
- `--danger-bg`
- `--danger-text`
- `--focus-ring`
- `--primary`
- `--primary-subtle`
- `--shadow-card`
- `--skeleton-base`
- `--success-bg`
- `--success-text`
- `--text-on-danger`
- `--text-on-primary`
- `--text-primary`
- `--text-secondary`
- `--warning-text`

## Radius Tokens Used
- `--radius-full`
- `--radius-lg`
- `--radius-sm`
- `--radius-xl`

## Motion Duration Tokens Used
- `--animate-duration-base`

## Required Rules
- JSX MUST use semantic token classes defined by the supplied Smart Gym 360 design system.
- Raw hex/RGB/RGBA colors, arbitrary CSS-variable Tailwind values, and semantic-background opacity modifiers are forbidden.
- Feature-specific status labels/mapping remain in this module; the global design system owns only token meaning and zero-business primitives.
- Update this contract with every source-derived token change.

## Verified Architecture Boundary
- Business feature imports remain within this feature module except for documented application infrastructure/zero-business UI primitives.
- Global theme dependency: semantic tokens from the supplied Smart Gym 360 web design system.

## Host Mapping Gate
- `globals.css`, `tailwind.config.ts` / canonical Tailwind v4 `@theme inline` mapping, and token-sync CI are not included in the supplied role ZIP; source-to-runtime token mapping remains `NOT_VERIFIED`.
- The supplied design documents conflict on certain utility aliases (notably `text-primary` / status text aliases and overlay-backdrop utilities); this source-derived inventory does not silently resolve those host-level mapping conflicts. Record as `SOURCE_CONFLICT` until the canonical host stylesheet is available.
