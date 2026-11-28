import React from 'react';
import Link from 'next/link';

export interface ManagerStatCardProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>;
  iconBg?: string;
  iconColor?: string;
  subtitle?: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  className?: string;
  testId?: string;
  'data-testid'?: string;
  href?: string;
}

const CARD_ACCENTS = {
  orange: {
    border: 'border-orange-500/40 hover:border-orange-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]',
    topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent',
    glow: 'bg-orange-500',
    stroke: '#FF5A1F',
    badge: 'bg-orange-500/20 border-orange-500/40 text-orange-500 dark:text-orange-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(255,90,31,0.18)]',
  },
  sky: {
    border: 'border-sky-500/40 hover:border-sky-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220]',
    topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent',
    glow: 'bg-sky-400',
    stroke: '#38BDF8',
    badge: 'bg-sky-500/20 border-sky-500/40 text-sky-500 dark:text-sky-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(56,189,248,0.18)]',
  },
  emerald: {
    border: 'border-emerald-500/40 hover:border-emerald-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]',
    topBar: 'from-[#10B981] via-[#34D399] to-transparent',
    glow: 'bg-emerald-400',
    stroke: '#34D399',
    badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-500 dark:text-emerald-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(16,185,129,0.18)]',
  },
  amber: {
    border: 'border-amber-500/40 hover:border-amber-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]',
    topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
    glow: 'bg-amber-400',
    stroke: '#FBBF24',
    badge: 'bg-amber-500/20 border-amber-500/40 text-amber-500 dark:text-amber-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(245,158,11,0.18)]',
  },
  rose: {
    border: 'border-rose-500/40 hover:border-rose-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2C111E] dark:via-[#15192B] dark:to-[#0C1220]',
    topBar: 'from-[#F43F5E] via-[#FB7185] to-transparent',
    glow: 'bg-rose-400',
    stroke: '#FB7185',
    badge: 'bg-rose-500/20 border-rose-500/40 text-rose-500 dark:text-rose-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(244,63,94,0.18)]',
  },
} as const;

function resolveAccent(iconColor?: string) {
  if (iconColor?.includes('info') || iconColor?.includes('sky') || iconColor?.includes('cyan')) return CARD_ACCENTS.sky;
  if (iconColor?.includes('success') || iconColor?.includes('emerald')) return CARD_ACCENTS.emerald;
  if (iconColor?.includes('warning') || iconColor?.includes('amber')) return CARD_ACCENTS.amber;
  if (iconColor?.includes('danger') || iconColor?.includes('rose')) return CARD_ACCENTS.rose;
  return CARD_ACCENTS.orange;
}

export default function ManagerStatCard({
  title,
  value,
  icon: Icon,
  iconBg = 'bg-primary-subtle',
  iconColor = 'text-primary',
  subtitle,
  change,
  changeType = 'neutral',
  className = '',
  testId,
  'data-testid': dataTestIdProp,
  href,
}: ManagerStatCardProps) {
  const accent = resolveAccent(iconColor);
  const card = (
    <div
      className={`relative overflow-hidden h-full min-w-0 rounded-2xl p-5 shadow-card border flex flex-col justify-between ${accent.surface} ${accent.border} ${accent.shadow} motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5 ${href ? 'cursor-pointer' : ''} ${className}`}
      data-testid={testId || dataTestIdProp}
    >
      <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.topBar}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-2xl opacity-20 ${accent.glow}`} />
      <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-14 w-32 opacity-25">
        <path d="M0 38 Q25 32 45 26 T90 18 T130 12 T150 6" fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold uppercase tracking-wider text-secondary">{title}</p>
          <p className="mt-2 truncate text-kpi font-extrabold tracking-tight text-text-primary tabular-nums">{value}</p>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${iconBg ?? ''} ${accent.badge}`}>
            <Icon size={18} className={iconColor} strokeWidth={2.2} aria-hidden />
          </div>
        )}
      </div>
      {(subtitle || change) && (
        <div className="relative mt-3 pt-2.5 border-t border-border/70 flex items-center gap-2 text-xs font-medium">
          {change && (
            <span
              className={`font-semibold ${
                changeType === 'up'
                  ? 'text-success-text'
                  : changeType === 'down'
                  ? 'text-danger-text'
                  : 'text-secondary'
              }`}
            >
              {changeType === 'up' ? '↑ ' : changeType === 'down' ? '↓ ' : ''}{change}
            </span>
          )}
          {subtitle && <span className="truncate text-secondary">{subtitle}</span>}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full min-w-0 no-underline rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
        {card}
      </Link>
    );
  }

  return card;
}
