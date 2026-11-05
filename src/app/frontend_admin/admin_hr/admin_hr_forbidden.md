# Admin HR — Forbidden Patterns (Admin v47)

- Do not add business code at the domain root; only the domain shell/redirect, master documentation trio, and autonomous leaf directories are allowed.
- Do not nest a feature/submodule directory inside a leaf. Use the canonical category folders (`components/`, `hooks/`, `api/`, `state/`, `types/`, `schemas/`, `utils/`, `mocks/`, `tests/`, `contracts/`, `config/`, `constants/`, `locales/`).
- Do not import business components, hooks, API clients, stores, schemas, or mocks from sibling leaves. Duplicate business-aware UI locally.
- Do not invent or change API endpoints, HTTP methods, payload fields, nullable response contracts, route rewrites, permissions or tenant context.
- Do not delete unfinished UI/actions/tests to get a green audit. Complete them additively and preserve existing user flows.
- Do not use raw browser `alert()`/`confirm()`, direct feature-level `fetch`/`axios`, `localStorage` for business entities, SSE, Recharts/Chart.js, inline visual styles, arbitrary token CSS classes, raw hex colors, route groups, or barrel files.
- Keep React components ≤300 lines, hooks ≤150, utilities ≤120, stores ≤180, types/schemas ≤200, and API service files ≤200 lines. Split by responsibility if a ceiling is exceeded.
- Do not mark a rule `PASS` without source/runtime evidence. Report contract conflicts and runtime-only checks explicitly.
- FORBIDDEN: frontend compatibility redirects and alias maps; use canonical routes only.
