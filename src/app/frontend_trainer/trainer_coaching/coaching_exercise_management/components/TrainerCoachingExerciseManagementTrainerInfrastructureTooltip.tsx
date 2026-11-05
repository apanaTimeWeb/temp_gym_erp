// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// Effect contract: manages tooltip visibility timing while preserving keyboard/focus accessibility and cleanup.
// RESPONSIBILITY: Provides an accessible zero-business tooltip by enhancing the supplied semantic element without introducing nested interactive wrappers.
import { cloneElement, isValidElement, useEffect, useId, useRef, useState } from 'react';

import type { TrainerInfrastructureTooltipProps } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementTrainerInfrastructureTooltipProps';

import type { TrainerInfrastructureTooltipTriggerProps } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementTrainerInfrastructureTooltipTriggerProps';

import type { ReactElement } from 'react';

/**
 * @description Adds a delayed hover/focus/touch tooltip to the supplied semantic element while preserving its original HTML semantics and existing event handlers.
 * @dependencies React element cloning plus semantic Trainer design tokens; no feature business data.
 * @edge-case Cleans timers on unmount, composes existing handlers with the tooltip interaction, preserves native focusability, and avoids nested interactive descendants.
 */
/**
 * @description Provides the global zero-business tooltip presentation used for constrained text and accessible contextual help.
 * @dependencies Global semantic surfaces, focus behavior, and motion-safe transitions.
 * @edge-case Tooltip content must remain usable with keyboard/touch and must not become hover-only information.
 */
/**
 * @description Owns the infrastructure feature UI responsibility represented by TrainerInfrastructureTooltip, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerInfrastructureTooltip({ content, children, testId }: TrainerInfrastructureTooltipProps) {
  const tooltipId = useId();
  const hoverTimeoutRef = useRef<number | null>(null);
  const focusTimeoutRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const open = isHovered || isFocused;

  // EFFECT AUDIT: Registers a one-time unmount cleanup for the active tooltip timer; no reactive dependencies are required.
  useEffect(() => () => {
    if (hoverTimeoutRef.current !== null) window.clearTimeout(hoverTimeoutRef.current);
    if (focusTimeoutRef.current !== null) window.clearTimeout(focusTimeoutRef.current);
  }, []);

  const scheduleOpen = (modality: 'hover' | 'focus') => {
    const timerRef = modality === 'hover' ? hoverTimeoutRef : focusTimeoutRef;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (modality === 'hover') setIsHovered(true);
      else setIsFocused(true);
    }, 300);
  };

  const scheduleClose = (modality: 'hover' | 'focus') => {
    const timerRef = modality === 'hover' ? hoverTimeoutRef : focusTimeoutRef;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (modality === 'hover') setIsHovered(false);
      else setIsFocused(false);
    }, 100);
  };

  const dismissWithEscape = (event: { key: string; preventDefault: () => void; stopPropagation: () => void }) => {
    if (event.key !== 'Escape' || !open) return;
    event.preventDefault();
    event.stopPropagation();
    setIsHovered(false);
    setIsFocused(false);
    if (hoverTimeoutRef.current !== null) window.clearTimeout(hoverTimeoutRef.current);
    if (focusTimeoutRef.current !== null) window.clearTimeout(focusTimeoutRef.current);
  };

  const generatedTestId = testId ?? `trainer-infrastructure-tooltip-${tooltipId.replace(/:/g, '')}`;

  if (isValidElement(children)) {
    const element = children as ReactElement<TrainerInfrastructureTooltipTriggerProps>;
    const existingClassName = element.props.className ?? '';
    const existingTabIndex = element.props.tabIndex;
    const existingOnMouseEnter = element.props.onMouseEnter;
    const existingOnMouseLeave = element.props.onMouseLeave;
    const existingOnFocus = element.props.onFocus;
    const existingOnBlur = element.props.onBlur;
    const existingOnKeyDown = element.props.onKeyDown;
    const elementType = element.type;
    const naturallyFocusable = typeof elementType === 'string' && ['a', 'button', 'input', 'select', 'textarea', 'summary'].includes(elementType);

    const tooltip = open ? (
      <span id={tooltipId} role="tooltip" className="absolute start-0 top-full z-30 mt-2 max-w-60 rounded-md border border-border bg-popover px-3 py-2 text-xs text-primary shadow-popover motion-safe:transition-opacity motion-safe:duration-base ease-in-out">
        {content}
      </span>
    ) : null;

    return cloneElement(element, {
      className: `${existingClassName} relative`.trim(),
      tabIndex: existingTabIndex ?? (naturallyFocusable ? undefined : 0),
      'aria-describedby': open ? tooltipId : element.props['aria-describedby'],
      'data-testid': element.props['data-testid'] ?? generatedTestId,
      onMouseEnter: (event) => { existingOnMouseEnter?.(event); scheduleOpen('hover'); },
      onMouseLeave: (event) => { existingOnMouseLeave?.(event); scheduleClose('hover'); },
      onFocus: (event) => { existingOnFocus?.(event); scheduleOpen('focus'); },
      onBlur: (event) => { existingOnBlur?.(event); scheduleClose('focus'); },
      onKeyDown: (event) => { existingOnKeyDown?.(event); dismissWithEscape(event); },
    }, <>{element.props.children}{tooltip}</>);
  }

  return (
    <span className="relative inline-flex min-w-0 max-w-full motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" tabIndex={0} aria-describedby={open ? tooltipId : undefined} onMouseEnter={() => scheduleOpen('hover')} onMouseLeave={() => scheduleClose('hover')} onFocus={() => scheduleOpen('focus')} onBlur={() => scheduleClose('focus')} onKeyDown={dismissWithEscape} data-testid={generatedTestId}>
      {children}
      {open && <span id={tooltipId} role="tooltip" className="absolute start-0 top-full z-30 mt-2 max-w-60 rounded-md border border-border bg-popover px-3 py-2 text-xs text-primary shadow-popover motion-safe:transition-opacity motion-safe:duration-base ease-in-out">{content}</span>}
    </span>
  );
}
