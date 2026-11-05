// RESPONSIBILITY: Defines the zero-business tooltip contract used by Trainer UI primitives.
import type { ReactNode } from 'react';

export interface TrainerNavigationTooltipProps {
  content: string;
  children: ReactNode;
  testId?: string;
}
