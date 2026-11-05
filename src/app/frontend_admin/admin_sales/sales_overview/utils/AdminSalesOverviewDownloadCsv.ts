// RESPONSIBILITY: Download approved Sales Overview CSV and always release temporary anchor and Blob URL resources.
export function downloadAdminSalesOverviewCsv(csv: string): void {
  let url: string | undefined;
  let anchor: HTMLAnchorElement | undefined;
  try {
    url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'admin_sales-overview.csv';
    document.body.appendChild(anchor);
    anchor.click();
  } finally {
    try { anchor?.remove(); } finally { if (url) URL.revokeObjectURL(url); }
  }
}
