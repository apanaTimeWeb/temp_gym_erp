import { setupWorker } from 'msw/browser';

import { managerHandlers } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksHandlers';


/**
 * Creates the Manager browser MSW worker from the feature-owned handlers.
 * The worker is intentionally owned by the Manager role root so every Manager
 * route can use the same frontend-first mock backend during development/tests.
 */
export const managerMswWorker = setupWorker(...managerHandlers);
