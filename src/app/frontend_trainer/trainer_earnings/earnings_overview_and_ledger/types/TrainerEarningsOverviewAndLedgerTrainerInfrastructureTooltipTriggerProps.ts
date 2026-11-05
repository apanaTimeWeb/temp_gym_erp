// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
import type { ReactNode } from 'react';
import type { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

export interface TrainerInfrastructureTooltipTriggerProps {
  children?: ReactNode;
  className?: string;
  tabIndex?: number;
  'aria-describedby'?: string;
  'data-testid'?: string;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  onClick?: MouseEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
}
