'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  'data-testid'?: string;
}

export function CopyButton({
  value,
  label = 'Copy to clipboard',
  className = '',
  'data-testid': testId,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : label}
      title={copied ? 'Copied' : label}
      data-testid={testId}
      className={`inline-flex min-h-6 min-w-6 items-center justify-center rounded p-1 text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${className}`}
    >
      {copied ? (
        <Check size={13} className="text-success" aria-hidden="true" />
      ) : (
        <Copy size={13} aria-hidden="true" />
      )}
    </button>
  );
}

export default CopyButton;

