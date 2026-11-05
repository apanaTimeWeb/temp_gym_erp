"use client";
// RESPONSIBILITY: Applies the documented <768px Admin table card-stack presentation while preserving semantic table markup.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/shell/AdminNavigationLayoutResponsiveTableProvider.tsx)

import { useEffect } from 'react';
import styles from '@/app/frontend_admin/admin_navigation/components/shell/AdminNavigationLayoutResponsiveTableProvider.module.css';

const STYLE_ID = 'admin-responsive-table-styles';

/**
 * annotateTables is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function annotateTables(root: ParentNode = document) {
  root.querySelectorAll<HTMLTableElement>('table[data-admin-responsive-table]').forEach((table) => {
    const headerCells = Array.from(table.querySelectorAll<HTMLTableCellElement>('thead tr:first-child th'));
    const labels = headerCells.map((cell) => cell.textContent?.trim() || '');
    table.querySelectorAll<HTMLTableRowElement>('tbody tr').forEach((row) => {
      let columnIndex = 0;
      Array.from(row.children).forEach((child) => {
        if (!(child instanceof HTMLTableCellElement)) return;
        const span = child.colSpan || 1;
        const label = labels[columnIndex];
        if (label) {
          if (!child.hasAttribute('data-label') || child.hasAttribute('data-admin-generated-label')) {
            if (child.getAttribute('data-label') !== label) child.setAttribute('data-label', label);
            child.setAttribute('data-admin-generated-label', 'true');
          }
        } else if (child.hasAttribute('data-admin-generated-label')) {
          child.removeAttribute('data-label');
          child.removeAttribute('data-admin-generated-label');
        }
        columnIndex += span;
      });
    });
  });
}

/**
 * AdminNavigationLayoutResponsiveTableProvider renders the admin responsive table provider UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNavigationLayoutResponsiveTableProvider() {
  // EFFECT: Annotates mounted tables after route changes so responsive semantics remain available without owning feature data.
  useEffect(() => {
    if (styles.responsiveTableScope) document.documentElement.classList.add(styles.responsiveTableScope);
    annotateTables();
    const observer = new MutationObserver(() => annotateTables());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      if (styles.responsiveTableScope) document.documentElement.classList.remove(styles.responsiveTableScope);
    };
  }, []);

  return null;
}
