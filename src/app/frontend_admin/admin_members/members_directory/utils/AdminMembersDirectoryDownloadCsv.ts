// RESPONSIBILITY: Owns Members Directory CSV browser download lifecycle, including failure-safe resource cleanup.
/** Downloads an already supplied CSV string; does not infer or rewrite the backend's CSV contract. */
export function downloadAdminMembersDirectoryCsv(data: string): void {
  let url: string | undefined;
  let anchor: HTMLAnchorElement | undefined;
  try {
    url = URL.createObjectURL(new Blob([data], { type: 'text/csv;charset=utf-8;' }));
    anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'admin-members.csv';
    document.body.appendChild(anchor);
    anchor.click();
  } finally {
    try { anchor?.remove(); } finally { if (url) URL.revokeObjectURL(url); }
  }
}
