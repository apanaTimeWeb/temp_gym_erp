// RESPONSIBILITY: Preserves semantic desktop tables while adapting their rows into labelled mobile cards or compact horizontal-scroll tables.
// DATA FLOW: Feature table + ordered header labels → responsive adapter → density-aware semantic table and row action entry points.
'use client';

import { Children, cloneElement, isValidElement } from 'react';
import type { CSSProperties, MouseEvent, ReactElement, ReactNode } from 'react';

import ManagerInfrastructureTableContextMenu from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureTableContextMenu';
import styles from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable.module.css';
import { useManagerInfrastructureDataDensity } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDataDensity';
import type { ManagerInfrastructureResponsiveTableProps, ManagerInfrastructureTableElementWithChildren } from '@/app/frontend_manager/manager_infrastructure/types/ManagerInfrastructureTableContextMenuTypes';

function appendClass(existing: unknown, extra: string): string {
  return `${typeof existing === 'string' ? existing : ''} ${extra}`.trim();
}

/**
 * @description Adapts a feature-owned semantic table to the approved mobile presentation without moving its data or business actions.
 * @dependencies Uses the shell density context, the feature's ordered column labels, and ManagerInfrastructureTableContextMenu for the row's existing action buttons.
 * @edge-case Colspan loading/empty rows do not receive invented field labels; compact reporting tables retain their header and horizontal-scroll interaction; custom row components supply their own data-label attributes.
 * @param labels Column labels in the same order as each data row's logical cells.
 * @param children The feature-owned table element whose desktop markup remains authoritative.
 * @param className Optional class additions for the outer table region.
 * @param mobilePattern `card-stack` for primary/action records or `horizontal-scroll` for compact reporting tables.
 * @returns A density-aware responsive table with mobile field labels and action overflow controls.
 */
export default function ManagerInfrastructureResponsiveTable({ labels, children, className = '', mobilePattern = 'card-stack' }: ManagerInfrastructureResponsiveTableProps) {
  const { density } = useManagerInfrastructureDataDensity();
  const isCardStack = mobilePattern === 'card-stack';
  const table = Children.only(children) as ManagerInfrastructureTableElementWithChildren;
  if (table.type !== 'table') throw new Error('ManagerInfrastructureResponsiveTable expects a table element as its only child.');

  const cardStackCellClass = styles?.cardStackCell || 'cardStackCell';
  const cardStackRowClass = styles?.cardStackRow || 'cardStackRow';
  const cardStackTableClass = styles?.cardStackTable || 'cardStackTable';
  const visuallyHiddenHeaderClass = styles?.visuallyHiddenHeader || 'visuallyHiddenHeader';
  const cardStackBodyClass = styles?.cardStackBody || 'cardStackBody';
  const cardStackFooterClass = styles?.cardStackFooter || 'cardStackFooter';
  const horizontalScrollTableClass = styles?.horizontalScrollTable || 'horizontalScrollTable';

  const transformRow = (row: ReactElement, rowIndex: number): ReactElement => {
    const rowChildren = Children.toArray((row.props as { children?: ReactNode }).children);
    const dataCells = rowChildren.filter((cell) => isValidElement(cell) && cell.type === 'td') as ReactElement[];
    const finalCellIndex = dataCells.length - 1;
    const rowActionLabel = labels[finalCellIndex] || labels.find((label) => Boolean(label)) || '';
    const sourceRowTestId = (row.props as Record<string, unknown>)['data-testid'];
    const rowActionTestId = typeof sourceRowTestId === 'string' ? `${sourceRowTestId}-actions-menu` : `manager_infrastructure-responsive-table-row-${rowIndex}-actions-menu`;
    const handleContextMenu = (event: MouseEvent<HTMLTableRowElement>) => {
      const trigger = event.currentTarget.querySelector<HTMLButtonElement>('[data-row-action-menu-trigger="true"]');
      if (trigger) { event.preventDefault(); trigger.click(); }
    };
    const primaryCellIndex = labels.findIndex((label) => Boolean(label));
    let cellIndex = 0;
    const transformedCells = Children.map((row.props as { children?: ReactNode }).children, (cell) => {
      if (!isValidElement(cell) || cell.type !== 'td') return cell;
      const currentCellIndex = cellIndex;
      const cellProps = cell.props as Record<string, unknown>;
      const hasColSpan = typeof cellProps.colSpan === 'number' && cellProps.colSpan > 1;
      const label = hasColSpan || !isCardStack ? '' : labels[cellIndex] ?? '';
      cellIndex += typeof cellProps.colSpan === 'number' ? Math.max(1, cellProps.colSpan) : 1;
      const normalizedLabel = label.toLowerCase();
      const mobileCellAttributes = {
        ...(currentCellIndex === primaryCellIndex && label ? { 'data-mobile-primary': 'true' } : {}),
        ...(normalizedLabel.includes('status') || normalizedLabel.includes('स्थिति') || normalizedLabel.includes('progress') || normalizedLabel.includes('प्रगति') ? { 'data-mobile-status': 'true' } : {}),
        ...(normalizedLabel.includes('action') || normalizedLabel.includes('receipt') || normalizedLabel.includes('कार्रवाई') || normalizedLabel.includes('कार्य') || normalizedLabel.includes('रसीद') ? { 'data-mobile-actions': 'true' } : {}),
      };
      const mobileCellClass = !isCardStack ? '' : `${cardStackCellClass} max-md:flex max-md:items-start max-md:justify-between max-md:gap-4 max-md:border-b max-md:border-border max-md:px-3 max-md:py-2 max-md:text-right max-md:last:border-b-0 md:table-cell md:align-middle md:border-0 md:px-4 md:py-3.5 md:text-left`;
      const originalChildren = cellProps.children as ReactNode;
      const isFinalCell = currentCellIndex === finalCellIndex;
      const actionChildren = isFinalCell ? <ManagerInfrastructureTableContextMenu label={rowActionLabel} testId={rowActionTestId}>{originalChildren}</ManagerInfrastructureTableContextMenu> : originalChildren;
      return cloneElement(cell as ManagerInfrastructureTableElementWithChildren, {
        'data-label': label || undefined,
        ...(isCardStack ? mobileCellAttributes : {}),
        className: appendClass(cellProps.className, mobileCellClass),
        style: { ...(cellProps.style as CSSProperties | undefined), minHeight: 'var(--manager-table-row-height)' },
        children: <>{label ? <span className="sr-only md:hidden">{label}</span> : null}{actionChildren}</>,
      } as never);
    });
    return cloneElement(row as ManagerInfrastructureTableElementWithChildren, {
      className: appendClass((row.props as Record<string, unknown>).className, isCardStack ? `${cardStackRowClass} max-md:mb-3 max-md:rounded-xl max-md:border max-md:border-border max-md:bg-card max-md:p-2 max-md:shadow-card md:table-row md:mb-0 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none` : ''),
      style: { ...((row.props as Record<string, unknown>).style as CSSProperties | undefined), minHeight: 'var(--manager-table-row-height)' },
      onContextMenu: handleContextMenu,
      children: transformedCells,
    } as never);
  };

  const transformRows = (node: ReactNode): ReactNode => Children.map(node, (child, rowIndex) => {
    if (!isValidElement(child)) return child;
    if (child.type === 'tr') return transformRow(child, rowIndex);
    const props = child.props as Record<string, unknown>;
    if (props.children) return cloneElement(child as ManagerInfrastructureTableElementWithChildren, { children: transformRows(props.children as ReactNode) } as never);
    return child;
  });

  const transformedTableChildren = Children.map((table.props as { children?: ReactNode }).children, (section) => {
    if (!isValidElement(section)) return section;
    const props = section.props as Record<string, unknown>;
    if (section.type === 'thead') return isCardStack ? cloneElement(section as ManagerInfrastructureTableElementWithChildren, { className: appendClass(props.className, `${visuallyHiddenHeaderClass} max-md:hidden md:table-header-group`) } as never) : section;
    if (section.type === 'tbody' || section.type === 'tfoot') {
      return cloneElement(section as ManagerInfrastructureTableElementWithChildren, {
        className: appendClass(props.className, isCardStack ? (section.type === 'tfoot' ? `${cardStackFooterClass} md:table-footer-group` : `${cardStackBodyClass} md:table-row-group`) : ''),
        children: transformRows(props.children as ReactNode),
      } as never);
    }
    return section;
  });

  return (
    <div className={`relative w-full overflow-x-auto ${className}`.trim()} data-manager-responsive-table="true" data-density={density} data-mobile-pattern={mobilePattern}>
      {cloneElement(table, {
        className: appendClass((table.props as Record<string, unknown>).className, isCardStack ? `${cardStackTableClass} w-full md:table` : `${horizontalScrollTableClass} md:min-w-full`),
        style: { ...((table.props as Record<string, unknown>).style as CSSProperties | undefined), fontSize: 'var(--manager-table-font-size)' },
        children: transformedTableChildren,
      } as never)}
    </div>
  );
}
