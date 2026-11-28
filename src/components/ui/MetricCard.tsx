'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface MetricCardProps {
  label?: string;
  title?: string;
  value: string | number;
  helper?: string;
  subtitle?: string;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  icon?: LucideIcon | React.ComponentType<{ size?: number; className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>;
  className?: string;
  'data-testid'?: string;
  testId?: string;
  onClick?: () => void;
  href?: string;
}

const TONE_STYLES = {
  primary: {
    border: 'border-border dark:border-orange-500/35 hover:border-orange-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]',
    topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent',
    glow: 'bg-orange-500',
    stroke: '#FF5A1F',
    pill: 'bg-primary-subtle border border-orange-500/35 text-primary dark:text-orange-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(255,90,31,0.16)]',
  },
  success: {
    border: 'border-border dark:border-emerald-500/35 hover:border-emerald-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]',
    topBar: 'from-[#10B981] via-[#34D399] to-transparent',
    glow: 'bg-emerald-400',
    stroke: '#34D399',
    pill: 'bg-success-bg border border-emerald-500/35 text-success dark:text-emerald-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(16,185,129,0.16)]',
  },
  warning: {
    border: 'border-border dark:border-amber-500/35 hover:border-amber-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]',
    topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
    glow: 'bg-amber-400',
    stroke: '#FBBF24',
    pill: 'bg-warning-bg border border-amber-500/35 text-warning dark:text-amber-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(245,158,11,0.16)]',
  },
  danger: {
    border: 'border-border dark:border-rose-500/35 hover:border-rose-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220]',
    topBar: 'from-[#F43F5E] via-[#FB7185] to-transparent',
    glow: 'bg-rose-400',
    stroke: '#FB7185',
    pill: 'bg-danger-bg border border-rose-500/35 text-danger dark:text-rose-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(244,63,94,0.16)]',
  },
  info: {
    border: 'border-border dark:border-sky-500/35 hover:border-sky-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220]',
    topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent',
    glow: 'bg-sky-400',
    stroke: '#38BDF8',
    pill: 'bg-info-bg border border-sky-500/35 text-info dark:text-sky-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(56,189,248,0.16)]',
  },
  default: {
    border: 'border-border dark:border-indigo-500/30 hover:border-indigo-400/65',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#161B33] dark:via-[#12192B] dark:to-[#0C1220]',
    topBar: 'from-[#818CF8] via-[#38BDF8] to-transparent',
    glow: 'bg-indigo-400',
    stroke: '#818CF8',
    pill: 'bg-surface-hover border border-border dark:border-white/15 text-secondary dark:text-slate-300',
    shadow: 'hover:shadow-[0_12px_32px_rgba(99,102,241,0.14)]',
  },
} as const;

export function MetricCard({
  label,
  title,
  value,
  helper,
  subtitle,
  tone = 'default',
  icon: Icon,
  className = '',
  'data-testid': dataTestId,
  testId,
  onClick,
  href,
}: MetricCardProps) {
  const displayTitle = label || title || '';
  const displaySubtitle = helper || subtitle;
  const accent = TONE_STYLES[tone] ?? TONE_STYLES.default;

  const cardContent = (
    <article
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`relative overflow-hidden h-full min-w-0 rounded-2xl border p-5 shadow-card flex flex-col justify-between ${accent.surface} ${accent.border} ${accent.shadow} motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5 ${onClick || href ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary' : ''} ${className}`}
      data-testid={dataTestId || testId}
    >
      <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.topBar}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-2xl opacity-15 ${accent.glow}`} />
      <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-14 w-32 opacity-20">
        <path d="M0 38 Q25 32 45 26 T90 18 T130 12 T150 6" fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold uppercase tracking-wider text-secondary">{displayTitle}</p>
          <p className="mt-2 truncate text-2xl sm:text-[26px] font-extrabold tracking-tight text-primary tabular-nums">{value}</p>
        </div>
        {Icon && (
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${accent.pill}`}>
            <Icon size={18} strokeWidth={2.2} aria-hidden={true} />
          </div>
        )}
      </div>
      {displaySubtitle && (
        <p className="relative mt-3 pt-2.5 border-t border-border/60 dark:border-white/10 truncate text-xs font-medium text-secondary">{displaySubtitle}</p>
      )}
    </article>
  );

  if (href) {
    return (
      <a href={href} className="block h-full min-w-0 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

export default MetricCard;
