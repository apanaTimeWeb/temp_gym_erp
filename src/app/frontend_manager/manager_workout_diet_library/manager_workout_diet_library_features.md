---
role: manager
domain_root: manager_workout_diet_library
source_status: regrouped-domain-shell-host-runtime-not-verified
---

# Workout & Diet Library — Domain Container

## Domain purpose
Workout plan management, assigned plans, exercise library and diet plans are direct-child sibling leaves.

## Direct-child autonomous submodules
- `assigned_workout_plans/`
- `exercise_library/`
- `library_diet_plans/`
- `workout_plan_management/`

## Ownership and route rule
This domain root contains only its shell, page/route boundaries and documentation trio. Business source, tests, mocks, schemas, state and URL config belong inside one of the direct-child autonomous submodules. No sub-submodules, global business helpers, or nano-modules are allowed.

## Navigation
The primary Manager navigation exposes high-level domains. Multi-workflow domains provide secondary navigation to their direct-child submodules; sibling features remain route-distinct. Profile and business settings remain header-owned, with their leaf implementation physically grouped under the Dashboard domain to satisfy the approved 14-root constraint.

## Verification boundary
Static source and path checks are reported in the release evidence. Host semantic typecheck, installed Vitest, production build, browser E2E, axe, keyboard, reduced-motion and 200% zoom are not claimed as passed without the host runtime.
