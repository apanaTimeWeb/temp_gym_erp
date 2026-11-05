// RESPONSIBILITY: Renders ManagerTrainerScheduleMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerTrainerScheduleContent } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/components/ManagerTrainerScheduleContent';

/** @description Root client orchestrator for the Schedule module. Owns layout, toolbar, view toggle, and renders sub-components. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerTrainerScheduleMain() {
  return <ManagerTrainerScheduleContent />;
}
