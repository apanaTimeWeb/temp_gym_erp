---
feature: "superadmin_audit_compliance"
owner_role: "superadmin"
module_version: 2
documentation_status: "v12-source-static-audited; host-runtime-deferred"
source_archive: "frontend-superadmin-v12-FINAL.zip"
api_contract_source: "aggregated from supplied Superadmin leaf contracts; host API definitions unavailable"
last_verified_date: "2026-10-30"
last_verified_commit: "host-unavailable"
portability_score: "NOT_VERIFIED (host integration unavailable; target 8/8 pending)"
---

# Audit and Compliance — Domain Contract

## Domain Purpose
Platform audit visibility and compliance monitoring. No billing or tenant-management workflows belong here.

This domain container groups only the business capabilities listed below. It does not own unrelated billing, tenant, communication, analytics, or platform business behavior. Each capability remains an autonomous terminal leaf with its own API clients, schemas, state, mocks, tests, locale resources, documentation trio, URL config, host stubs, and standalone harness.

## Autonomous Leaf Inventory
- `audit_compliance_dashboard/` — 42 current physical files; canonical leaf contract: `superadmin_audit_compliance_dashboard_features.md`.
- `audit_compliance_global_audit_overview/` — 44 current physical files; canonical leaf contract: `superadmin_audit_compliance_global_audit_overview_features.md`.

## Boundary Rules
- Domain root is restricted to `layout.tsx`, `page.tsx`, this master documentation trio, and direct terminal leaf directories.
- Terminal leaves are directly one level below this domain. No feature-bearing submodule may be nested inside a leaf.
- All internal views, drawers, dialogs, and wizards stay in their owning leaf's `components/` category.
- Sibling leaf modules must not import each other's business components, hooks, types, schemas, mocks, state, or API clients.
- The leaf contract is the authority for exact API operations, request/response shapes, permission gates, UI actions, and localization. This domain summary does not invent external API contracts.
- Public route owner paths remain backward-compatible where existing aliases exist; source code ownership follows the physical leaf paths in this archive.

## Contract Evidence
- `frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard`
- `frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview`

## Architecture and Verification Status
The grouping operation only relocates and canonicalizes leaf ownership. Dynamic host route registration, semantic TypeScript compilation, live API behavior, browser rendering, and authenticated Playwright execution are separate host-runtime checks and must not be claimed from static evidence alone.
