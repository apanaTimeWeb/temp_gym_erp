# trainer_members — Canonical Domain Map (v20)

## Domain purpose
The Members domain is the trainer's workspace for browsing assigned members, reviewing member profiles and related fitness/progress/attendance information, maintaining documented member details, and recording trainer notes. Billing, tenant administration, and unrelated role-level member workflows are outside this domain.

## Canonical autonomous submodules

| Leaf | Canonical UI route | Source-verified responsibility |
|---|---|---|
| `members_directory_and_profile` | `/frontend_trainer/trainer_members/members_directory_and_profile` | Search/filter/sort/page the member directory; open member profile tabs; update member/assessment details; assign diet/workout; review attendance/progress; use validated email/WhatsApp hand-off. |
| `members_trainer_notes` | `/frontend_trainer/trainer_members/members_trainer_notes?id=<memberId>` | Load the selected member context and note timeline; submit a non-empty note; protect dirty drafts during navigation. |

## Intentional Notes entry surfaces
The member-directory profile's Notes tab and the independent `members_trainer_notes` route are two intentional canonical entry surfaces. This is not a legacy route adapter. The independent Notes route requires the `id` query parameter to identify the member; the profile tab retains the directory's `view`/`id` state contract.

## Route and integration boundary
The routes above are the entries in `CANONICAL_ROUTE_MANIFEST.json`. No removed `/trainer/...` legacy UI route or compatibility adapter is shipped in this role archive. Host menus, bookmarks, and authentication callbacks must target the canonical routes. Backend `/trainer/...` API endpoints are independent contracts and remain unchanged.

## Isolation and architecture
- Each leaf owns its own components, hooks, API declarations, schemas, query/store state, tests, and mutation lifecycle.
- The directory may navigate to the independent Notes route but does not import the Notes leaf's business hooks or store.
- Host authorization and tenant isolation remain authoritative and require host/backend verification.
- Email/WhatsApp actions are validated hand-offs; this role module does not claim server-side message delivery.
