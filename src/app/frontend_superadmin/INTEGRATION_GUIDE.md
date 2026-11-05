# v18 integration guide

Copy frontend_superadmin/ into the host src/app/frontend_superadmin/ and merge the separate playwright_E2E/ tree into its existing test setup. Preserve the production host transport/session providers, global theme CSS and approved UI primitives. The isolated adapters must never replace production authentication or authorization code.

Existing route and wire-path inventories are preserved. The system_ops_cache_management sibling is the independent Redis telemetry/flush workspace; the infrastructure route retains node monitoring and links to it. All 35 URL configs expose one local ROUTES/API pair; imports were updated with the source.

For reproducible isolated checks: from isolated-validation/, run npm ci, npm run typecheck, npm run typecheck:features, npm run typecheck:harness and npm test. The supplied lockfile fixes the tested dependency graph. These tests use real owning-module APIs, handlers and fixtures with declared test-only host adapters.

Browser development entries live under each applicable leaf tests/harness/*DevelopmentHarness.tsx; cache uses its existing local harness. The host serves mockServiceWorker.js and semantic theme CSS. Gyms Detail requires a fixture gymId prop. Shell infrastructure leaves retain provider/navigation harnesses instead of inventing entity empty states. Mount development harnesses only in development/test.

Run the real host gates in HOST_VERIFICATION_REQUIRED.md before production release. Read the current RBG ledger and individual checklist statuses. No all-runtime or all-RBG-complete certification is implied by this ZIP.

Rollback: restore the prior archive and its integration registration. No backend migration or wire-contract rename is introduced by these repairs.
