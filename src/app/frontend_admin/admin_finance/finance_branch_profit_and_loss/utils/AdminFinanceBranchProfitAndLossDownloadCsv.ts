// RESPONSIBILITY: Download already-encoded P&L CSV while releasing DOM and Blob resources, including on failure.
// Retains the existing BOM and zero-delay URL-revocation behavior after a browser click.
export function downloadAdminFinanceBranchProfitAndLossCsv(csv: string, filename: string): void {
  let url: string | undefined;
  let anchor: HTMLAnchorElement | undefined;
  let clicked = false;
  try {
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
    url = URL.createObjectURL(blob);
    anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    clicked = true;
  } finally {
    try { anchor?.remove(); } finally {
      if (url) {
        if (clicked) {
          // Retain the pre-existing post-click defer, but fall back to revocation if scheduling fails.
          try { window.setTimeout(() => URL.revokeObjectURL(url!), 0); }
          catch { URL.revokeObjectURL(url); }
        } else {
          URL.revokeObjectURL(url);
        }
      }
    }
  }
}
