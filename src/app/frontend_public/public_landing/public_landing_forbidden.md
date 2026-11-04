# PublicLanding Forbidden Patterns

- No cross-feature business imports.
- No role-wide business buckets.
- No `LandingMarketingConstants.ts` or other monolithic mixed business constants file.
- No relative imports.
- No hardcoded backend API URLs outside `public_landing_url_config.ts`.
- No hardcoded theme colors in JSX.
- No semantic background opacity modifiers.
- No API business records inside components.
- No raw transport error text in the UI.
- No new idempotency key on retry.
- No `any`, `@ts-ignore`, or `@ts-nocheck`.
- No browser storage direct access from components.
- No no-op buttons, placeholder alerts, or fake mutation success.
- No `key={index}` for business lists.
- No hardcoded currency symbols or inline minor-unit conversion in JSX.
- No untranslated user-facing strings when a module translation key is available.
- No unguarded motion utilities; use `motion-safe:` / reduced-motion CSS.

- No focusable backdrop control behind an `aria-modal="true"` drawer/dialog.
- No stale focus timer after the mobile navigation closes or unmounts.
- No `aria-describedby` reference to an element that is not rendered.
- No fixed-direction drawer placement/border where logical-direction utilities are appropriate.
- No undersized social/footer interactive targets where a 44px target is practical.
- No arbitrary pixel-based skeleton sizing when a standard spacing/size utility is available.
- No loading state that lacks a screen-reader-accessible status announcement.
