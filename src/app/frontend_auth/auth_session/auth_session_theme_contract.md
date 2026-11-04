# auth_session — Global UI/UX Theme Contract (RBG01)

**Status:** Documentation-only domain boundary; no screen has been created or restyled in RBG01.

- Canonical design source: `WEB_FRONTEND_UI_UX_DESIGN(6).md`, SMART GYM 360 web design system.
- Global theme source: the host `globals.css` + Tailwind v4 `@theme inline`; host stylesheet is not supplied in this ZIP and its runtime token mapping is **NOT_VERIFIED**.
- Premium dark theme default: `--primary: #FACC15`, `--bg-page: #050505`, `--bg-card: #111111`; light values follow the global specification. These are contract documentation, **not** component-level hardcoded values.
- Approved JSX styling consumes semantic classes only (`bg-card`, `text-primary`, `text-secondary`, `border-border`, `bg-primary`, `text-on-primary`, `bg-danger-bg`, `text-danger`). No raw hex, ad hoc gradients, or forbidden semantic opacity modifiers in JSX.
- Inter font; keyboard/focus access, WCAG 2.2 AA, 44px targets, loading skeletons, locale expansion and reduced-motion guards apply wherever an actual screen exists.
- The existing login UI remains at `/frontend_auth/auth/login` and retains its present rendering until RBG03–05. Do not invent a sidebar or action screen for API-only domains.
- Once `session_status_refresh_and_restore` is physically created and functional, it must ship a precise local `[role]_[submodule]_theme_contract.md` enumerating only tokens actually used by that submodule.


## Post-migration note (this checkpoint)
The physical Tier-4 owner is `session_status_refresh_and_restore/`. Historical `/frontend_auth/auth/*` route adapters remain for method-preserving compatibility. The supplied source-migration evidence is recorded in the root `INTEGRATION_GUIDE.md` and `audit_evidence/` directory; the historical `auth/docs/AUTH_GROUP_RBG03_TO_RBG10_PHYSICAL_MIGRATION.csv` was not supplied and is not claimed to exist. Strict cross-business isolation and runtime verification remain open where documented.
