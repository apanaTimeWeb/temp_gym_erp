'use client';

import React, { useState } from 'react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({
  content,
  children,
  className = '',
  side = 'top',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (!content) return <>{children}</>;

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 me-2',
    right: 'left-full top-1/2 -translate-y-1/2 ms-2',
  }[side];

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-primary shadow-md motion-safe:animate-in motion-safe:fade-in-50 ${positionClasses}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default Tooltip;

