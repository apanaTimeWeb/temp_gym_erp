# trainer_coaching — Canonical Domain Map (v20)

## Domain ownership
`trainer_coaching` owns its secondary navigation and index redirect only. Business state, API clients, schemas, forms, and mutations are owned by the six autonomous leaf modules below. The domain root does not own business workflows and must not import sibling-leaf business state.

## Canonical autonomous submodules

| Leaf | Canonical UI route | Source-verified responsibility |
|---|---|---|
| `coaching_diet_library_and_assignments` | `/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments` | Browse diet plans, search/filter the available collection, inspect plans, and assign a selected plan to a member. |
| `coaching_exercise_management` | `/frontend_trainer/trainer_coaching/coaching_exercise_management` | Browse, filter, paginate, create, update, and delete exercise records with validation and confirmation. |
| `coaching_individual_progress` | `/frontend_trainer/trainer_coaching/coaching_individual_progress` | Select a member, review individual progress history/summary, and manage progress entries. |
| `coaching_progress_comparison` | `/frontend_trainer/trainer_coaching/coaching_progress_comparison` | Review the selected member's comparison chart, delta summary, and measurement table with explicit loading/empty states. |
| `coaching_sessions` | `/frontend_trainer/trainer_coaching/coaching_sessions` | Browse sessions by date/filter; create/update/cancel sessions and record attendance/no-show actions. |
| `coaching_workout_plans` | `/frontend_trainer/trainer_coaching/coaching_workout_plans` | Browse and manage workout plans; exercise-library management remains in its separate leaf. |

## Route and integration boundary
The six routes above are the routes in `CANONICAL_ROUTE_MANIFEST.json`. No removed `/trainer/...` legacy UI route or compatibility adapter is shipped in this role archive. Host menus, bookmarks, and authentication callbacks must target these canonical routes; host redirects are a separate host-owned decision. Backend `/trainer/...` API endpoints are independent contracts and remain unchanged.

## Isolation and architecture
- The domain shell may consume read-only typed route constants for canonical navigation.
- Each leaf owns its components, hooks, API declarations, schemas, tests, and business state.
- No cross-leaf business imports or cross-domain business imports are permitted.
- Modal, drawer, confirmation, and multi-step form flows remain internal to the owning leaf; they are not separate autonomous modules.
- Host authorization, tenant isolation, provider wiring, and browser-runtime behavior require host integration verification.
