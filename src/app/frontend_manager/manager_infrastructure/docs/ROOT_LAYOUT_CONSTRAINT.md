# Manager frontend root layout and role support placement

`frontend_manager/layout.tsx` remains at the `frontend_manager/` root because it is the Next.js route-segment layout entrypoint. The 14 approved Manager domain folders remain the business-route roots.

Role-wide navigation support belongs under `frontend_manager/manager_navigation/`. Zero-business role infrastructure, environment/configuration helpers, providers, generic utilities, and test/MSW harness support belong under `frontend_manager/manager_infrastructure/`. These are narrowly scoped role-shell assets, not business feature buckets. See `ADR-001-manager-role-support-placement.md` for the bounded exception and its prohibitions.

Business APIs, query keys, schemas, server-state ownership, workflows, and business UI remain feature-local. Do not import sibling business implementation. Keep all existing leaf URLs and feature-owned loading/error/not-found behavior intact. Do not delete legacy shell files until a later full import sweep proves they have no remaining consumers.
