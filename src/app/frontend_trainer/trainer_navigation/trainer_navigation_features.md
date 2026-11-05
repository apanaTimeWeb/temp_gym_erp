# trainer_navigation — Canonical Role Navigation and Role Providers

## Purpose

The only role-level shell module. Owns the Trainer header, sidebar, mobile drawer, breadcrumbs, command palette, role permission guard, zero-business confirmation/toast and socket providers. It is not an autonomous business capability.

## Canonical Source Layout

- `components/`: visual shell, menu, route guard and provider components and CSS
- `api/`: shell socket adapter client
- `hooks/useTrainerNavigationSocket.ts`: typed descendant subscription consumer; delegates listener lifecycle to the role provider
- `hooks/`: modal keyboard/focus management
- `types/`: typed shell and provider props
- `config/TrainerNavigationConstants.ts`: six business-domain navigation groups consuming typed leaf URLs
- `config/trainer_navigation.url_config.ts`: feature-owned route-contract aggregator
- `locales/`: English/Hindi existing shell and feedback translations
- `tests/`: shell component and route tests

## Boundaries

The shell never imports business state or business API clients from the six feature domains. It may import read-only typed route URL constants. All old duplicate role route adapter folders and `trainer_infrastructure/` have been removed. Feature modules consume realtime events through `useTrainerNavigationSocket()`; they must not instantiate, connect, or disconnect the host-owned shared socket. Global host permissions remain accessed through the existing verified `@/lib/usePermissions` hook; never infer user/tenant membership from browser state.

## Accessibility and Routing

The shell preserves keyboard/mobile drawer focus behavior, explicit six-group domain navigation, skip link, breadcrumbs, and live screen state. Canonical links point to `/frontend_trainer/{domain}/{submodule}`. UI-only route change intentionally does not modify backend endpoint contracts.

## Verification

Source syntax/import/export checks and offline regression assertions are included in `verification/`. `TrainerNavigationSocketProvider` exports a typed context and `useTrainerNavigationSocket()` is the supported consumer surface; cleanup removes only the listener and never disconnects host transport. Host-native runtime and accessibility checks are not certified from this isolated ZIP.
