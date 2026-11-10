---
role: manager
domain_root: manager_help_support
submodule: support_tickets
route: /frontend_manager/manager_help_support/support_tickets
compatibility_route: /frontend_manager/manager_help_support
source_status: canonical-leaf-verified
---

# Manager Support Tickets — Autonomous Submodule

## 1. Module Purpose
Provides the Manager with an internal support ticketing and communication workflow with Admin and Superadmin. Managers can raise operational issues, budget requests, and equipment inquiries, and participate in two-way conversation threads.

## 2. Route Contract
- Canonical Leaf Route: `/frontend_manager/manager_help_support/support_tickets`
- Domain Redirect: `/frontend_manager/manager_help_support` -> redirects to canonical leaf route.

## 3. API Contract
- `GET /api/v1/manager/support-tickets`
- `GET /api/v1/manager/support-tickets/stats`
- `POST /api/v1/manager/support-tickets`
- `POST /api/v1/manager/support-tickets/:id/reply`

