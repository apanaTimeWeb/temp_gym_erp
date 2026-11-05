# Trainer Members — Theme Contract

## Global token source
This module consumes the canonical global design system. Feature JSX must use semantic Tailwind classes; raw hex/RGB colors and arbitrary color values are forbidden.

## Consumed semantic tokens

- `--bg-card`
- `--bg-floating`
- `--bg-input`
- `--bg-overlay`
- `--bg-page`
- `--border`
- `--border-focus`
- `--danger`
- `--danger-bg`
- `--danger-text`
- `--focus-ring`
- `--info`
- `--info-bg`
- `--info-text`
- `--primary`
- `--primary-hover`
- `--primary-subtle`
- `--purple-bg`
- `--purple-text`
- `--social-whatsapp` (immutable external integration brand token; not theme-configurable)
- `--shadow-card`
- `--shadow-dialog`
- `--success`
- `--success-bg`
- `--success-text`
- `--surface-highlight`
- `--text-disabled`
- `--text-on-danger`
- `--text-on-info`
- `--text-on-primary`
- `--text-on-success`
- `--text-primary`
- `--text-secondary`
- `--warning`
- `--warning-bg`
- `--warning-text`

## Theme modes
- Components consume the canonical light/dark semantic variables defined by the application global stylesheet.
- No raw hex/RGB values or arbitrary color values are permitted in module JSX.
## Feature-specific visual rules
- Status: success
- Status: warning
- Status: danger
- Status: info
- External integrations: preserve native approved social/email brand tokens without ERP recoloring

## Forbidden patterns
- `bg-[#...]`, `text-[#...]`, `border-[#...]`, `ring-[#...]`
- `bg-[var(--...)]`, `text-[var(--...)]`, `border-[var(--...)]`, `ring-[var(--...)]` in JSX
- Raw RGBA/RGB/hex theme colors when a semantic token exists
- Hardcoded feature business color registries in global UI folders

## Motion and surfaces
- Use `motion-safe:` for animations/transitions that respect reduced-motion requirements.
- Use `bg-card`, `bg-overlay`, `bg-popover`, and semantic shadow tokens for surfaces according to their documented structural purpose.

