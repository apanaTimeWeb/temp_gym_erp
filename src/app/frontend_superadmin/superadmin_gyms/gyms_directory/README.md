# Superadmin Gyms Directory Module

Enterprise Gyms & Tenants management submodule within `superadmin_gyms`.

---

## Swapping Mock for Real API

The Gyms Directory frontend features a strict service layer abstraction (`src/app/frontend_superadmin/superadmin_gyms/gyms_directory/services/tenantService.ts`). UI components and custom React hooks consume only the service and hooks, never touching internal mock handlers directly.

When real backend microservices are ready, you can seamlessly swap out `src/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/mockTenantDb.ts` by updating `tenantService.ts` to call your real HTTP client (e.g. `apiFetch` from `@/lib/api`).

### Endpoint Mapping Reference

| Service Function | HTTP Method | Endpoint | Request Body / Query Params | Expected Response | Description |
| :--- | :---: | :--- | :--- | :--- | :--- |
| `listTenants(params)` | `GET` | `/api/v1/superadmin/gyms` | Query: `?page=1&limit=20&search=...&status=...&planId=...&sortBy=...&sortOrder=...` | `ListResponse<Tenant>` | Retrieves paginated, sorted, and filtered list of tenants. |
| `getTenant(id)` | `GET` | `/api/v1/superadmin/gyms/:id` | None | `Tenant` | Fetches full single tenant details by ID. |
| `createTenant(payload, onProgress)` | `POST` | `/api/v1/superadmin/gyms/provision` | `CreateTenantInput` (`gymName`, `ownerName`, `adminEmail`, `phone`, `temporaryPassword`, `planId`, `memberCount`, `startType`, `trialDays`, `startDate`, `expiryDate`, `city`, `state`, `gstNumber`, `sendWelcomeEmail`) | `Tenant` | Initiates multi-step isolated tenant database provisioning with progress streaming (e.g. SSE / WebSocket / chunked transfer). |
| `updateTenant(id, payload)` | `PATCH` | `/api/v1/superadmin/gyms/:id` | Partial `UpdateTenantInput` (only changed fields, plus `statusChangeReason` / `statusChangeNote`) | `Tenant` | Updates specific tenant details. Logs a `TenantEvent`. |
| `changeAccessStatus(id, accessStatus, reason, note)` | `PATCH` | `/api/v1/superadmin/gyms/:id/access` | `{ accessStatus: 'ACTIVE' \| 'INACTIVE', reason: string, note?: string }` | `Tenant` | Activates or deactivates gym tenant access. Mandatory reason required. |
| `getEvents(tenantId, eventType)` | `GET` | `/api/v1/superadmin/gyms/:id/events` | Query: `?eventType=...` (optional filter) | `TenantEvent[]` | Returns audit timeline events for tenant, ordered newest first. |
| `deleteTenant(id, reason, note)` | `DELETE` | `/api/v1/superadmin/gyms/:id` | Body / Headers: `{ reason: string, note?: string }` | `{ success: boolean }` | Permanently deletes or archives tenant account after name confirmation. |
| `checkEmailExists(email)` | `GET` | `/api/v1/superadmin/gyms/check-email` | Query: `?email=...` | `{ exists: boolean }` | Checks for debounced email collision during onboarding. |
| `getPlans()` | `GET` | `/api/v1/superadmin/plans` | None | `Plan[]` | Retrieves the canonical SaaS plans master list. |

### Swapping Steps

1. **Update `services/tenantService.ts`**: Replace references to `mockTenantDb.*` with your backend HTTP transport calls (e.g., using `apiFetch<T>` from `@/lib/api`).
2. **Streaming Progress for `createTenant`**: Hook the `onProgress` callback to a Server-Sent Events (SSE) stream or WebSocket topic emitting `{ stepIndex, totalSteps, stepKey, label, status, message }`.
3. **Environment Flags**: In production, ensure `NEXT_PUBLIC_MOCK_CHAOS_ERRORS` is not set or set to `false`.
