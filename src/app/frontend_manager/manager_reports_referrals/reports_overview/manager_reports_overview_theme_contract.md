# Manager Reports — Reports Overview Theme Contract

## Leaf styling boundary
The Tier3 root renders no independent business UI. Styling ownership belongs to `manager_reports/reports_overview/`.

## Semantic design rules
- Use approved semantic design tokens rather than raw hex/RGB/HSL or arbitrary palette values.
- Keep visible keyboard focus and accessible labels; honor reduced-motion preferences.
- Preserve responsive behavior at 320, 375, 425, 768, 1024, 1440 and 1920 CSS-pixel widths.
- Do not introduce inline styles or rely on unverified global host token behavior.

# Manager Reports Module Theme Contract

This contract belongs only to `src/app/frontend_manager/manager_reports`. It records the exact global semantic theme variables consumed by the current implementation. The global design system remains the visual source of truth.

## Consumed Global Semantic Tokens

| CSS Variable | Current Usage |
| --- | --- |
| `--bg-card` | card/panel surface |
| `--bg-input` | input surface |
| `--bg-overlay` | dialog/drawer surface |
| `--bg-page` | page surface |
| `--border` | standard borders/dividers |
| `--chart-danger` | semantic token consumed by the feature |
| `--chart-grid` | semantic token consumed by the feature |
| `--chart-info` | semantic token consumed by the feature |
| `--chart-primary` | semantic token consumed by the feature |
| `--chart-secondary` | semantic token consumed by the feature |
| `--chart-success` | semantic token consumed by the feature |
| `--chart-warning` | semantic token consumed by the feature |
| `--danger-bg` | subtle danger surface |
| `--danger-text` | danger text |
| `--focus-ring` | keyboard focus ring |
| `--info-bg` | subtle info surface |
| `--info-text` | info text |
| `--primary` | primary brand/active controls |
| `--primary-hover` | primary hover state |
| `--primary-subtle` | subtle primary surfaces |
| `--purple-bg` | purple semantic tag background |
| `--purple-text` | purple semantic tag text |
| `--shadow-card` | card elevation |
| `--shadow-dialog` | dialog elevation |
| `--skeleton-base` | skeleton base |
| `--skeleton-highlight` | skeleton highlight |
| `--success-bg` | subtle success surface |
| `--success-text` | success text |
| `--text-on-primary` | text on solid primary |
| `--text-primary` | primary text |
| `--text-secondary` | secondary text/labels |
| `--warning-bg` | subtle warning surface |
| `--warning-text` | warning text |

## Binding Rules

- No raw hex colors, arbitrary Tailwind color values, or raw RGBA colors may be introduced into module JSX.
- Semantic background opacity modifiers such as `bg-success/10` and `bg-primary/20` are forbidden.
- Solid semantic backgrounds require the appropriate documented on-color; otherwise use the subtle `*-bg` variant.
- Feature-specific business status mappings remain local to this feature.
- No feature-local CSS variable is defined by this module unless explicitly documented here.

## Portability

When this feature is copied to another compatible application, define the listed semantic variables through that application's canonical global theme stylesheet and preserve the same semantic meanings.
## Additional Consumed Tokens (Static Source Audit)

| CSS Variable | Current Usage |
| --- | --- |
| `--danger` | Solid danger border/outline color |

## Additional Consumed Motion Tokens (Static Source Audit)

| CSS Variable | Current Usage |
| --- | --- |
