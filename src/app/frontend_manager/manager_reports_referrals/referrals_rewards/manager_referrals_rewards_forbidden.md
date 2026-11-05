# Manager Referrals — Referrals Rewards Forbidden Patterns

## Canonical ownership and isolation
- All business implementation belongs to `manager_referrals/referrals_rewards/`; do not add business source to the Tier3 root.
- Do not import business components, hooks, schemas, API clients, stores or fixtures from sibling autonomous leaves.
- Do not create sub-submodules, nano-modules, barrel files, duplicate URL config, or unprefixed source filenames.
- Keep route-entry files and the documentation trio in this leaf root; all other code belongs under canonical category folders.
- Preserve the existing root compatibility route and all API endpoint literal values unless a separately verified route contract authorizes a change.

# Rule 2: Absolute Isolation (The "No Cross-Pollination" Rule)

This file enforces that the `frontend_manager/manager_referrals` module is strictly isolated.

**Forbidden Imports:**
- 🚫 `import ... from '@/app/admin/*'`
- 🚫 `import ... from '@/app/trainer/*'`
- 🚫 `import ... from '@/app/superadmin/*'`

The manager app must be 100% self-contained. If you need a utility or type from another role, you MUST duplicate it or move it to a truly global `@/lib` or `@/components` shared directory (only if explicitly allowed by architecture).


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
