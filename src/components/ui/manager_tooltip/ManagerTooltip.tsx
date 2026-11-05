'use client';

import React, { useState } from 'react';

export interface ManagerTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function ManagerTooltip({
  content,
  children,
  className = '',
}: ManagerTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (!content) return <>{children}</>;

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
          className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-primary shadow-md"
        >
          {content}
        </div>
      )}
    </div>
  );
}

