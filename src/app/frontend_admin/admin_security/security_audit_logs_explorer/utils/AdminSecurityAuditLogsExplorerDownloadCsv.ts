// RESPONSIBILITY: Complete the Audit Logs CSV browser download and release temporary DOM/Blob resources on success or failure.
export function downloadAdminSecurityAuditLogsExplorerCsv(blob: Blob, filename: string): void {
  let url: string | undefined;
  let anchor: HTMLAnchorElement | undefined;
  try {
    url = URL.createObjectURL(blob);
    anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
  } finally {
    try { anchor?.remove(); } finally { if (url) URL.revokeObjectURL(url); }
  }
}
