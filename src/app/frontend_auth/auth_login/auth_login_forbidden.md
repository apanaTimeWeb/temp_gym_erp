# auth_login — Forbidden and Safety Rules (RBG01)

**State:** SOURCE MIGRATED / OPEN DEVIATIONS. This document restricts future implementation; it does not certify migration.

- No removal, renaming or re-methoding of the existing `/frontend_auth/auth/*` routes; retain hyphen aliases and the `410 Gone` retired endpoints.
- No new backend API, password reset token, recovery mail sender, extra session field or fake user contract.
- No business component/utility/type imports from any sibling autonomous submodule or sibling domain. Shared host-neutral infrastructure must be verified before use; otherwise local WET duplication.
- No root-level business code in this domain, no nested feature submodule, no nano-module for a lone button/alias, and no feature-splitting solely because of file count.
- No token disclosure in browser responses, localStorage or logs; never weaken HttpOnly, Secure, SameSite, cookie expiry, authorization or idempotency requirements.
- No raw browser alert/confirm, incomplete forms, missing loading/error/empty states, hardcoded theme colors or unlocalized JSX copy when implementing UI.
- No `ALL-RBGS-COMPLETE` labeling before every later RBG is verified and all physical delivery gates pass.
- Do not create navigable Logout/Session/Recovery pages to satisfy folder shape before verifying a safe product-defined GET behavior.

**Verified current limitation:** No business source has yet moved out of the legacy `auth/frontend_auth/auth/` tree in RBG01.


## Post-migration note (this checkpoint)
The physical Tier-4 owner is `login_credentials_and_demo_access/`. Historical `/frontend_auth/auth/*` route adapters remain for method-preserving compatibility. The supplied source-migration evidence is recorded in the root `INTEGRATION_GUIDE.md` and `audit_evidence/` directory; the historical `auth/docs/AUTH_GROUP_RBG03_TO_RBG10_PHYSICAL_MIGRATION.csv` was not supplied and is not claimed to exist. Strict cross-business isolation and runtime verification remain open where documented.
