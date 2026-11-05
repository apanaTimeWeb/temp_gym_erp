// RESPONSIBILITY: Exposes an accessible overflow menu that reuses only the row's existing inline action controls.
// DATA FLOW: Feature-owned action buttons → shared row action menu → the same original callbacks and permission checks.
'use client';

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactElement, ReactNode } from 'react';
import { MoreHorizontal } from 'lucide-react';

import type { ManagerInfrastructureTableRowActionMenuProps, ManagerInfrastructureTableElementWithChildren } from '@/app/frontend_manager/manager_infrastructure/types/ManagerInfrastructureTableContextMenuTypes';

function readVisibleText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(readVisibleText).join(' ').trim();
  if (isValidElement<{ children?: ReactNode }>(node)) return readVisibleText(node.props.children);
  return '';
}

function actionLabel(element: ReactElement): string {
  const props = element.props as Record<string, unknown>;
  const ariaLabel = typeof props['aria-label'] === 'string' ? props['aria-label'] : '';
  const title = typeof props.title === 'string' ? props.title : '';
  return ariaLabel || title || readVisibleText(props.children as ReactNode).trim();
}

function collectInlineActions(node: ReactNode): ReactElement[] {
  const actions: ReactElement[] = [];
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) return;
    const props = child.props as Record<string, unknown>;
    const isInteractiveAction = child.type === 'button' || child.type === 'a' || props.role === 'button';
    if (isInteractiveAction && (typeof props.onClick === 'function' || typeof props.href === 'string') && actionLabel(child)) {
      actions.push(child);
      return;
    }
    if (props.children) actions.push(...collectInlineActions(props.children as ReactNode));
  });
  return actions;
}

/**
 * @description Adds a touch/keyboard overflow trigger and accessible menu beside existing row action controls.
 * @dependencies Reuses only labelled button/link elements supplied by the feature row; callbacks and authorization remain feature-owned.
 * @edge-case Rows with no labelled inline action controls render the original content without an empty menu trigger.
 * @param label Accessible name for the row's overflow trigger and menu.
 * @param children Existing inline action controls from the feature row.
 * @returns The unchanged inline actions plus an overflow menu that invokes the same original handlers.
 */
export default function ManagerInfrastructureTableContextMenu({ label, testId, children }: ManagerInfrastructureTableRowActionMenuProps) {
  const [open, setOpen] = useState(false);
  const actions = collectInlineActions(children);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Effect rationale: install outside-pointer and Escape/ArrowDown handlers only while the row menu is open, then remove them on close/unmount.
  useEffect(() => {
    if (!open) return;
    const closeOnPointer = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnKey = (event: KeyboardEvent) => {
      const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
      const activeIndex = items.indexOf(document.activeElement as HTMLElement);
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); triggerRef.current?.focus(); }
      else if (event.key === 'ArrowDown') { event.preventDefault(); items[Math.min(activeIndex + 1, items.length - 1)]?.focus(); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); items[Math.max(activeIndex - 1, 0)]?.focus(); }
      else if (event.key === 'Home') { event.preventDefault(); items[0]?.focus(); }
      else if (event.key === 'End') { event.preventDefault(); items.at(-1)?.focus(); }
    };
    document.addEventListener('pointerdown', closeOnPointer);
    document.addEventListener('keydown', closeOnKey);
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    return () => {
      document.removeEventListener('pointerdown', closeOnPointer);
      document.removeEventListener('keydown', closeOnKey);
    };
  }, [open]);

  if (actions.length === 0) return <>{children}</>;

  return (
    <div className="relative inline-flex items-center gap-1">
      {children}
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        data-row-action-menu-trigger="true"
        data-testid={testId}
        className="inline-flex min-h-11 min-w-11 md:min-h-8 md:min-w-8 items-center justify-center rounded-lg border border-border bg-input text-text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0"
        onClick={(event) => { event.stopPropagation(); setOpen((value) => !value); }}
      >
        <MoreHorizontal size={18} aria-hidden="true" />
      </button>
      {open && (
        <div ref={menuRef} role="menu" aria-label={label} className="absolute right-0 top-full z-30 min-w-40 rounded-lg border border-border bg-popover p-1 shadow-popover">
          {actions.map((action) => {
            const actionProps = action.props as Record<string, unknown>;
            const originalOnClick = actionProps.onClick;
            const stableActionIdentity = typeof actionProps['data-testid'] === 'string'
              ? actionProps['data-testid']
              : typeof actionProps.href === 'string'
                ? actionProps.href
                : actionLabel(action);
            return cloneElement(action as ManagerInfrastructureTableElementWithChildren, {
              key: `row-action-${stableActionIdentity}`, 
              role: 'menuitem',
              tabIndex: 0,
              className: 'flex min-h-11 w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
              onClick: (event: MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                if (typeof originalOnClick === 'function') (originalOnClick as (event: MouseEvent<HTMLElement>) => void)(event);
                setOpen(false);
              },
            } as never);
          })}
        </div>
      )}
    </div>
  );
}

/** @description Semantic alias for feature row components that explicitly own a custom `<tr>` rather than rendering rows directly in a table. */
export const ManagerInfrastructureTableRowActionMenu = ManagerInfrastructureTableContextMenu;
