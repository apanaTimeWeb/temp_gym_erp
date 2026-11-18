export type ColumnKey =
  | 'owner'
  | 'plan'
  | 'status'
  | 'members'
  | 'mrr'
  | 'expiry'
  | 'planActivatedAt'
  | 'lastStatusChange'
  | 'separateSubscription'
  | 'separateAccess';

export const TOGGLEABLE_COLUMNS: Array<{ key: ColumnKey; label: string }> = [
  { key: 'owner', label: 'Owner' },
  { key: 'plan', label: 'Plan' },
  { key: 'status', label: 'Status' },
  { key: 'members', label: 'Members' },
  { key: 'mrr', label: 'MRR' },
  { key: 'expiry', label: 'Expiry' },
  { key: 'planActivatedAt', label: 'Plan Activated On' },
  { key: 'lastStatusChange', label: 'Last Status Change' },
  { key: 'separateSubscription', label: 'Subscription (Separate)' },
  { key: 'separateAccess', label: 'Access (Separate)' },
];

export const DEFAULT_VISIBLE_COLUMNS: Record<ColumnKey, boolean> = {
  owner: true,
  plan: true,
  status: true,
  members: true,
  mrr: true,
  expiry: true,
  planActivatedAt: false,
  lastStatusChange: false,
  separateSubscription: false,
  separateAccess: false,
};

export const STORAGE_KEY = 'superadmin_gyms_directory_columns_v3';

export function getInitialColumnVisibility(): Record<ColumnKey, boolean> {
  if (typeof window === 'undefined') return DEFAULT_VISIBLE_COLUMNS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_VISIBLE_COLUMNS, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return DEFAULT_VISIBLE_COLUMNS;
}
