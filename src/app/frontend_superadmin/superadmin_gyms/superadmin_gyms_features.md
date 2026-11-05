---
feature: "superadmin_gyms"
owner_role: "superadmin"
module_version: 2
documentation_status: "v12-source-static-audited; host-runtime-deferred"
source_archive: "frontend-superadmin-v12-FINAL.zip"
api_contract_source: "aggregated from supplied Superadmin leaf contracts; host API definitions unavailable"
last_verified_date: "2026-10-30"
last_verified_commit: "host-unavailable"
portability_score: "NOT_VERIFIED (host integration unavailable; target 8/8 pending)"
---

# Gym/Tenant Directory — Domain Contract

## Domain Purpose
Gym directory and gym detail management capabilities only.

This domain container groups only the business capabilities listed below. It does not own unrelated billing, tenant, communication, analytics, or platform business behavior. Each capability remains an autonomous terminal leaf with its own API clients, schemas, state, mocks, tests, locale resources, documentation trio, URL config, host stubs, and standalone harness.

## Autonomous Leaf Inventory
- `gyms_detail/` — 52 current physical files; canonical leaf contract: `superadmin_gyms_detail_features.md`.
- `gyms_directory/` — 101 current physical files; canonical leaf contract: `superadmin_gyms_directory_features.md`.

## Boundary Rules
- Domain root contains only this master documentation trio and direct terminal leaf directories.
- Terminal leaves are directly one level below this domain. No feature-bearing submodule may be nested inside a leaf.
- All internal views, drawers, dialogs, and wizards stay in their owning leaf's `components/` category.
- Sibling leaf modules must not import each other's business components, hooks, types, schemas, mocks, state, or API clients.
- The leaf contract is the authority for exact API operations, request/response shapes, permission gates, UI actions, and localization. This domain summary does not invent external API contracts.
- Public route owner paths remain backward-compatible where existing aliases exist; source code ownership follows the physical leaf paths in this archive.

## Contract Evidence
- `frontend_superadmin/superadmin_gyms/gyms_detail`
- `frontend_superadmin/superadmin_gyms/gyms_directory`

## Architecture and Verification Status
The grouping operation only relocates and canonicalizes leaf ownership. Dynamic host route registration, semantic TypeScript compilation, live API behavior, browser rendering, and authenticated Playwright execution are separate host-runtime checks and must not be claimed from static evidence alone.

## Secondary Navigation Product Intent

`gyms_directory` is the only secondary-navigation tab in this domain. The dynamic `gyms_detail/[id]` route is a record-level drill-down reached from a directory entry, not a separate domain tab. This navigation decision preserves the existing detail URL and does not introduce a new route or business capability.
