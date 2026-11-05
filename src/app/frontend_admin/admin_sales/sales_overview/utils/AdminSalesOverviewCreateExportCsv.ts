// RESPONSIBILITY: Encode the Sales Overview CSV with stable approved columns and spreadsheet-safe text cells.
// DATA FLOW: verified overview points + localized header → RFC-style quoted rows → browser download.
import type { OverviewDataPoint } from '@/app/frontend_admin/admin_sales/sales_overview/types/AdminSalesOverviewTypes';

/** Quote CSV cells and neutralize spreadsheet formula markers, including after control or BOM prefixes. */
export function adminSalesOverviewCsvCell(value: unknown): string {
  const raw = String(value ?? '');
  const safe = typeof value === 'number' && Number.isFinite(value)
    ? raw // Genuine negative financial numbers must remain numeric in spreadsheet imports.
    : /^[\u0000-\u0020\uFEFF]*[=+@-]/u.test(raw) ? `'${raw}` : raw;
  return `"${safe.replaceAll('"', '""')}"`;
}

/** Return a deterministic CSV preserving the existing localized header and the date/revenue/newMembers column order. */
export function AdminSalesOverviewCreateExportCsv(header: string, rows: readonly OverviewDataPoint[]): string {
  return [
    header,
    ...rows.map((item) => [item.date, item.revenue, item.newMembers].map(adminSalesOverviewCsvCell).join(',')),
  ].join('\n');
}
