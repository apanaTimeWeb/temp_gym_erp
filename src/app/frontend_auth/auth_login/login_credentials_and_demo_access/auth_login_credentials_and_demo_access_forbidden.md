# auth_login_credentials_and_demo_access — prohibited patterns

- NEVER introduce sibling business imports; the existing single mutable session-registry cross-owner bridge is OPEN P0, not permitted permanent design.
- NEVER change any historical Auth URL/verb or alias behavior.
- NEVER invent password-reset APIs or UI workflows.
- NEVER leak tokens, log credentials or persist auth tokens in localStorage.
- NEVER replace raw upstream transport until a verified API adapter contract guarantees raw status and Set-Cookie semantics.
- NEVER create GET logout or toggle demo mode from public client state.
- NEVER split solely on file count; use the 5-gate matrix and verified aggregate root.
- NEVER assert test/compliance PASS without executable evidence.
