// RESPONSIBILITY: Defines the strongly typed, route-only Manager sidebar registry contract.
import type { LucideIcon } from 'lucide-react';

export interface ManagerNavItem {
  href: string;
  labelKey: string;
  icon: LucideIcon;
}

export interface ManagerNavGroup {
  /** Translation key for the visible row. For direct destinations, this matches the leaf label. */
  groupKey: string;
  /** Canonical domain root destination; route root preserves the default leaf via redirect. */
  domainHref?: string;
  /** Direct links are non-collapsible; grouped rows expose their children behind an accessible toggle. */
  collapsible: boolean;
  items: ManagerNavItem[];
}

export interface ManagerNavigationTranslatedItem extends ManagerNavItem {
  translatedLabel: string;
}

export interface ManagerNavigationTranslatedGroup extends ManagerNavGroup {
  translatedGroup: string;
  items: ManagerNavigationTranslatedItem[];
}
