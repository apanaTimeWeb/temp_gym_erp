// RESPONSIBILITY: Renders ManagerLibraryDietPlansMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerLibraryDietPlansContent } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansContent';

/** @description Entry component for the Diet Library module. Wraps the UI in the hook-based state facade and handles page layout. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerLibraryDietPlansMain() {
  return <ManagerLibraryDietPlansContent />;
}
