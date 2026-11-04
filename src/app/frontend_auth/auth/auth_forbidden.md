# Forbidden Patterns for `auth`

1. Never return access or refresh tokens from browser-facing JSON responses.
2. Never store Auth tokens in localStorage/sessionStorage or query parameters.
3. Never trust `gymsmart_user` as the authentication authority; production session identity must be verified from the access token.
4. Never accept client-supplied access/refresh tokens through the retired `/frontend_auth/auth/set_cookie` bridge.
5. Never hardcode a privileged production session or privileged token.
6. Never enable server demo authentication from `NEXT_PUBLIC_AUTH_DEMO_MODE` alone.
7. Never import business behavior from `/admin`, `/manager`, `/trainer`, `/superadmin`, or sibling feature modules.
8. Never use relative imports inside the module.
9. Never create barrel files inside the module.
10. Never use `any`, `@ts-ignore`, or `@ts-nocheck`.
11. Never hardcode numeric HTTP status codes in Auth routes; use `StatusCodes`.
12. Never hardcode Auth page or backend URLs outside `auth_url_config.ts`.
13. Never place API response data in React Context or Zustand.
14. Never put direct backend calls in `LoginForm.tsx`.
15. Never use raw theme colors, arbitrary CSS-variable Tailwind values, or semantic background opacity modifiers.
16. Never create user-facing UI strings directly in Login JSX; use the module-local `next-intl` namespace.
17. Never leave an actionable control without a deterministic handler and a verification reference.
18. Never treat static mock responses as sufficient for mutation flows; create/update/delete/refresh must visibly change module-owned mock state where applicable.
19. Never expose raw backend error/stack/token details in user-facing error states.
20. Never create a test whose only proof is that a button/component exists.
21. Never remove `motion-safe:` guards from Login transitions, transforms, pulses, or spinners.
22. Never make mobile interactions depend on hover.
23. Never duplicate dashboard role redirection inside `useAuthLoginForm.ts`.
24. Never rename Next.js framework-reserved filenames such as `page.tsx`, `loading.tsx`, or `error.tsx` to satisfy module-prefix naming.
25. Never modify unrelated role business modules to repair Auth.
26. Never replace a working, compliant Auth implementation merely because another architecture looks cleaner.

27. Never use only email or role as the credential-login idempotency fingerprint; changed credentials with the same idempotency key must produce a conflict.
28. Never duplicate browser-safe demo identities inside `AuthMockHandlers.ts`; `AuthMockPublicFixtures.ts` is the single public identity source of truth.
29. Never duplicate canonical Auth response message literals across route handlers when a module constant already owns them.
30. Never treat the existence of the isolated module ZIP as evidence that host-wide typecheck, lint, build, CI, security scans, global theme mapping, or provider integration passed.

31. Never include test-only environment origins in production-facing Auth configuration registries.
32. Never forward upstream-provided error messages, error names/codes, or validation text into browser-facing Auth responses. Use module-owned messages and allowlisted machine codes only.
33. Never render arbitrary `AuthApiError.message` text in Login UI; unknown error codes must use the localized safe fallback.
