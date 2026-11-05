# admin_security — Theme Contract

## Global tokens and UI ownership
Uses semantic surface, foreground, border, focus and danger/status tokens. Security warnings must preserve contrast-safe text/background pairs and accessible focus/keyboard behavior.

- Consume the global semantic Tailwind utilities mapped from the canonical global stylesheet.
- Use the prescribed dark premium-gold design system, semantic borders/surfaces/status backgrounds, and focus-ring utilities.
- Ensure keyboard-visible focus, WCAG 2.2 AA contrast, reduced-motion compliance, and touch-friendly controls.
- Keep feature-specific status/business styling within the owning leaf's theme contract.
- Preserve localized English/Hindi labels and long-string/RTL readiness.
