# Frontend Manager v30 — Cumulative Integration Guide (through RBG-25)

**Checkpoint:** `PARTIAL-rbg25` — source repairs applied; not a production release.

## Archive lineage

- Immediate base: `frontend-manager-v30-PARTIAL-rbg21.zip` (SHA-256 `64820e711c2d8d94b863f031bf98d634abf51658f2391da67abfca94cd0fda16`).
- Original source: `frontend-manager-v29.zip` remains unchanged (SHA-256 `a701477be2aa6bc25ffbc9d4b8a9abf5a0ecf54ab68ecca8f709f9618e69e42c`).
- This overlay includes the cumulative Group 1–7 source state plus RBG-22, RBG-23, RBG-24 and RBG-25.
- RBG-19 remains on hold because the Staff Directory / Attendance / Payroll ownership and identity/status contract has not been confirmed. It was not modified in this group.

## Group 8 scope

- RBG-22: Attendance Tracking state, query and error handling — 11 findings.
- RBG-23: Membership Lifecycle and Referrals/Rewards — slice 1/4, 16 findings.
- RBG-24: Membership Lifecycle and Referrals/Rewards — slice 4/4, 15 findings.
- RBG-25: Expense Register and Finance Payments — slice 2/3, 19 findings.
- 61 findings: 41 fixed at source level, 20 partial, 0 scope-blocked.
- 46 logical application files touched. Per-RBG counts: 7, 15, 10 and 14; all below the 18-file limit.

## Integration steps

1. Preserve the original v29 archive as the immutable source backup.
2. Overlay this cumulative archive onto the host project with paths preserved exactly.
3. Restore the host `package.json`, `tsconfig.json`, lockfile, environment configuration, and dependencies.
4. Run semantic TypeScript checking, focused Vitest suites, ESLint, Next.js production build, Playwright, axe, and manual responsive/keyboard checks.
5. Verify live API authorization, tenant/branch isolation, and server idempotency with the real backend.
6. Review the 20 partial findings and the RBG-19 owner hold before production release.

## Verification limitations

The archive has no root package manifest, TypeScript project configuration, lockfile or installed dependencies. TypeScript parsing/transpilation and import/JSON checks are static checks only; they do not constitute semantic typechecking, unit tests, lint, a production build, browser accessibility verification, or live-backend security verification.
