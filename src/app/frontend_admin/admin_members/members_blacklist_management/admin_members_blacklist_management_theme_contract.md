# Admin Blacklist — Theme Contract

## Ownership
This feature consumes global semantic design tokens only; feature-specific business status mappings remain owned by the `blacklist` module.

## Exact Global Tokens Used by Current Production TSX
This is the current source-derived inventory, generated from non-test `.tsx` files in this feature. It describes source dependencies only; it does not prove that the absent host `globals.css` / Tailwind mapping is wired correctly.

- `--bg-card`
- `--bg-input`
- `--bg-overlay`
- `--border`
- `--danger`
- `--danger-bg`
- `--danger-text`
- `--primary-subtle`
- `--shadow-card`
- `--shadow-dialog`
- `--skeleton-base`
- `--success-bg`
- `--success-text`
- `--text-on-danger`
- `--text-primary`
- `--text-secondary`
- `--warning-bg`
- `--warning-text`

## Radius Tokens Used
- `--radius-full`
- `--radius-lg`
- `--radius-xl`

## Motion Duration Tokens Used
- `--animate-duration-base`

## Required Rules
- Feature JSX MUST use the canonical Tailwind semantic token classes mapped by `WEB_FRONTEND_UI_UX_DESIGN.md`.
- No raw hex/RGB/RGBA colors, arbitrary CSS-variable Tailwind values, or undefined business color variables are permitted in this module.
- Business statuses and payment modes are mapped locally to the global semantic/status/payment tokens; the global design system does not own the feature status registry.
- Any new global token dependency MUST be added to this file in the same change.
- Responsive, focus-visible, reduced-motion, modal/popover surface, and accessibility behavior must follow the global design system.

## Verified Architecture Boundary
- Business Feature Dependencies: None. The module does not import sibling business modules.
- Role-Level Business Dependencies: Only documented Admin shell context where the feature legitimately consumes it.
- Global Design Dependency: `WEB_FRONTEND_UI_UX_DESIGN.md` semantic tokens and zero-business UI primitives.

## Host Mapping Gate
- `globals.css`, `tailwind.config.ts` / canonical Tailwind v4 `@theme inline` mapping, and token-sync CI are not included in the supplied role ZIP; source-to-runtime token mapping remains `NOT_VERIFIED`.
- The supplied design documents conflict on certain utility aliases (notably `text-primary` / status text aliases and overlay-backdrop utilities); this source-derived inventory does not silently resolve those host-level mapping conflicts. Record as `SOURCE_CONFLICT` until the canonical host stylesheet is available.
