// DATA FLOW: Manager feature UI/state → approved shared debounce infrastructure → feature query identity.
'use client';

/**
 * Compatibility re-export for existing Trainer Schedule imports. The debounce implementation is shared Manager infrastructure, not a leaf-owned generic hook.
 */
export { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';
