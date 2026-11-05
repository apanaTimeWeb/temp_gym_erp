// RESPONSIBILITY: Centralizes static Trainer Dashboard configuration and module-owned presentation mappings.
import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';

export const TRAINER_DASHBOARD_MEMBER_STATUS = { ACTIVE: 'ACTIVE', PENDING: 'PENDING', EXPIRED: 'EXPIRED' } as const;
export const TRAINER_DASHBOARD_DASHBOARD_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  ACTIVE: { bg: 'bg-success-bg', text: 'text-success' },
  PENDING: { bg: 'bg-warning-bg', text: 'text-warning' },
  EXPIRED: { bg: 'bg-danger-bg', text: 'text-danger' },
};

export const TRAINER_DASHBOARD_DASHBOARD_PLAN_BG_COLORS: Record<string, string> = {
  BASIC: 'bg-info',
  GOLD: 'bg-warning',
  PREMIUM: 'bg-primary',
};

export const TRAINER_DASHBOARD_DASHBOARD_RECENT_MEMBERS_PAGE_SIZE = 5;
export const TRAINER_DASHBOARD_RECENT_MEMBERS_HEADERS = ['Member', 'Plan', 'Status', 'Joined', 'Amount'];

export const TRAINER_DASHBOARD_QUICK_ACTIONS = [
  { href: TRAINER_DASHBOARD_URLS.ROUTES.WORKOUT, labelKey: 'TEXT_WORKOUT_LIBRARY', iconKey: 'workout', tone: 'primary' },
  { href: TRAINER_DASHBOARD_URLS.ROUTES.ATTENDANCE, labelKey: 'TEXT_VIEW_ATTENDANCE', iconKey: 'attendance', tone: 'success' },
  { href: TRAINER_DASHBOARD_URLS.ROUTES.MEMBERS, labelKey: 'TEXT_VIEW_MEMBERS', iconKey: 'members', tone: 'info' },
  { href: TRAINER_DASHBOARD_URLS.ROUTES.LIBRARY, labelKey: 'TEXT_DIET_LIBRARY', iconKey: 'library', tone: 'warning' },
] as const;
