# Ghost restoration — Forbidden Rules

- No imports from sibling Auth feature submodules.
- No role or tenant values accepted from an unverified request body.
- No browser-readable access or refresh tokens; preserve HttpOnly Secure SameSite cookies.
- No extra logout/session-refresh backend calls or invented ghost-login initiation contracts.
- No route path changes without verified host compatibility and explicit approval.
- No `fetch`/axios directly from feature code; this workflow does not make upstream requests.
- No barrel files, nested submodules, or business shared-parent folders.
