// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Defines the zero-business tooltip contract used by Trainer UI primitives.
import type { ReactNode } from 'react';

export interface TrainerInfrastructureTooltipProps {
  content: string;
  children: ReactNode;
  testId?: string;
}
