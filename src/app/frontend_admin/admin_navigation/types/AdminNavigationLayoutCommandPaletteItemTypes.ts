// RESPONSIBILITY: Defines the AdminNavigationLayoutCommandPaletteItemTypes route, lifecycle boundary, or module support artifact for admin_navigation_types; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutCommandPaletteItemTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminCommandPaletteItem {
  groupKey: string;
  labelKey: string;
  href: string;
}
