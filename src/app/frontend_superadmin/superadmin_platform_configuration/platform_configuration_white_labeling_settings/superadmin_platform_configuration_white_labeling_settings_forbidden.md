# superadmin_platform_configuration_white_labeling_settings — Forbidden Patterns
1. **NO Cross-Module Business Imports**: Do not import components or stores from `gyms`, `plans`, or other superadmin features.
2. **NO Hardcoded API Strings**: Always use `config/superadmin_platform_configuration_white_labeling_settings.url_config.ts` for endpoints.
3. **NO Missing MSW Data**: The MSW mocks must return a fully compliant object matching the Zod schema. Do not return partial mocks.
4. **NO Direct React Context for State**: Use Zustand for UI state and TanStack Query for server state.
5. **NO Unstyled Generic Components**: All lists must use `AdminTableSkeleton` for loading and `AdminEmptyState` for empty results if applicable, or custom ones adhering to the theme contract.

## Module-Specific Forbidden Baseline (Rule 40)

- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not create role-wide business components, stores, APIs, schemas, or utilities for this module.
- Do not import sibling feature business logic; only approved global infrastructure is allowed.
- Do not bypass the module URL config, runtime validation, query-key ownership, cache invalidation, or mutation idempotency requirements.
- Do not hardcode feature UI copy, business status labels, currency symbols, raw theme colors, or arbitrary Tailwind values.


## Autonomous Leaf Isolation Contract

- Owning terminal leaf: `superadmin_platform_configuration_white_labeling/white_labeling_settings/`. Keep business components, hooks, API services, schemas, mocks, tests, formatters, state and feature permissions inside this leaf.
- Do not import business implementation from sibling feature leaves or create parent `common/` / `shared/` folders to share business behavior. Duplicate feature-specific behavior locally when needed.
- Approved zero-business host dependencies must be declared with exact shapes in `superadmin_platform_configuration_white_labeling_settings_features.md`. Role-shell imports currently recorded as `BLOCKED_BY_SUPPLIED_CONTRACT` must not be hidden by fabricated global modules.
- Preserve URL config endpoint values, authorization gates, query keys, permission-masked fields, and request/response contracts unless verified source evidence authorizes a correction.
