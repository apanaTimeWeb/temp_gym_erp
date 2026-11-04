# auth_logout_session_termination — semantic design contract

Global web source: WEB_FRONTEND_UI_UX_DESIGN(6).md; SMART GYM 360 dark-gold / Tailwind v4 semantic token system.

Consumed semantic styles: `bg-page`, `bg-card`, `text-primary`, `text-secondary`, `bg-primary`, `text-on-primary`, `border-border`, focus-ring and loading skeleton tokens.

No business-specific styling in global primitives. Interactive UI (Login only) must meet WCAG 2.2 AA, mobile 320px, 44px minimum touch targets, reduced motion, keyboard focus and RTL/i18n expansion. No hardcoded JSX colors or opacity modifiers. Runtime inspection is not verified.
